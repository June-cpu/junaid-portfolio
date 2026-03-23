export type SlideType = 'title' | 'question' | 'rules' | 'concept' | 'examples' | 'video' | 'project' | 'challenge';

export interface VideoLink {
  label: string;
  url: string;
}

export interface Slide {
  type: SlideType;
  heading?: string;
  label?: string;
  body?: string;
  items?: string[];
  videos?: VideoLink[];
  projectLink?: { label: string; url: string };
  challengeNum?: number;
}

export interface Lecture {
  id: string;
  num: number;
  title: string;
  theme: string;
  slides: Slide[];
}

const RULES_STANDARD: string[] = [
  'When we enter the class, we put our stuff on the chairs and sit on the rug',
  'No speaking on the rug unless you are called on',
  'Do not touch each other or the teachers',
  'Try your best. No whining.',
  'Treat the equipment with respect.',
  'Before leaving we shutdown the laptops properly, get our stuff and quietly make two lines',
  'Free time is a privilege!',
];

const RULES_L7: string[] = [
  'When we enter the class, we put our stuff on the chairs and sit down',
  'No speaking unless you are called on',
  'Keep your hands to yourself',
  'Try your best!',
  'Treat the equipment with respect.',
  "Don't mix any pieces with another box",
  'Before leaving we shutdown the laptops properly, get our stuff and quietly make two lines',
  'Have fun!!',
];

const LEGO_SPIKE = 'https://spike.legoeducation.com/prime/project';

