import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

// Add this type definition if it doesn't exist already
type WorkExperience = {
  company: string;
  href: string;
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end?: string;
  description: string;
  badges?: string[]; // Add this line
};

export const DATA = {
  name: "Joshua Tamunotekena Jack",
  initials: "JTJ",
  url: "https://www.lovestoa.com",
  location: "New York, NY",
  locationLink: "https://www.google.com/maps/place/NEW+YORK",
  description:
    "Experienced Technical Professional with over six years of experience in customer success, system engineering, and technical support. Currently a Senior Customer Success Specialist at goTenna.",
  summary:
    "Currently serving as a Senior Customer Success Specialist at goTenna, managing customer engagement, technical support, and training. Strong expertise in Salesforce, Zendesk, and goTenna Pro products. Looking for a Customer Success Manager role to further enhance customer experiences.",
  avatarUrl: "/face.jpg",
  skills: [
    "Basic HTML",
    "Capcut",
    "Adobe Premiere Pro",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe After Effects",
    "Blender",
    "Unity",
    "Unreal Engine",
    "Figma",
    "G-Suite",
    "Basic CSS",
    "Salesforce",
    "Customer Success Management",
    "Salesforce Service Cloud",
    "Zendesk",
    "Technical Support",
    "Process Improvement",
    "Data Analysis & Reporting",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // Remove or comment out the blog link
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "joshuajackt@gmail.com",
    tel: "+1 646 682 0922",
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
      company: "goTenna",
      href: "https://gotenna.com",
      location: "Remote",
      title: "Senior Customer Success Specialist",
      logoUrl: "/gotenna.jpg", // Replace with the path to your logo image
      start: "June 2022",
      end: "Present",
      description:
        "Engaged with Public Safety, Military, and Pro customers, providing expert technical support and product knowledge. Managed Salesforce infrastructure, conducted training, and led VOC initiatives.",
      badges: [], // Add an empty array or appropriate badges
    },
    {
      company: "Thrive Now",
      badges: [],
      href: "https://thrivenow.com",
      location: "Remote",
      title: "IT Support Specialist",
      logoUrl: "/thrive.jpg",
      start: "January 2021",
      end: "April 2021",
      description:
        "IT Support Specialist with expertise in analyzing and documenting client/server network environments to rapidly resolve technical issues. Proficient in performing root cause analysis of workstation incidents, implementing efficient solutions, and communicating troubleshooting steps in clear, non-technical language to enhance client understanding. Experienced in utilizing various software tools, including Thrive's Protect and vendor-specific applications, to monitor and manage service tickets effectively. Adept at resolving a wide range of IT issues, including Office 365, client/server connectivity, remote access, password resets, and networked printer issues. Skilled at maintaining detailed documentation and collaborating with engineers to provide exceptional IT support..",
    },
    {
      company: "Sandata",
      href: "https://sandata.com/",
      badges: [],
      location: "Remote",
      title: "Helpdesk I",
      logoUrl: "/sandata.jpg",
      start: "January 2020",
      end: "April 2020",
      description:
        "In my role as a Helpdesk I at Sandata Technologies in Port Washington, I provided timely customer updates, led successful migrations of new users into software applications, and appropriately escalated issues based on established SLAs. This resulted in clear communication with customers, reduced onboarding time, and thorough troubleshooting steps for Tier 3 support.",
    },
    {
      company: "Town of Brookhaven",
      href: "https://brookhaven.ny.gov/",
      badges: [],
      location: "Brookhaven, NY",
      title: "IT Support Specialist",
      logoUrl: "/broook.jpg",
      start: "January 2019",
      end: "April 2019",
      description:
        "In my role as an Intern at Town of Brookhaven in Farmingville, New York, I performed a variety of tasks including Active Directory functions, computer workstation installations, and hardware servicing. I also managed high severity incidents and provided troubleshooting support to end-users..",
    },

  ] as WorkExperience[],
  education: [
    {
      school: "Suffolk County Community College",
      href: "https://sunysuffolk.edu/",
      degree: "Associate's Degree of Computer Science (ACS)",
      logoUrl: "/sunysuffolk.jpg",
      start: "2014",
      end: "2017",
    },
    {
      school: "Unmanned Aircraft General Aviation",
      href: "https://www.psiexams.com/",
      degree: "Part 107",
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