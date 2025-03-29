// Education & Experience data for your portfolio
export const education = [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Computer Engineering",
      institution: "Gebze Technical University",
      location: "Kocaeli, Turkey",
      period: "2022 - 2026",
      description: "Still on study.",
      courses : [
        "Introduction to Programming",
        "Object-Oriented Programming",
        "Programming Languages",
        "System Programming",
        "Data Structures and Algorithms",
        "Theory of Computation",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
        "Database Systems",
        "Digital Logic Design",
        "Computer Organization",
        "Discrete Mathematics",
        "Linear Algebra",
        "Probability and Statistics",
        "Physics I (Mechanics)",
        "Physics II (Electromagnetism)"
        ]
    },
    {
      id: "edu-2",
      degree: "High School Diploma",
      institution: "Akyazı Eyyup Genç Science High School",
      location: "Sakarya, Turkey",
      period: "2018 - 2022",
      description: "Graduated with high honors. Focused on mathematics, physics and computer science courses.",
      courses: []
    }
];

// You removed this array but it's being imported in your Timeline component
export const experience = [
  {
    id: "exp-1",
    position: "Personal Projects",
    company: "Self-initiated",
    location: "Remote",
    period: "2021 - Present",
    description: "Designing and developing software solutions to solve real-world problems and enhance my technical skills.",
    achievements: [
      "Created LinguaReader, a PDF vocabulary reader for language learners",
      "Developed GTUBOY, a custom Game Boy-style handheld console",
      "Built various web applications using React, Node.js and Electron"
    ],
    technologies: ["JavaScript", "React", "Node.js", "Electron", "C/C++"]
  }
];
  
// About section info
export const aboutMe = {
  bio: "I'm a third-year Computer Science student at Gebze Technical University, passionate about software development, embedded systems, and programming languages. I enjoy building projects that solve real-world problems, like LinguaReader, a PDF vocabulary reader for language learners. My expertise includes React, Electron.js, Node.js, Flask, and system programming in C/C++. Beyond coding, I love learning languages, playing chess, and drawing. I believe in the power of open source and actively contribute to projects that inspire me. I'm always eager to learn new technologies and improve my skills. In my free time, I enjoy exploring electronics and working on mini C/C++ projects.",
  
  interests: [
    "Mini C, C++ Projects",
    "Web Development",
    "Electronics",
    "Open Source",
    "Language Learning",
    "Drawing"
  ],
  
  // Languages with proficiency levels and ISO codes for flags
  languages: [
    {
      name: "Turkish",
      proficiency: "Native",
      level: 100,
      iso: "tr",
      description: "Native language"
    },
    {
      name: "English",
      proficiency: "Fluent",
      level: 95,
      iso: "gb",
      description: "Fluent in speaking, reading, and writing"
    },
    {
      name: "Japanese",
      proficiency: "Intermediate",
      level: 75,
      iso: "jp",
      description: "JLPT N3 level, independent learner"
    },
    {
      name: "Spanish",
      proficiency: "Basic",
      level: 50,
      iso: "es",
      description: "A2 level, conversational basics, Reading level approximately B1"
    },
    {
      name: "Russian",
      proficiency: "Beginner",
      level: 30,
      iso: "ru",
      description: "Learning basics, can read and write Cyrillic alphabet"
    }
  ]
};
  
export default { education, experience, aboutMe };