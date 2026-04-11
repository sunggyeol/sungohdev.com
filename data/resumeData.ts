export type Education = {
  school: string;
  degree: string;
  details: string[]; // minor, GPA, honors as separate lines
  date: string;
};

export type Experience = {
  company: string;
  organization?: string; // department, team, or lab
  role: string;
  description: string;
  start: string;
  end: string;
};

export const education: Education[] = [
  {
    school: "Virginia Tech",
    degree: "B.S. Computer Science",
    details: [
      "Minor in Human-Computer Interaction",
      "3.9/4.0 · Summa Cum Laude",
    ],
    date: "Dec 2025",
  },
  {
    school:
      "University of Michigan - Shanghai Jiao Tong University Joint Institute",
    degree: "International Engineering Program",
    details: [],
    date: "Sep 2020 – Aug 2021",
  },
];

export const experience: Experience[] = [
  {
    company: "Kearney",
    role: "Research Analyst",
    description:
      "Building a marketing intelligence system for a global tech leader, designing multimodal AI pipelines to support social media campaign analytics and performance modeling",
    start: "Jan 2026",
    end: "Present",
  },
  {
    company: "Virginia Tech",
    organization: "Department of Computer Science",
    role: "Undergraduate Teaching Assistant",
    description:
      "Mentored student project groups and facilitated in-class activity sessions for CS 3724: Introduction to HCI",
    start: "Jan 2025",
    end: "Dec 2025",
  },
  {
    company: "Virginia Tech",
    organization: "Notification Systems Lab (Tech on the Trail Lab)",
    role: "Undergraduate Research Assistant",
    description:
      "Distilled and integrated LLMs into a learning platform for feedback generation and semantic visualization",
    start: "Aug 2024",
    end: "May 2025",
  },
  {
    company: "Virginia Tech",
    organization: "IDEEAS Lab",
    role: "Undergraduate Research Assistant",
    description:
      "Researched generative AI in CS education using LLM and NLP techniques, including embedding and clustering methods to identify key themes",
    start: "Dec 2023",
    end: "Dec 2025",
  },
  {
    company: "Abear",
    role: "Research Assistant",
    description:
      "Built PoC agentic image processing AI pipelines for content generation on B2B e-commerce platforms",
    start: "May 2025",
    end: "Aug 2025",
  },
  {
    company: "Fasoo",
    organization: "Cloud Development Team",
    role: "Software Engineer Intern",
    description:
      "Built a speech-to-speech pipeline on AWS EC2 with real-time transcription and LLM integration",
    start: "Jun 2024",
    end: "Aug 2024",
  },
  {
    company: "Republic of Korea Army",
    role: "Sergeant",
    description: "Operated thermal observation devices for surveillance",
    start: "Sep 2021",
    end: "Mar 2023",
  },
];
