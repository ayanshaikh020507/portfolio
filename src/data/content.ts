export const profile = {
  name: "Mohammad Ayan Shaikh",
  short: "Ayan Shaikh",
  role: "Full Stack Developer | BCA Student",
  location: "Surat, India",
  intro:
    "A BCA student building full-stack web applications using the MERN stack and PHP/MySQL, with an interest in creating useful, functional web experiences.",
  email: "ayanshaikh020507@gmail.com",
  phone: "+91 91571 86312",
  phoneHref: "tel:+919157186312",
  github: "https://github.com/ayanshaikh020507",
  linkedin: "https://linkedin.com/in/ayan-shaikh-27a65943b",
  website: "https://ayanshaikh.co.in",
};

export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const skillGroups = [
  { id: "frontend", title: "Frontend", note: "Interfaces in the browser", items: ["React", "JavaScript (ES6+)", "HTML5", "CSS3"] },
  { id: "backend", title: "Backend", note: "Servers, routes and APIs", items: ["Node.js", "Express.js", "PHP", "REST APIs"] },
  { id: "databases", title: "Databases", note: "Where the data lives", items: ["MongoDB", "MySQL"] },
  { id: "languages", title: "Languages", note: "Studied and practised", items: ["JavaScript", "Python", "Java", "C", "C++"] },
];

export const floaters = ["React", "Node.js", "Express", "MongoDB", "PHP", "MySQL", "REST", "JavaScript"];

/** Add a project: push a new object here. Set `repo` / `demo` to real URLs when they exist; null hides the link. */
export type Project = {
  id: string;
  kind: string;
  title: string;
  overview: string;
  features: string[];
  stack: string[];
  repo: string | null;
  demo: string | null;
  theme: "ink" | "sage";
};

export const projects: Project[] = [
  {
    id: "event-management",
    kind: "College mini project",
    title: "Event Management System",
    overview: "A full-stack event platform where signed-in users create and manage events, backed by a REST API.",
    features: [
      "User authentication with login state",
      "Protected routes for signed-in users",
      "REST APIs to create, update, delete and search events",
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB"],
    repo: null,
    demo: null,
    theme: "ink",
  },
  {
    id: "student-management",
    kind: "College mini project",
    title: "Student Management System",
    overview: "A student record system with an admin dashboard, built on PHP and a MySQL database.",
    features: [
      "Admin dashboard with session-based login",
      "CRUD operations with search and filtering",
      "Designed MySQL database; pages protected by login authorization",
    ],
    stack: ["PHP", "MySQL"],
    repo: null,
    demo: null,
    theme: "sage",
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "C.B. Patel Computer College, Surat, India",
    extra: "Affiliated with Veer Narmad South Gujarat University",
    period: "July 2024 – Present",
    result: "Semester 4 SGPA: 8.55",
    tags: ["Data Structures", "DBMS", "Web Development", "OOP"],
    current: true,
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    school: "V.T. Choksi Haripura Sarvajanik High School",
    extra: "",
    period: "June 2022 – April 2024",
    result: "Percentage: 85%",
    tags: [],
    current: false,
  },
  {
    degree: "Secondary School Certificate (SSC)",
    school: "V.T. Choksi Haripura Sarvajanik High School",
    extra: "",
    period: "June 2021 – April 2022",
    result: "Percentage: 77%",
    tags: [],
    current: false,
  },
];

export const requestFlows = [
  {
    id: "event-management",
    label: "Event Management System",
    steps: [
      { tag: "The browser", name: "React", text: "Login state and protected routes decide which pages a signed-in user can reach." },
      { tag: "The API", name: "Express.js", text: "REST endpoints to create, update, delete and search events." },
      { tag: "The database", name: "MongoDB", text: "Where the events are stored and queried from." },
      { tag: "Back to the screen", name: "Response", text: "The result returns to React and the event list updates." },
    ],
  },
  {
    id: "student-management",
    label: "Student Management System",
    steps: [
      { tag: "The browser", name: "Admin dashboard", text: "The admin signs in and uses forms to add, edit, search and filter students." },
      { tag: "The server", name: "PHP", text: "Sessions check the login, then PHP handles each create, update and delete." },
      { tag: "The database", name: "MySQL", text: "Student records live in a designed relational schema and are queried from here." },
      { tag: "Back to the screen", name: "Response", text: "PHP sends the updated student list back to the dashboard." },
    ],
  },
];
