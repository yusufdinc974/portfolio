export interface LinkedInExperience {
  title: string;
  company: string;
  timeframe: string;
  location?: string;
  description?: string;
}

export interface LinkedInEducation {
  school: string;
  degree?: string;
  timeframe?: string;
  description?: string;
}

export interface LinkedInProfile {
  name: string;
  profileUrl: string;
  headline?: string;
  location?: string;
  summary?: string;
  experience: LinkedInExperience[];
  education: LinkedInEducation[];
  skills: string[];
}

export const linkedInProfile: LinkedInProfile = {
  name: "Yusuf Dinc",
  profileUrl: "https://www.linkedin.com/in/dincyusuf/",
  headline: "Computer Engineering Student at Gebze Technical University",
  location: "Gebze, Kocaeli, Turkey",
  summary: "",
  experience: [
    {
      title: "Frontend Web Developer",
      company: "42 Bilisim A.S.",
      timeframe: "Jul 2025 - Aug 2025 · 2 mos",
      location: "Istanbul, Turkey",
    },
  ],
  education: [
    {
      school: "Gebze Technical University",
      timeframe: "2022 - 2026",
    },
    {
      school: "Akyazi Eyyup Genc Fen Lisesi",
      degree: "High School Diploma",
      timeframe: "Sep 2018 - Jun 2022",
    },
  ],
  skills: ["React.js", "JavaScript", "Analytical Skills"],
};
