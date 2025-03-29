// Define project categories for filtering
const projectCategories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "embedded", label: "Embedded Systems" },
    { id: "coursework", label: "University Coursework" },
    { id: "c", label: "C Programming" },
    { id: "cpp", label: "C++" }
  ];
  
  // Enhanced project data
  const projects = [
    {
      id: "linguareader",
      name: "LinguaReader",
      title: "LinguaReader", // For backward compatibility
      description: "A PDF vocabulary reader with word tracking and quizzes.",
      thumbnail: "/images/projects/linguareader.jpg", // You can replace with actual image path
      category: ["web"],
      technologies: ["React", "Electron.js", "MongoDB", "Node.js"],
      featured: true,
      github: "https://github.com/yusufdinc974/LinguaReader",
      live: null,
      details: {
        challenge: "Building a cross-platform desktop application that could effectively track vocabulary and learning progress while reading PDFs.",
        solution: "Utilized Electron.js to create a desktop application with React for the frontend. Implemented a MongoDB database to store user vocabulary and quiz results.",
        outcome: "Created a functional application that helps language learners track unknown words and test their knowledge through automatically generated quizzes."
      }
    },
    {
      id: "gtuboy",
      name: "GTUBOY",
      title: "GTUBOY", // For backward compatibility
      description: "A custom Game Boy-style handheld console for retro gaming.",
      thumbnail: "/images/projects/gtuboy.jpg", // You can replace with actual image path
      category: ["embedded", "hardware"],
      technologies: ["C", "Assembly", "Embedded Systems"],
      featured: true,
      github: "https://github.com/yusufdinc974/GTUBOY",
      live: null,
      details: {
        challenge: "Designing and building a functional handheld gaming device with limited resources and knowledge of embedded systems.",
        solution: "Developed custom firmware in C and Assembly, designed the hardware circuits, and created a compact form factor inspired by the original Game Boy.",
        outcome: "A working prototype that can run simple games and demonstrates core concepts of embedded systems development."
      }
    },
    {
      id: "cse344",
      name: "System Programming Homeworks",
      title: "System Programming Homeworks", // For backward compatibility
      description: "University coursework focused on system programming in C.",
      thumbnail: "/images/projects/system-programming.jpg", // You can replace with actual image path
      category: ["coursework", "c"],
      technologies: ["C", "Linux", "Shell Scripting"],
      featured: false,
      github: "https://github.com/yusufdinc974/CSE-344_System-_Programming_Homeworks",
      live: null,
      details: {
        challenge: "Implementing complex system-level programming concepts in C on Linux platforms.",
        solution: "Developed solutions for assignments covering processes, threads, synchronization, IPC mechanisms, and file management.",
        outcome: "Gained deep understanding of operating system internals and system-level programming."
      }
    },
    {
      id: "cse341",
      name: "Programming Languages Homeworks",
      title: "Programming Languages Homeworks", // For backward compatibility
      description: "University coursework covering various programming languages and paradigms.",
      thumbnail: "/images/projects/programming-languages.jpg", // You can replace with actual image path
      category: ["coursework"],
      technologies: ["Common Lisp", "Prolog", "Yacc"],
      featured: false,
      github: "https://github.com/yusufdinc974/CSE-341_Programming-Languages",
      live: null,
      details: {
        challenge: "Learning and applying different programming paradigms like functional, logic, and compiler construction.",
        solution: "Completed assignments in Common Lisp for functional programming, Prolog for logic programming, and Yacc for compiler design.",
        outcome: "Developed a broader understanding of programming language design principles and implementation techniques."
      }
    },
    {
      id: "cse241",
      name: "C++ Homeworks",
      title: "C++ Homeworks", // For backward compatibility
      description: "University coursework on object-oriented programming and data structures in C++.",
      thumbnail: "/images/projects/cpp.jpg", // You can replace with actual image path
      category: ["coursework", "cpp"],
      technologies: ["C++", "OOP", "Data Structures"],
      featured: false,
      github: "https://github.com/yusufdinc974/CSE-241_CPP-Homeworks",
      live: null,
      details: {
        challenge: "Implementing object-oriented designs and data structures efficiently in C++.",
        solution: "Created various applications demonstrating inheritance, polymorphism, templates, and standard library usage.",
        outcome: "Developed strong object-oriented programming skills and understanding of advanced C++ features."
      }
    },
    {
      id: "cse102",
      name: "C Homeworks",
      title: "C Homeworks", // For backward compatibility 
      description: "Introductory coursework in C programming.",
      thumbnail: "/images/projects/c-programming.jpg", // You can replace with actual image path
      category: ["coursework", "c"],
      technologies: ["C", "Basic Algorithms", "File Handling"],
      featured: false,
      github: "https://github.com/yusufdinc974/CSE-102_C-Homeworks",
      live: null,
      details: {
        challenge: "Learning fundamental programming concepts and implementing them in C.",
        solution: "Completed assignments covering arrays, pointers, structs, dynamic memory allocation, and file I/O.",
        outcome: "Built a solid foundation in programming fundamentals and C language skills."
      }
    }
  ];
  
  // Export both as named exports
  export { projects, projectCategories };
  
  // For backward compatibility
  export default projects;