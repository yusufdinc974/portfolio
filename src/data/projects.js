// Sample projects data for the portfolio
const projects = [
    {
      id: 1,
      title: "Smart Home Automation System",
      description: "A full-stack IoT solution for home automation using ESP32 microcontrollers, MQTT, and a React frontend.",
      thumbnail: "/images/projects/smart-home.jpg",
      category: ["embedded", "web"],
      technologies: ["ESP32", "MQTT", "React", "Node.js", "PCB Design"],
      featured: true,
      github: "https://github.com/username/smart-home",
      live: "https://smart-home-demo.com",
      details: {
        challenge: "Creating a reliable communication system between multiple IoT devices while maintaining low power consumption and high security.",
        solution: "Implemented an MQTT broker with TLS encryption, optimized deep sleep cycles for battery-powered sensors, and developed a user-friendly React dashboard.",
        outcome: "Reduced power consumption by 40% while improving response time. The system now manages 15+ devices reliably.",
        images: [
          "/images/projects/smart-home-1.jpg",
          "/images/projects/smart-home-2.jpg",
          "/images/projects/smart-home-3.jpg"
        ]
      }
    },
    {
      id: 2,
      title: "Custom CPU Architecture",
      description: "A 16-bit RISC processor implemented in VHDL with a custom instruction set and assembler.",
      thumbnail: "/images/projects/cpu-arch.jpg",
      category: ["hardware", "low-level"],
      technologies: ["VHDL", "FPGA", "Python", "Assembly"],
      featured: true,
      github: "https://github.com/username/custom-cpu",
      live: null,
      details: {
        challenge: "Designing an efficient instruction set that balances simplicity with functionality, while maintaining good performance on an FPGA.",
        solution: "Created a 3-stage pipelined architecture with 32 instructions optimized for common operations, along with a Python-based assembler and simulator.",
        outcome: "Successfully implemented on an Artix-7 FPGA running at 50MHz with benchmarks showing comparable performance to commercial 16-bit MCUs.",
        images: [
          "/images/projects/cpu-arch-1.jpg",
          "/images/projects/cpu-arch-2.jpg"
        ]
      }
    },
    {
      id: 3,
      title: "Gesture-Controlled Robot",
      description: "A robotic arm that mimics human hand movements captured by a computer vision system.",
      thumbnail: "/images/projects/robot-arm.jpg",
      category: ["robotics", "ai"],
      technologies: ["OpenCV", "TensorFlow", "Arduino", "Servo Motors", "3D Printing"],
      featured: false,
      github: "https://github.com/username/gesture-robot",
      live: null,
      details: {
        challenge: "Accurately translating human hand movements to a mechanical arm with different degrees of freedom and physical constraints.",
        solution: "Used MediaPipe for hand tracking, implemented a custom inverse kinematics solver, and designed a 3D-printed arm with 5 degrees of freedom.",
        outcome: "Created a responsive system with less than 100ms latency between gesture and robot movement, accurate enough for simple pick-and-place tasks.",
        images: [
          "/images/projects/robot-arm-1.jpg",
          "/images/projects/robot-arm-2.jpg"
        ]
      }
    },
    {
      id: 4,
      title: "Spectrum Analyzer",
      description: "A digital signal processing tool that visualizes audio frequency spectrum in real-time.",
      thumbnail: "/images/projects/spectrum.jpg",
      category: ["dsp", "embedded"],
      technologies: ["STM32", "FFT", "C++", "OLED Display"],
      featured: false,
      github: "https://github.com/username/spectrum-analyzer",
      live: null,
      details: {
        challenge: "Implementing efficient FFT algorithms on a resource-constrained microcontroller while maintaining real-time performance.",
        solution: "Optimized fixed-point FFT implementation, used DMA for audio sampling, and created custom graphics routines for the display.",
        outcome: "Achieved 30fps display update with 1024-point FFT on a 120MHz STM32F4 microcontroller with 128KB of RAM.",
        images: [
          "/images/projects/spectrum-1.jpg",
          "/images/projects/spectrum-2.jpg"
        ]
      }
    },
    {
      id: 5,
      title: "Low-Power Weather Station",
      description: "A solar-powered weather monitoring station with LoRa connectivity for remote deployment.",
      thumbnail: "/images/projects/weather.jpg",
      category: ["embedded", "iot"],
      technologies: ["STM32L0", "LoRa", "Solar Power", "Sensors", "PCB Design"],
      featured: false,
      github: "https://github.com/username/weather-station",
      live: null,
      details: {
        challenge: "Creating an ultra-low-power device that can operate indefinitely on a small solar panel, even in low-light conditions.",
        solution: "Implemented advanced power management techniques, optimized sensor reading schedules, and designed a custom PCB with efficient power conversion.",
        outcome: "The station operates continuously with just a 2W solar panel, transmitting data every 15 minutes with a range of over 5km.",
        images: [
          "/images/projects/weather-1.jpg",
          "/images/projects/weather-2.jpg"
        ]
      }
    },
    {
      id: 6,
      title: "RTOS Task Visualizer",
      description: "A development tool for analyzing and visualizing real-time operating system task execution.",
      thumbnail: "/images/projects/rtos.jpg",
      category: ["embedded", "tools"],
      technologies: ["FreeRTOS", "Python", "Electron", "WebSockets", "D3.js"],
      featured: true,
      github: "https://github.com/username/rtos-visualizer",
      live: "https://rtos-viz-demo.netlify.app",
      details: {
        challenge: "Creating a lightweight tracing mechanism that doesn't significantly affect the behavior of the RTOS tasks being monitored.",
        solution: "Implemented a circular buffer for trace events with timestamps, minimal instrumentation macros, and an efficient serialization protocol.",
        outcome: "The tool has been adopted by several embedded development teams, helping to diagnose timing issues and optimize task scheduling.",
        images: [
          "/images/projects/rtos-1.jpg",
          "/images/projects/rtos-2.jpg",
          "/images/projects/rtos-3.jpg"
        ]
      }
    }
  ];
  
  // Categories for filtering
  const projectCategories = [
    { id: "all", label: "All Projects" },
    { id: "embedded", label: "Embedded Systems" },
    { id: "web", label: "Web Development" },
    { id: "hardware", label: "Hardware Design" },
    { id: "low-level", label: "Low-Level Programming" },
    { id: "robotics", label: "Robotics" },
    { id: "ai", label: "AI & Machine Learning" },
    { id: "dsp", label: "Digital Signal Processing" },
    { id: "iot", label: "Internet of Things" },
    { id: "tools", label: "Development Tools" }
  ];
  
  export { projects, projectCategories };