import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEPT_FILE = path.join(ROOT, 'src/features/departments/cse/data/department.ts');
const DATA_DEPTS_FILE = path.join(ROOT, 'src/data/departments.ts');
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTnujRm7JCi5QwD3gHdFDwACjTvLpOXTZMXWurYw35NjNOpPCJ_nQdTGszg9feNhw/pubhtml/sheet?headers=false&gid=1040027563';

function cleanName(raw) {
    let s = raw.trim();
    s = s.replace(/^(Dr|Mr|Mrs|Ms|Prof)\.\s*/i, (m, g) => g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() + '. ');
    s = s.replace(/([A-Z]\.)([A-Z]+)/g, '$1 $2');
    const parts = s.split(/\s+/);
    const formatted = parts.map((token, idx) => {
        if (idx === 0 && /^(Dr|Mr|Mrs|Ms|Prof)\.$/.test(token)) return token;
        if (/^([A-Z]\.)+$/.test(token)) return token.toUpperCase();
        if (token.length === 1) return token.toUpperCase();
        return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
    });
    return formatted.join(' ').replace(/\s+/g, ' ').trim();
}

function cleanQualification(raw) {
    let q = raw.trim();
    q = q.replace(/M\.\s*Tech/gi, 'M.Tech');
    q = q.replace(/Ph\.\s*D/gi, 'Ph.D');
    q = q.replace(/M\.Tech,\s*\(Ph\.D\)/gi, 'M.Tech, (Ph.D)');
    q = q.replace(/M\.Tech\.\s*Ph\.D\./gi, 'M.Tech, Ph.D.');
    return q;
}

function cleanDesignation(raw) {
    let d = raw.trim().replace(/&amp;/g, '&');
    if (d.toLowerCase().includes('associate professor & head') || d.toLowerCase().includes('associate professor and head')) {
        return 'Associate Professor & Head';
    }
    return d;
}

const existingImages = {
    'Dr. P. Veera Prakash': '/optimized/Faculty/cse_hod.jpg.webp',
    'Dr. M. Ranjit Reddy': '/optimized/Faculty/ranjit.jpg.webp',
    'Dr. M. Vijaya Bhaskar': '/optimized/Faculty/vijay bhaskar.png.webp'
};

async function updateFaculty() {
    console.log('Fetching Google Sheet...');
    const res = await fetch(SHEET_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    const trMatches = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)];
    const rows = trMatches.map((tr) => {
        return [...tr[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((td) => {
            const href = td[1].match(/href="([^"]+)"/)?.[1];
            let cleanUrl = href;
            if (cleanUrl) {
                try {
                    const u = new URL(cleanUrl);
                    const q = u.searchParams.get('q');
                    if (q) cleanUrl = q;
                } catch {}
            }
            const text = td[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
            return { text, link: cleanUrl };
        });
    });

    const facultyList = [];
    for (const r of rows) {
        if (!r || r.length < 5) continue;
        const sno = r[0]?.text;
        if (!sno || !/^\d+$/.test(sno)) continue;
        const rawName = r[1]?.text;
        const rawDesig = r[2]?.text;
        const joiningDate = r[3]?.text;
        const rawQual = r[4]?.text;
        const association = r[5]?.text;
        let profileUrl = r[6]?.link;
        if (profileUrl) {
            if (profileUrl.includes('google.com/url?q=')) {
                try {
                    const u = new URL(profileUrl);
                    profileUrl = u.searchParams.get('q') || profileUrl;
                } catch {}
            }
        }
        if (profileUrl && !profileUrl.startsWith('http')) profileUrl = undefined;
        if (profileUrl && profileUrl.includes('u7on2t3wh57mmmmarvqht5iolb7zdxohfxaueb3cqrda66kldux3rxpe5e')) profileUrl = undefined;

        const name = cleanName(rawName);
        const designation = cleanDesignation(rawDesig);
        const qualification = cleanQualification(rawQual);

        facultyList.push({
            name,
            designation,
            specialization: 'Computer Science and Engineering',
            qualification,
            joiningDate,
            association,
            ...(existingImages[name] ? { image: existingImages[name] } : {}),
            ...(profileUrl ? { profileUrl } : {})
        });
    }

    console.log(`Extracted ${facultyList.length} faculty members from sheet.`);

    // 1. Update src/features/departments/cse/data/department.ts
    let deptContent = await readFile(DEPT_FILE, 'utf8');
    deptContent = deptContent.replace(/"faculty":\s*"[^"]*"/, `"faculty": "${facultyList.length}"`);
    const facultyJson = JSON.stringify(facultyList, null, 8);
    
    const startMarker = '"faculty": [';
    const endMarker = '    "overview": [';
    const startIdx = deptContent.indexOf(startMarker);
    const endIdx = deptContent.indexOf(endMarker, startIdx);
    if (startIdx === -1 || endIdx === -1) {
        throw new Error('Could not find faculty array boundaries in ' + DEPT_FILE);
    }
    const updatedDeptContent = deptContent.slice(0, startIdx) + `"faculty": ${facultyJson},` + '\n' + deptContent.slice(endIdx);
    await writeFile(DEPT_FILE, updatedDeptContent, 'utf8');
    console.log('Updated ' + DEPT_FILE);

    // 2. Also keep src/data/departments.ts CSE faculty in sync if present
    try {
        let allDeptsContent = await readFile(DATA_DEPTS_FILE, 'utf8');
        const cseStart = allDeptsContent.indexOf("slug: 'cse'");
        if (cseStart !== -1) {
            const facStart = allDeptsContent.indexOf('faculty: [', cseStart);
            const facEnd = allDeptsContent.indexOf('        overview: [', facStart);
            if (facStart !== -1 && facEnd !== -1) {
                const updatedAll = allDeptsContent.slice(0, facStart) + `faculty: ${facultyJson},` + '\n' + allDeptsContent.slice(facEnd);
                await writeFile(DATA_DEPTS_FILE, updatedAll, 'utf8');
                console.log('Updated ' + DATA_DEPTS_FILE);
            }
        }
    } catch (e) {
        console.warn('Could not update data/departments.ts:', e.message);
    }
}

updateFaculty().catch(console.error);
