import { gallery } from "./gallery";
import CADCourseStructure from "../../cad/components/CADCourseStructure";
import EEEOutcome from "../components/EEEOutcome";
import EEEStudents from "../components/EEEStudents";
import EEEStudentChapters from "../components/EEEStudentChapters";

import type { DepartmentData } from "../../shared/types";

export const eeeDepartment: DepartmentData = {
  slug: "eee",
  code: "EEE",
  name: "Electrical and Electronics",
  fullName: "Department of Electrical and Electronics Engineering",
  tagline: "Electrical circuits, machines, power systems, and control engineering.",
  description: [
    "Electrical & Electronics Engineering (EEE), deals with the engineering problems, opportunities and needs of electrical, electronics, computer, telecommunication systems and related industries. This branch provides students with a wide range of fundamental knowledge in core disciplines such as Electrical Circuits, Electrical Machines, Electrical Power Systems, Control Systems, signal processing and micro-processors. The discipline focuses on design and manufacture of electrical, electronic devised, computers and their component parts, as well as on the integration of components into complex systems.",
    "The department was established in the year 2008 with Bachelors degree in Electrical and Electronics Engineering and the same is accredited by National Board of Accreditation (NBA). Initially intake into B. Tech program is 60 later in the year 2010 intake has been increased to 120. Department also offers postgraduate programs in the Electrical Engineering namely Master of Technology in Electrical Power Systems since 2012.",
    "The Department has highly qualified and experienced faculty members who have specialized in various areas such as Electrical Power Systems, Power and Industrial Drives, Power Electronics...etc., Department also has good infrastructural facilities and well equipped laboratories to acquire the practical knowledge."
  ],
  highlights: [
    "NBA-accredited B.Tech (EEE) programme — AICTE approved",
    "Power electronics and control systems focus",
    "Practical lab sessions with modern equipment (7 labs)",
    "Renewable energy and smart grid technologies exposure",
    "Career preparation in power and automation engineering"
  ],
  image: "/departments/dept about us coverpages/eee_cover.jpg",
  researchAreas: [
    "Power Systems and Smart Grids",
    "Renewable Energy Integration",
    "Power Electronics",
    "Control and Automation"
  ],
  stats: {
    faculty: "16",
    labs: "7",
    students: "450+",
    placement: "88%"
  },
  intake: 120,
  accreditation: "NBA Accredited",
  eligibility:
    "10+2 with Physics, Chemistry and Mathematics (min. 45% marks; 40% for reserved categories). Admission through AP EAPCET / EAMCET. Lateral entry (20% seats) via AP ECET for Diploma holders.",
  vision:
    "To emerge as a premier center of learning in Electrical & Electronics Engineering with scientific quest having focus on professional ethics and human values.",
  mission: [
    {
      id: "DM1",
      text: "Provide academic environment conducive for high quality learning in Electrical and Electronics Engineering to ensure our graduates have successful careers."
    },
    {
      id: "DM2",
      text: "Strengthen industry institute interaction to enable the students work on real time problems and encourage them to engage in lifelong learning."
    },
    {
      id: "DM3",
      text: "Ensure that our students are well trained to work in a team with professional ethics and apply latest tools for the solution of engineering problems."
    }
  ],
  goals:
    "EEE graduates will have successful careers in any organization or excel in higher education programs, be successful professionals with ethical values capable of working in multi-disciplinary areas, and practice lifelong learning to comprehend, analyze and design solutions for real life problems.",
  hodMessage: {
    name: "Dr. G. Meerimatha",
    designation: "Professor and Head",
    message:
      "The EEE department strives to provide a comprehensive education that prepares students for successful careers in electrical engineering and related fields. We emphasize both theoretical foundations and practical skills, enabling our graduates to contribute effectively to power sector, automation, and the growing renewable energy industry.",
    image: ""
  },
  faculty: [
    {
        "name": "Dr. G. Balakrishna",
        "designation": "Professor & Principal",
        "qualification": "M. Tech. Ph. D.",
        "joiningDate": "25/11/2016",
        "association": "Regular",
        "profileUrl": "https://sites.google.com/d/0BxAN81LtDJjpaHZONlhpT0pqUUE/p/0BxAN81LtDJjpcUJyTF9rTHA4Rms/edit?resourcekey=0-LY9RQ6JUTgN-VIrRHY-yAw",
        "image": "/optimized/principal.jpg.webp"
    },
    {
        "name": "Dr. G. Meerimatha",
        "designation": "Professor & Head",
        "qualification": "M. Tech. Ph. D.",
        "joiningDate": "01/06/2010",
        "association": "Regular",
        "profileUrl": "https://sites.google.com/view/meerimathaeee/funded-projects"
    },
    {
        "name": "Dr. U. Sreenivas",
        "designation": "Professor & Vice Principal",
        "qualification": "M. Tech. Ph. D.",
        "joiningDate": "05/07/2022",
        "association": "Regular",
        "profileUrl": "https://sites.google.com/view/usreenivas/home"
    },
    {
        "name": "Dr. P. Padmavathi",
        "designation": "Associate Professor",
        "qualification": "M. Tech. Ph. D.",
        "joiningDate": "15/02/2021",
        "association": "Regular",
        "profileUrl": "https://sites.google.com/d/1-__Iv2hsai8hg_OhYIB5Q75bhIgLTFM0/p/1L_Xc3Fo4wwmPMvDIggyUFj3sHped_Vdx/edit"
    },
    {
        "name": "Dr. S. Bhargava Reddy",
        "designation": "Associate Professor",
        "qualification": "M. Tech. Ph. D.",
        "joiningDate": "19/06/2017",
        "association": "Regular",
        "profileUrl": "https://sites.google.com/view/bhargavareddyeee/home"
    },
    {
        "name": "Mr. K. Vinod Kumar",
        "designation": "Assistant Professor",
        "qualification": "M. Tech(Ph. D)",
        "joiningDate": "21/07/2014",
        "association": "Regular",
        "profileUrl": "https://sites.google.com/view/vinodeee/home"
    },
    {
        "name": "Mr. T. Aravind Babu",
        "designation": "Assistant Professor",
        "qualification": "M. Tech(Ph. D)",
        "joiningDate": "01/06/2012",
        "association": "Regular",
        "profileUrl": "https://sites.google.com/u/1/s/0B2qDIx8CZW1HVy13NlhMZnJweTg/edit?usp=sites_home&ths=true"
    },
    {
        "name": "Mr. Y. Sathish Kumar",
        "designation": "Assistant Professor",
        "qualification": "M. Tech.",
        "joiningDate": "02/07/2015",
        "association": "Regular",
        "profileUrl": "https://sites.google.com/new?tab=m3&tgif=d"
    },
    {
        "name": "Mrs. B. Shravani",
        "designation": "Assistant Professor",
        "qualification": "M. Tech.",
        "joiningDate": "04/07/2016",
        "association": "Regular",
        "profileUrl": "https://sites.google.com/d/0B64DpkIKnFT8NzRaZnIyZWRSWms/p/0B64DpkIKnFT8WXljLVdjV2V1dTA/edit?resourcekey=0-ZJYLQgJsQQYPY1u5GTvpLg"
    },
    {
        "name": "Mrs. M. Sushmi",
        "designation": "Assistant Professor",
        "qualification": "M. Tech.",
        "joiningDate": "06/12/2019",
        "association": "Regular",
        "profileUrl": "https://sites.google.com/srit.ac.in/sushmi/home"
    },
    {
        "name": "Mr. K M . Sivasankara Reddy",
        "designation": "Assistant Professor",
        "qualification": "M. Tech.",
        "joiningDate": "30/06/2022",
        "association": "Regular",
        "profileUrl": "https://sites.google.com/srit.ac.in/mr-k-m-siva-sankara-reddy"
    },
    {
        "name": "Mr. N. Naresh Gupta",
        "designation": "Assistant Professor",
        "qualification": "M. Tech.",
        "joiningDate": "22/06/2022",
        "association": "Regular",
        "profileUrl": "https://sites.google.com/srit.ac.in/facultyprofile/home"
    },
    {
        "name": "Mrs. A C Jeevitha",
        "designation": "Assistant Professor",
        "qualification": "M. Tech(Ph. D)",
        "joiningDate": "18/06/2024",
        "association": "Regular",
        "profileUrl": "https://sites.google.com/srit.ac.in/a-c-jeevitha/home"
    },
    {
        "name": "Mrs.S.Nalini",
        "designation": "Assistant Professor",
        "qualification": "M. Tech",
        "joiningDate": "01/07/2026",
        "association": "Regular"
    },
    {
        "name": "Mr.A.Kalyan Kumar",
        "designation": "Assistant Professor",
        "qualification": "M. Tech",
        "joiningDate": "01/07/2026",
        "association": "Regular"
    },
    {
        "name": "Mrs.Y.Dhanalakshmi",
        "designation": "Assistant Professor",
        "qualification": "M. Tech",
        "joiningDate": "01/07/2026",
        "association": "Regular"
    }
],
  facultyAccordions: [
    {
        "title": "Faculty Profiles",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vT8M91xvz8XZaLG2EjFXtdhV7SEIuZMrW7jf1HxrFnTf8_5u4Q7RaqSPtOby46hMQd9jIlWZYrF6V3r/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Publications",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vSlZoTgjaVuLu8mi_0ldMwAUO83r-M2VytxI4UilLW3oMbWaHH6MQgj79CN-8ha7Z7sV_G-ddJvpw3j/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Patents",
        "content": "<p>Content coming soon.</p>"
    },
    {
        "title": "Faculty Certifications",
        "content": "<p>Content coming soon.</p>"
    },
    {
        "title": "FDP's",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vT_T5u3ANzEmaHzt6J-NFuVb6KaxzVLPdPGX974qKb4qTojZFGLZUcTWMS1yyHWuK0NjN9f5WgLq7zp/pubhtml?widget=true&chrome=false&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Innovative Teaching Methods",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vTTZcFzQ9GA4F-0uvRtMQSS4OAcTvMAhPZCR8h5VDnBIIGb6_TFFF88FRH0VsRMlEpKb3tPh0lMSymk/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    }
],
  overview: [
    {
        "title": "Vision & Mission",
        "content": "<h4><span style=\"color: #f67437;\"><strong>VISION:</strong></span></h4><p align=\"justify\">To emerge as a premier center of learning in Electrical &amp; Electronics Engineering with scientific quest having focus on professional ethics and human values.</p><h4><span style=\"color: #f67437;\"><strong>MISSION:</strong></span></h4><p align=\"justify\"><strong>DM 1:</strong> Provide academic environment conducive for high quality learning in Electrical and Electronics Engineering to ensure our graduates have successful careers.</p><p align=\"JUSTIFY\"><strong>DM 2:</strong> Strengthen industry institute interaction to enable the students work on real time problems and encourage them to engage in lifelong learning.</p><p align=\"justify\"><strong>DM 3:</strong> Ensure that our students are well trained to work in a team with professional ethics and apply latest tools for the solution of engineering problems.</p>"
    },
    {
        "title": "Course Expert Team",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vRyLnTCIfYolKF_djSChLIrIrM3LpG9-0KEwj62azrBzAOzKU1YcJUZdDjfKwb29s0FJjxxvWSNTa97/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Department Academic Committee (DAC)",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vT8tigeOrMm90MZCpyoF4od5jQDMnEIIzphav4qAEd0sewxG_bOZfLqRlPjxm46UYF2nqn4ruEve-uE/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Program Assessment Committee (PAC)",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vS2Zl1vy0ZK5dgQgftfl2oKjN5OWoQFxFjL1o5tA_h_o5tRjHaWafOD2rB4iRs5nTezbX7ufc-bZiru/pubhtml?widget=true&chrome=false&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Academic Audit",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vTqIH4DkFDsnlmVziVAKmaYAKZheNlk-hdNcuZCdqHCTACtnyxQyWnkeXq-_pCp0JqCkIxafo92j_o1/pubhtml?widget=true&chrome=false&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Board Of Studies",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vRUYfIEYh5pRtnMe9o2u00qiDe5hCvlQqrRIR7hfbldWisWv6TBl_sTUqwROMAcJZdbh-hVY7CKLJms/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Achievements",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vRxDCfAMBWqOB8ztGKtMTjH7qx5WMjWqlEuzjSR9GtKVNZiRGwmfgRXJraoi4dBNQ/pubhtml?widget=true&chrome=false&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "News Letters",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vRHRvR0wKQ7_nOM5Ld5HO7WsyYxG0PMsnBZV1yiwGoDYmLH6SvJcJiybaTZejFXf-mUgVGJyN3QRF6e/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Technical Magazine",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vTS_sl70gquZmQLGHmqCCP8_hHMjLCmX0ZqDrMSreslKusXZ--xh8Rs5kK4t2pbNQ/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    }
],
  courseStructureItems: [
    {
        "title": "Regulations & Syllabus",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vSKLllqUpvENsfiJcaM12CT-KiEPm1bBOi5mLfCMDQeB_Y9WED5apWvoCHqySxgFGbPntK2AudrQJj5/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Academic Calendar",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vTqNMK5Yuj07nPBDEo7pvRNCqXrKWaI1FhsxAc77wgd6T9d2IfTx2umKyxY364FxtN4Uo-AzlBylPVR/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Course Outcomes",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vRl3H8EijwK35v-g9HX9VbvjbooH04Ebo55n5YrQm7jQCTSkipvArbwfrcQ-7bVfYoYOhM5xsSsyx3A/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Time Tables",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vTBecPMc6-OjFlYDTW6S21OTTdT_YfjOCaE7tTA6NMVjA6xb414LUTv5KwP9JLjCh1UI3Brfu_g8Iya/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Lesson Plans",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vRIfnuLWhG65Fc13e2OB9oQ-AyjcJekhxbnzqufd9q8OPn8Dcv9LvR8jzSI5mnBqYr7MHEW-9YVlif7/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    }
],
  outcome: [
    {
        "title": "(PEOs)",
        "content": "<p><strong>An SRIT graduate in Electrical &amp; Electronics Engineering, after three to four years of graduation will:</strong></p><p align=\"justify\"><span style=\"color: #f67437;\"><strong>PEO 1: </strong></span>Have successful careers in any organization or excel in higher education programs.</p><p align=\"justify\"><span style=\"color: #f67437;\"><strong>PEO 2: </strong></span>Be successful professionals with ethical values and capable of working in multi disciplinary areas in a team to solve real life problems in broad societal context.</p><p align=\"justify\"><span style=\"color: #f67437;\"><strong>PEO 3: </strong></span>Practice lifelong learning with good scientific and engineering breadth so as to comprehend, analyze and design solutions for the real life problems.</p>"
    },
    {
        "title": "Program Outcomes (POs) & Program Specific Outcome (PSOs)",
        "content": "<h4><span style=\"color: #f67437;\"><strong>Program Outcomes (POs)</strong></span></h4><p align=\"justify\"><strong>PO 1: Engineering Knowledge:</strong> Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.</p><p align=\"justify\"><strong>PO 2: Problem Analysis:</strong> Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.</p><p align=\"justify\"><strong>PO 3: Design / Development Of Solutions:</strong> Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.</p><p align=\"justify\"><strong>PO 4: Conduct Investigations Of Complex Problems:</strong> Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.</p><p align=\"justify\"><strong>PO 5: Modern Tool Usage:</strong> Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.</p><p align=\"justify\"><strong>PO 6: The Engineer And Society:</strong> Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.</p><p align=\"justify\"><strong>PO 7: Environment And Sustainability:</strong> Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.</p><p align=\"justify\"><strong>PO 8: Ethics:</strong> Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.</p><p align=\"justify\"><strong>PO 9: Individual And Team Work:</strong> Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.</p><p align=\"justify\"><strong>PO 10: Communication:</strong> Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.</p><p align=\"justify\"><strong>PO 11: Project Management And Finance:</strong> Demonstrate knowledge and understanding of the engineering and management principles and apply these to one&#8217;s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.</p><p align=\"justify\"><strong>PO 12: Life-Long Learning:</strong> Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.</p><h4><span style=\"color: #f67437;\"><strong>Program Specific Outcomes (PSOs)</strong></span></h4><p>At the end of the B. Tech program in Electrical and Electronics Engineering, the graduate will be able to:</p><p><strong>PSO 1: </strong>Understand the design, operation and control of systems for the generation, transmission, distribution and utilization of electric power.</p><p><strong>PSO 2: </strong>Understand the design, operation and control of machines in industrial drives.</p><p><strong>PSO 3: </strong>Understand the design and operation of electronic systems and microprocessor based control systems.</p>"
    },
    {
        "title": "Outcome Based Education Manual",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/1aGgy7HFpHG2RRVP5o14diUSUyE6aXVlMfFk893QEIX4/pubhtml?widget=true&chrome=false&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Attainment of Course Outcomes",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/1iSHDfqlTn4-A7C-03NmEAoa9jghDHGnR-CBz3-5Ej9g/pubhtml?widget=true&chrome=false&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "PO and PSO Attainment",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/1xylBHvhveU-4lGdXCB46zQJKGVkM9obSWUI6lB7mjGo/pubhtml?widget=true&chrome=false&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    }
],
  eContent: [
    {
        "title": "EEE- 2025-29 Batch",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vSByZpsgqhy5t7BjS1bC6QgoScA4jIh52lzSCoj_R9ZH5iJPMfq2vSgpaXyfzwM6A/pubhtml?widget=true&chrome=false&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "EEE- 2024-28 Batch",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vTopFm_eCPNx7yuy4CUQbowcnfnlA7Ytfh9VMg1FzRLZujnWEB8i5lOwu3kif1rRQ/pubhtml?widget=true&chrome=false&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "EEE- 2023-27 Batch",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3E92o8xipfLKos6beyzvB1o11BMU05rxn0x7T48Le5UTUprCSuUQDre4HamX0nA/pubhtml?widget=true&chrome=false&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "EEE- 2022-26 Batch",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vTIZU34IsEQQb4IIFKRuySWqXNoXNWjZ03e-AuJSzsjer0WpwRDe8DYVZh0j7b03Q/pubhtml?widget=true&chrome=false&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "EEE- 2021-25 Batch",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vTbzIbBofIpePmHU5z2doapLcFXYT8Vuj0hIvsxoVdcoGsDZq-50oSU8Mn36isUmw/pubhtml?widget=true&chrome=false&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "EEE- 2020-24 Batch",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vQuldabMXCSoCBGFannAezo7SnZPGgVLVy6LiD_X9_TW34yXfa29XYSVMeJvBo6ZA/pubhtml?widget=true&chrome=false&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "EEE- 2019-23 Batch",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vREuVxkiZNz4mn4XwXz1JT7ZrGFRtboaoDwTXZO2t5R-LuD8nij5NF7ykUhIXdo5g/pubhtml?widget=true&chrome=false&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    }
],
  students: [
    {
        "title": "Student Academic Activities",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vRBQORq0WOiakoZu7WchZyn7E9Jaz_dLk8bM1Vpd7ONwYrVPZcnEX3h8D5QSmTQqZNlkoWOCDyjzkuI/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Cocurricular and Extra Curricular Activities",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vRY4TTaT7ZnZgExt0NYpZkC_RCn4Telkwurmr5VhbpLU2I9qmdI7E6KpOqqy8QJjxsmS2K5Ep-N4RO6/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Students Internships",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vSLy9BlV1NO3SDDAkDSn2HXHi-xUUBAR1hNDGMpFmw2TC7jqrgnQklQCaYpVPR3nci4mLRdGGgmiqpn/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Students Projects / Field Work",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vQvJE9IrIZ0LBa4ke28URvriKqnKTVJmBw0Q5FT62IyNp8kjnwswc_GLQB5ws_2ZtxCLuwbS3CeRHmM/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Placements",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vQSzGnxhmdUbsA7NCv2VidgJhCu_ShLyQYS9BMOEAvTtA-srwX5rV392OUvv76LeUY6SPeoDcYewBhC/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    },
    {
        "title": "Roll of Honors",
        "content": "<iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vQn89W7jDZbcxM0TKLtORxTnsEmZFsgAGOU67zgB5ljZyfKDg_0H1Wii9yPEdl2p0Gh_58NtK4z2PDy/pubhtml?widget=true&headers=false\" width=\"100%\" height=\"600\" style=\"border: none; overflow: hidden;\"></iframe>"
    }
],
  studentChapters: [
    {
        "title": "ISTE",
        "content": "<div class=\"p-4 space-y-4\"><p class=\"text-neutral-700 leading-relaxed\">The Indian Society for Technical Education (ISTE) is the leading National Professional non-profit making Society for the Technical Education System in our country with the motto of Career Development of Teachers and Personality Development of Students and overall development of our Technical Education System.</p></div>"
    }
],
  components: {
    CourseStructure: CADCourseStructure,
    Outcome: EEEOutcome,
    Students: EEEStudents,
    StudentChapters: EEEStudentChapters
  },
  gallery
};
