import { Icons } from "@/components/icons";
import { FileTextIcon, HomeIcon } from "lucide-react";

type WorkExperience = {
  company: string;
  href: string;
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end?: string;
  description: string;
  badges?: string[];
};

export const DATA = {
  name: "Joshua Tamunotekena Jack",
  initials: "JTJ",
  url: "https://www.lovestoa.com",
  location: "Rockville Centre, NY",
  locationLink: "https://www.google.com/maps/place/Rockville+Centre,+NY",
  resumeUrl: "/Joshua_Jack_Resume.pdf",
  description:
    "Customer Success Manager owning a $3.8M book of enterprise SaaS accounts at 96.9% logo retention. I take customers from signed contract through go-live, and use AI to scale the work.",
  summary:
    "Customer Success Manager at **LeapXpert**, owning a $3.8M book of business across 65 enterprise SaaS accounts at 96.9% logo retention. Four years in technical customer success, taking customers from signed contract through implementation and go-live in regulated, integration-heavy environments. I build the playbooks, documentation, and health workflows that let a customer success function scale, and use AI tools daily to draft, document, and streamline customer work.",
  avatarUrl: "/face.jpg",
  skills: [
    "Customer Onboarding",
    "Implementation & Go-Live",
    "Playbook Development",
    "Product Adoption",
    "Customer Health Scoring",
    "Churn Risk & Retention",
    "QBRs",
    "Renewal Readiness",
    "Escalation Management",
    "Voice of the Customer",
    "Executive Communication",
    "Planhat",
    "Salesforce Service Cloud",
    "Zendesk",
    "Freshdesk",
    "CRM Reporting",
    "Knowledge Base Management",
    "Claude Code",
    "Claude Cowork",
    "ChatGPT",
    "Responsive AI",
    "n8n",
    "Gong",
    "SSO",
    "Identity & Access Controls",
    "Encryption & Archiving Workflows",
    "SLA Management",
    "Technical Documentation",
    "Training Program Design",
  ],
  certifications: [
    "Salesforce Certified Associate",
    "CompTIA A+",
    "Planhat Certified Power User – Organise Customer Data",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home", newTab: false },
    {
      href: "/Joshua_Jack_Resume.pdf",
      icon: FileTextIcon,
      label: "Resume",
      newTab: true,
    },
  ],
  contact: {
    email: "joshuajackt@gmail.com",
    social: {
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/joshua-jack-67b2b712b/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:joshuajackt@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "LeapXpert",
      href: "https://www.leapxpert.com",
      location: "New York, NY",
      title: "Customer Success Manager",
      logoUrl: "",
      start: "June 2025",
      end: "Present",
      description:
        "Own a $3.8M book of business across 65 enterprise SaaS accounts, leading regulated financial services customers from signed contract through onboarding, implementation, and go-live, then owning adoption, stakeholder alignment, and escalations. Maintain 96.9% logo retention by surfacing adoption blockers, product gaps, and renewal risks early and driving them to resolution with Product and Engineering. Lead technical implementations of SSO, bring-your-own-key encryption, TLS archiving, retention controls, and IP whitelisting. Built success plans, onboarding touchpoints, QBR materials, and health-score-triggered follow-up workflows in Planhat. Use Claude Code, Claude Cowork, ChatGPT, and n8n daily to automate account documentation, turn Gong calls into follow-ups, and build onboarding materials.",
      badges: [],
    },
    {
      company: "goTenna",
      href: "https://gotenna.com",
      location: "New York, NY",
      title: "Senior Customer Success Specialist",
      logoUrl: "/gotenna.jpg",
      start: "June 2022",
      end: "May 2025",
      description:
        "Led customer onboarding and deployment planning under a single-award U.S. Customs and Border Protection SBIR Phase III program valued up to $99M, coordinating device provisioning and training for field units across southern border sectors. Authored quick-start guides, SOPs, and multi-tier training programs for federal and law enforcement users, cutting first-day setup time by about 40%. Administered Salesforce Service Console and Zendesk to centralize case data and improve CSAT and NPS visibility. Turned field feedback into Voice of the Customer reports adopted by Product, and built the goTenna Pro knowledge base and community content.",
      badges: [],
    },
    {
      company: "Thrive",
      href: "https://thrivenextgen.com",
      location: "New York, NY",
      title: "System Engineer",
      logoUrl: "/thrive.jpg",
      start: "December 2021",
      end: "July 2022",
      description:
        "Diagnosed and resolved client workstation, Office 365, remote access, and connectivity incidents within SLA-driven managed-service workflows, keeping clients informed throughout. Triaged the Remote Service Center ticket board and documented configurations, procedures, and system changes.",
      badges: [],
    },
    {
      company: "Best Buy",
      href: "https://www.bestbuy.com",
      location: "Greater New York City Area",
      title: "Lead Geek Squad Agent",
      logoUrl: "",
      start: "2018",
      end: "2021",
      description:
        "Delivered technical support and repair across consumer devices with a 95% customer satisfaction rating, mentored junior technicians, and maintained service records.",
      badges: [],
    },
    {
      company: "Sandata Technologies",
      href: "https://sandata.com/",
      location: "Port Washington, NY",
      title: "Helpdesk I",
      logoUrl: "/sandata.jpg",
      start: "2017",
      end: "2020",
      description:
        "Supported migrations of new users into healthcare software applications, escalated issues by SLA, and handled HIPAA-sensitive client data in line with security requirements.",
      badges: [],
    },
    {
      company: "Town of Brookhaven",
      href: "https://brookhaven.ny.gov/",
      location: "Farmingville, NY",
      title: "IT Support Intern",
      logoUrl: "/broook.jpg",
      start: "January 2019",
      end: "April 2019",
      description:
        "Handled Active Directory tasks, workstation installations, and hardware servicing, and supported end users through high-severity incidents.",
      badges: [],
    },
  ] as WorkExperience[],
  education: [
    {
      school: "Suffolk County Community College",
      href: "https://sunysuffolk.edu/",
      degree:
        "A.S., Computer/Information Technology Administration and Management",
      logoUrl: "/sunysuffolk.jpg",
      start: "2014",
      end: "2017",
    },
    {
      school: "Unmanned Aircraft General Aviation",
      href: "https://www.psiexams.com/",
      degree: "FAA Part 107 Remote Pilot",
      logoUrl: "/pso.jpg",
      start: "2024",
      end: "2024",
    },
  ],
  projects: [
    {
      title: "Plain Writer",
      href: "https://b0bbiy.github.io/plain-writer/",
      dates: "2026",
      active: true,
      description:
        "A free, quiet Markdown editor for Windows. Your writing stays in plain files on your own computer, and the tools that check it never go online.",
      technologies: ["Markdown", "Windows"],
      links: [
        {
          type: "Website",
          href: "https://b0bbiy.github.io/plain-writer/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "https://b0bbiy.github.io/plain-writer/img/social.png",
      video: "",
    },
    {
      title: "Scriptorium",
      href: "https://scriptorium-mocha-pi.vercel.app/",
      dates: "2026",
      active: true,
      description:
        "A reading room for the manuscripts behind the Bible: high-resolution pages from the great codices and papyri, set beside the text as you read it.",
      technologies: ["JavaScript", "OpenSeadragon", "Vercel"],
      links: [
        {
          type: "Website",
          href: "https://scriptorium-mocha-pi.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "https://scriptorium-mocha-pi.vercel.app/share.jpg",
      video: "",
    },
  ],
} as const;