export const LECTURES: Lecture[] = [
  {
    id: 'lec0',
    num: 0,
    title: 'Introduction to Robotics',
    theme: 'What is a Robot?',
    slides: [
      {
        type: 'title',
        heading: 'Introduction to Robotics',
        label: 'Lesson 0',
      },
      {
        type: 'question',
        label: '— Icebreaker: Introduce Yourself!',
        heading: "Let's Meet Each Other",
        body: "When it's your turn, say your name and pick ONE of these:",
        items: [
          '"If I had a robot at home, I\'d want it to ___."',
          '"My favorite robot from a movie, book, or game is ___."',
          '"Here\'s my robot move! (The group will copy it)."',
        ],
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Big Question',
        heading: 'What is a Robot?',
        body: "Let's think about it...",
        items: [
          'Is a phone a robot?',
          'How about a Microwave?',
          'How about R2-D2 or BB-8?',
        ],
      },
      {
        type: 'concept',
        label: '— Definition',
        heading: 'A Robot is...',
        body: 'A goal-oriented machine that generally can sense, plan, and act autonomously — without a human telling it what to do!',
      },
      {
        type: 'concept',
        label: '— Real World Example',
        heading: 'Sense · Plan · Act',
        body: 'Consider a self-driving car. Does it sense, plan, and act?',
        items: [
          "Sense — The car has \"eyes\" called sensors. They send out sound and measure how fast it bounces back. A quick echo means the wall is close.",
          "Plan — A small computer makes decisions. It follows a plan: if it sees a wall, turn — so it can reach its goal of not crashing.",
          "Act — The car steers away, turning its wheels in a different direction. If there's no wall, it steers straight ahead.",
        ],
      },
      {
        type: 'examples',
        label: '— Where Can We Find Robots?',
        heading: 'Robots in the Real World',
        body: 'Robots are often used to do jobs that are dull, dirty, or dangerous. They can be a better choice than humans for these tasks.',
        items: [
          'Agricultural robots for farming',
          'Warehouse robots to move things',
          'Cleaning robots to clean floors',
          'Robots for dangerous exploration',
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Pass the Package',
        body: 'Unit Plans → Kickstart a Business → Pass the Package',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
    ],
  },
  {
    id: 'lec1',
    num: 1,
    title: 'Place Your Order',
    theme: 'Restaurant Management',
    slides: [
      { type: 'title', heading: 'Place Your Order', label: 'Lesson 1' },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'Food Talk',
        body: 'If you could choose two foods to eat for the rest of your life, what would they be?',
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— The Challenge',
        heading: 'Running a Restaurant',
        body: "What are some things you'd have to manage if you were to run a restaurant? Could these tasks be automated? Could robots do any of these things?",
      },
      {
        type: 'video',
        label: '— Videos',
        heading: 'Robot Waiters',
        videos: [
          { label: 'Robot Waiter #1', url: 'https://www.youtube.com/watch?v=NDmH7Wtu6XY' },
          { label: 'Robot Waiter #2', url: 'https://www.youtube.com/watch?v=gOYA0zmSWbA' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Place Your Order',
        body: 'Unit Plans → Kickstart a Business → Place Your Order',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Detect Food with Color Sensor',
        body: 'Your project uses the color sensor. Use it to detect "good" or "bad" food. Have your robot react in some way — make a face, play a sound, etc.',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Add Wheels',
        body: 'Add wheels to your robot. Have it move towards an object, then detect the color.',
        challengeNum: 2,
      },
    ],
  },
  {
    id: 'lec2',
    num: 2,
    title: 'Brain Games',
    theme: 'Arrays & Color Detection',
    slides: [
      { type: 'title', heading: 'Brain Games', label: 'Lesson 2' },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'Your Favorite Day',
        body: "What's your favorite day of the year? Do you do anything special on that day?",
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Programming Concept',
        heading: "What's an Array?",
        body: 'A way to represent a list of things. The "things" in the list all have to be the same type. Which one is an array and why?',
      },
      {
        type: 'video',
        label: '— Videos',
        heading: 'Robot Cooks',
        videos: [
          { label: 'Robot Cooks', url: 'https://www.youtube.com/watch?v=5bevi_0v6wU' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Brain Game',
        body: 'Unit Plans → Lifehacks → Brain Game',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Detect Multiple Colors',
        body: 'Your project uses the color sensor. Use it to detect other colors. Maybe make a face appear when it detects a certain color.',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Build a Platform',
        body: 'Could you make a platform for the line of objects to sit on?',
        challengeNum: 2,
      },
    ],
  },
  {
    id: 'lec3',
    num: 3,
    title: 'Veggie Love',
    theme: 'Weather & Farming',
    slides: [
      { type: 'title', heading: 'Veggie Love', label: 'Lesson 3' },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'Favorite Season',
        body: "What's your favorite season? Why?",
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Big Question',
        heading: 'Studying the Weather',
        body: 'What do we call a scientist who studies the weather? Why is it important to study the weather? How can robots help with farming?',
      },
      {
        type: 'video',
        label: '— Videos',
        heading: 'Meteorology & Farming',
        videos: [
          { label: 'Farming Harvest', url: 'https://www.youtube.com/watch?v=rLrV5Tel7zw' },
          { label: 'SciShow: Meteorology', url: 'https://www.youtube.com/watch?v=dLQ0lHpyZd8' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Veggie Love',
        body: 'Unit Plans → Lifehacks → Veggie Love',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Temperature Instead of Rain',
        body: 'The first part of this project tells you if some part of the world is raining. Try to change the code so it tells you the temperature instead. Have the robot react in some way.',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Make Your Own Sound',
        body: 'Make your own custom beep sound for the robot.',
        challengeNum: 2,
      },
    ],
  },
  {
    id: 'lec4',
    num: 4,
    title: 'Hopper Race',
    theme: 'Designing Moving Robots',
    slides: [
      { type: 'title', heading: 'Hopper Race', label: 'Lesson 4' },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'Welcome Back',
        body: 'What did you do over the break?',
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Design Challenge',
        heading: 'Designing a Moving Robot',
        body: 'How would you design a robot that has to move around? What questions would you ask? Think about legs, wheels, joints, and balance.',
      },
      {
        type: 'video',
        label: '— Videos',
        heading: 'Moving Robots',
        videos: [
          { label: 'Boston Dynamics', url: 'https://www.youtube.com/watch?v=F_7IPm7f1vI' },
          { label: 'Robot in the Sea', url: 'https://www.youtube.com/watch?v=e1uqA-1st_U' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Hopper Race',
        body: 'Unit Plans → Invention Squad → Hopper Race',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Differential Drive',
        body: "What happens if you make the motors spin in opposite directions? There's a cool name for this: DIFFERENTIAL DRIVE. Try it!",
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Different Legs',
        body: 'Try adding different types of legs to your robot. You can add wheels too.',
        challengeNum: 2,
      },
    ],
  },
  {
    id: 'lec5',
    num: 5,
    title: 'Training Camp: Driving Around',
    theme: 'Computer Vision & Navigation',
    slides: [
      { type: 'title', heading: 'Training Camp:\nDriving Around', label: 'Lesson 5' },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'Favorite Class',
        body: "What's your favorite class in school? Why?",
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Concept',
        heading: 'Computer Vision',
        body: 'How can a robot see? How does it know where to go? What sensors could help it navigate around obstacles?',
      },
      {
        type: 'video',
        label: '— Videos',
        heading: 'Robot Competitions',
        videos: [
          { label: 'Battle Bots', url: 'https://www.youtube.com/watch?v=L9BvIxAMSLE' },
          { label: 'Robot Race', url: 'https://www.youtube.com/watch?v=XS-ajo3B5SQ' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Training Camp 1: Driving Around',
        body: 'Unit Plans → Competition Ready → Training Camp 1: Driving Around',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Drive in a Square',
        body: 'Make your driving robot move in a perfect square. How can we do this? Think about timing and turns.',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Avoid Obstacles',
        body: 'Have your robot avoid obstacles using the camera sensor. Attach it to the robot and connect it to your Hub. How did it do?',
        challengeNum: 2,
      },
    ],
  },
  {
    id: 'lec6',
    num: 6,
    title: "What's This?",
    theme: 'Making Robots Useful',
    slides: [
      { type: 'title', heading: "What's This?", label: 'Lesson 6' },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'Favorite Class',
        body: "What's your favorite class in school? What are you learning?",
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Big Question',
        heading: 'Making Use of Robots',
        body: 'What makes a robot useful? How do we decide when to use a robot instead of a human? What are the limits?',
      },
      {
        type: 'video',
        label: '— Videos',
        heading: 'Self-Driving Cars',
        videos: [
          { label: 'Self Driving Cars', url: 'https://www.youtube.com/watch?v=IQJL3htsDyQ' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'What is This?',
        body: 'Unit Plans → Supplementary Lessons → What is This?',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Find a Use',
        body: 'Find a creative use for this robot. Be as creative as possible — think about real problems it could solve.',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Add Technology',
        body: 'Build upon Challenge 1. Add a camera, sensor, or additional feature to make it even more useful.',
        challengeNum: 2,
      },
    ],
  },
  {
    id: 'lec7',
    num: 7,
    title: 'Goal!',
    theme: 'Soccer Robot',
    slides: [
      { type: 'title', heading: 'Goal!', label: 'Lesson 7' },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_L7,
      },
      {
        type: 'concept',
        label: '— Recap',
        heading: 'Last Time...',
        body: "What robot did we build last time? What was its job? Did it always stop in the right place on the first try?",
      },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'Sports Talk',
        body: 'Do you play any sports? Do you watch any? What sports do you know of?',
      },
      {
        type: 'concept',
        label: '— Discussion',
        heading: 'Robots & Movement',
        body: 'Last class our robot moved forward. What other ways can a robot move? In soccer, do players stand still or move? Do soccer players need to know when to stop? How is kicking a ball similar to knocking down a block?',
      },
      {
        type: 'examples',
        label: '— Discussion',
        heading: 'Machines in Sports',
        body: 'How could we use machines or robots in sports? What ideas can you think of?',
      },
      {
        type: 'video',
        label: '— Videos',
        heading: 'Robot Sports!',
        videos: [
          { label: 'Robot Soccer', url: 'https://youtu.be/LXQ6Rm9CGTo' },
          { label: 'Robot Sports Highlights', url: 'https://youtu.be/tF4DML7FIWk' },
        ],
      },
      {
        type: 'examples',
        label: '— Discussion',
        heading: 'Better Than Humans?',
        body: 'Which sports do you think robots would be best at? Do you think they would be better than humans?',
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Goal!',
        body: 'Unit Plans → Supplementary Lessons → Goal!',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Moving Goal',
        body: 'Make this more interesting. Try to add wheels to your goal so it moves left and right during the game.',
        challengeNum: 1,
      },
    ],
  },
  {
    id: 'lec8',
    num: 8,
    title: 'Fixing Broken Robots',
    theme: "Builder's Mindset",
    slides: [
      { type: 'title', heading: 'Fixing Broken Robots', label: 'Lesson 8' },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'When Things Break',
        body: 'Have you ever broken something you really liked? What did you do after breaking it?',
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Mindset',
        heading: "Builder's Mindset",
        body: "What do we do when things don't work? How do great builders and engineers think about failure?",
      },
      {
        type: 'video',
        label: '— Videos',
        heading: 'Flying Machine',
        body: 'How does he take a simple toy and improve on it? What were the results?',
        videos: [
          { label: 'Flying Machine', url: 'https://www.youtube.com/watch?v=BO_YGcSzJdA' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Broken',
        body: 'Unit Plans → Invention Squad → Broken',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Diagnose the Problem',
        body: "After building the robot, ask yourself: What doesn't work as intended? How should it work? How will you fix the issues? Brainstorm a solution!",
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Implement Your Solution',
        body: 'Now implement your solution! Try to improve the robot in any way you can. Feel free to change the design entirely.',
        challengeNum: 2,
      },
    ],
  },
  {
    id: 'lec9',
    num: 9,
    title: 'Reacting to Lines',
    theme: 'Line Following',
    slides: [
      { type: 'title', heading: 'Reacting to Lines', label: 'Lesson 9' },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'Fixing Things',
        body: 'Have you ever broken anything you like? What did you do after breaking it?',
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Mindset',
        heading: "Builder's Mindset",
        body: "What do we do when things don't work? How do we stay patient and keep improving?",
      },
      {
        type: 'video',
        label: '— Videos',
        heading: 'Space Satellite',
        videos: [
          { label: 'Space Satellite', url: 'https://www.youtube.com/watch?v=6KcV1C1Ui5s' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Training Camp 3: Reacting to Lines',
        body: 'Unit Plans → Competition Ready → Training Camp 3: Reacting to Lines',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Debug Your Robot',
        body: "After building the robot ask yourself: What doesn't work as intended? How should it work? How will you fix the issues? Brainstorm a solution!",
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Improve the Design',
        body: 'Now implement your solution! Try to improve the robot in any way you can. Feel free to change the design.',
        challengeNum: 2,
      },
    ],
  },
  {
    id: 'lec10',
    num: 10,
    title: 'Time for an Upgrade',
    theme: 'Engineering Design Process',
    slides: [
      { type: 'title', heading: 'Time for an Upgrade', label: 'Lesson 10' },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'Spring Break',
        body: "What'd you do over spring break? What did we make last time?",
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Discussion',
        heading: 'Testing Theories',
        body: 'If we have a theory or an idea, how do we test it? What does it mean to run an experiment?',
      },
      {
        type: 'concept',
        label: '— Engineering Process',
        heading: 'How Engineers Solve Problems',
        items: [
          '1️⃣  Ask — What problem needs fixing?',
          '2️⃣  Imagine — What ideas can help?',
          '3️⃣  Plan — Draw and choose a design',
          '4️⃣  Build — Make your solution',
          '5️⃣  Test — Does it work?',
          '6️⃣  Improve — Make it better!',
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Time for an Upgrade',
        body: 'Unit Plans → Competition Ready → Time for an Upgrade',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Improve One Function',
        body: "What are the functions of your robot? Choose one of the functions and improve it. Ex: making it lift more weight, making the reach longer.",
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Add a Sensor',
        body: 'Try adding a sensor to your robot that helps it use one of its tools more effectively.',
        challengeNum: 2,
      },
    ],
  },
  {
    id: 'lec11',
    num: 11,
    title: 'Robot Pet',
    theme: 'Creative Robot Design',
    slides: [
      { type: 'title', heading: 'Robot Pet', label: 'Lesson 11' },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'Pets & Robots',
        body: 'Would you get a robot pet? What did we make last time?',
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Discussion',
        heading: 'Why Are Pets Special?',
        body: 'Why would people want pets? What do pets provide that machines cannot — or can they?',
      },
      {
        type: 'video',
        label: '— Videos',
        heading: 'Robot Buddies',
        videos: [
          { label: 'Robot Buddy #1', url: 'https://www.youtube.com/watch?v=IC13NJqWMm4' },
          { label: 'Robot Buddy #2', url: 'https://www.youtube.com/watch?v=4xD9QCBkxAs' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Build a Lego Robot Pet',
        body: 'Build your own LEGO robot pet. Be creative with the design!',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Requirement',
        heading: 'Use the Motors',
        body: "Your Lego robot must move around and make use of the motors. Try to add wheels or limbs. You'll be judged on creativity and completeness.",
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Add a Sensor',
        body: 'Try adding a sensor to your robot. Have it respond to you in some way — maybe wave a paw when it sees your hand.',
        challengeNum: 2,
      },
    ],
  },
  {
    id: 'lec12',
    num: 12,
    title: 'Build a Vault',
    theme: 'Group Activity · Security',
    slides: [
      { type: 'title', heading: 'Build a Vault', label: 'Lesson 12 · Group Activity' },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'Last Time',
        body: 'What did we make last time? How did it go?',
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Big Question',
        heading: 'What Makes Something Safe?',
        body: 'Think about safes, locks, vaults, and security systems. What design principles make something secure?',
      },
      {
        type: 'video',
        label: '— Videos',
        heading: 'Bank Vaults',
        videos: [
          { label: 'Bank Vaults #1', url: 'https://www.youtube.com/watch?v=IC13NJqWMm4' },
          { label: 'Bank Vaults #2', url: 'https://www.youtube.com/watch?v=4xD9QCBkxAs' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Building a Vault',
        body: 'Build a LEGO vault as a group. Focus on creativity and functionality.',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Requirement',
        heading: 'Use the Motors',
        body: "Your LEGO vault must make use of the motors. Try to add something that opens the vault. You'll be judged on creativity and completeness.",
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Tell a Story',
        body: 'Design some story around your vault. Maybe you have a LEGO guard, a robot dog, or a dramatic heist scenario.',
        challengeNum: 2,
      },
    ],
  },
];

export const LECTURE_MAP: Record<string, Lecture> = Object.fromEntries(
  LECTURES.map(l => [l.id, l])
);
