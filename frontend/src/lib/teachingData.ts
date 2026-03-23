export type SlideType = 'title' | 'question' | 'rules' | 'concept' | 'examples' | 'video' | 'project' | 'challenge' | 'visual';

export interface VideoLink {
  label: string;
  url: string;
}

export interface VisualCard {
  icon: string;
  title: string;
  body?: string;
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
  cards?: VisualCard[];
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
  // ─────────────────────────────── LESSON 0 ────────────────────────────────
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
        label: '— Icebreaker',
        heading: "Let's Meet Each Other",
        body: "When it's your turn, say your name and pick ONE of these to answer:",
        items: [
          '"If I had a robot at home, I would want it to _______."',
          '"My favorite robot from a movie, book, or game is _______."',
          '"Here is my robot move! (The whole group copies it.)"',
        ],
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'visual',
        label: '— Big Question',
        heading: 'Is it a Robot?',
        body: 'Not everything with a motor is a robot. A true robot can SENSE its environment, MAKE decisions, and ACT on its own. Let us vote on these:',
        cards: [
          { icon: '📱', title: 'Smartphone', body: 'Has sensors and runs programs — but does it decide things by itself?' },
          { icon: '🚗', title: 'Self-Driving Car', body: 'Sees the road, decides when to turn, brakes on its own — ROBOT!' },
          { icon: '🌀', title: 'Fan', body: 'Spins when you press a button — no sensing, no decision — not a robot.' },
          { icon: '🤖', title: 'Roomba', body: 'Senses walls, plans a path, moves by itself — definitely a robot!' },
        ],
      },
      {
        type: 'visual',
        label: '— Definition',
        heading: 'Every Robot Does 3 Things',
        body: 'Remember this forever: Sense → Plan → Act. All three must happen for something to be a true robot.',
        cards: [
          { icon: '👁️', title: 'Sense', body: 'The robot collects information from the world using sensors — cameras, microphones, touch pads, distance finders.' },
          { icon: '🧠', title: 'Plan', body: 'A mini computer (the "brain") reads the sensor data and decides what to do next based on its program.' },
          { icon: '🦾', title: 'Act', body: 'Motors, wheels, arms, or speakers carry out the decision — the robot physically does something in the world.' },
        ],
      },
      {
        type: 'concept',
        label: '— Deep Dive: Self-Driving Car',
        heading: 'Sense · Plan · Act in Action',
        body: 'A self-driving car is the perfect real-world example. Follow the loop:',
        items: [
          '👁️  SENSE — Cameras and radar scan 360° around the car 30 times per second. They detect other cars, pedestrians, traffic lights, and lane markings.',
          '🧠  PLAN — An AI computer compares what the sensors see against its map and traffic rules. It calculates the safest speed and direction 10 times per second.',
          '🦾  ACT — Electric motors turn the wheels. The brakes tighten or release. The steering wheel turns — all with no human hands.',
          '🔁  LOOP — The whole cycle restarts instantly. The car is always sensing, always planning, always acting.',
        ],
      },
      {
        type: 'visual',
        label: '— Parts of a Robot',
        heading: 'What is Your LEGO Robot Made of?',
        body: 'Every LEGO SPIKE robot has these four building blocks. You will use all of them today.',
        cards: [
          { icon: '🧩', title: 'Frame', body: 'The physical structure — LEGO bricks, beams, and axles that hold everything together.' },
          { icon: '🔌', title: 'Hub (Brain)', body: 'The SPIKE Prime Hub is the computer. It runs your code and connects to every sensor and motor.' },
          { icon: '📡', title: 'Sensors', body: 'Color sensor, distance sensor, force sensor, gyro — each one gives the Hub information about the world.' },
          { icon: '⚙️', title: 'Motors', body: 'Large and medium motors spin axles. Connect them to wheels, arms, or gears to make things move.' },
        ],
      },
      {
        type: 'visual',
        label: '— Real World',
        heading: 'Robots Do the 3 Ds',
        body: 'Robots are best for jobs that are too Dull, Dirty, or Dangerous for humans. Can you think of more examples?',
        cards: [
          { icon: '😴', title: 'Dull', body: 'Welding the same car frame 10,000 times a day — a factory robot never gets bored.' },
          { icon: '🧹', title: 'Dirty', body: 'Cleaning sewers or sorting trash — robots handle hazardous materials safely.' },
          { icon: '💥', title: 'Dangerous', body: 'Defusing bombs, exploring volcanoes, or fixing satellites in space — robots go where humans cannot.' },
          { icon: '🔬', title: 'Delicate', body: 'Bonus D! Surgical robots make incisions 10x more precise than human hands.' },
        ],
      },
      {
        type: 'examples',
        label: '— Robots Around Us',
        heading: 'Robots You Might Not Know',
        body: 'Robots are everywhere — you just might not recognise them. Here are some surprising ones:',
        items: [
          '🚜 Agricultural robots that plant and harvest crops autonomously',
          '📦 Amazon warehouse robots that move shelving units to human pickers',
          '🏥 Surgical robots (da Vinci) used in hospitals for precision surgery',
          '🌊 Underwater ROVs that map the ocean floor and fix oil pipes',
          '🛸 NASA Mars rovers — Curiosity and Perseverance — exploring another planet',
          '🎸 Entertainment robots at theme parks and concerts',
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Pass the Package',
        body: 'Unit Plans → Kickstart a Business → Pass the Package. Build a conveyor-belt style robot that passes an object from one point to another.',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Explore Your Kit',
        body: 'Before building: open your SPIKE kit and find the Hub, one motor, and the color sensor. Connect the motor to port A on the Hub. Run a block that spins it for 2 seconds. Can you do it?',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Follow the Instructions',
        body: 'Complete the Pass the Package build. Once it runs, change ONE thing — maybe the speed, direction, or the angle of the ramp. See what happens!',
        challengeNum: 2,
      },
    ],
  },

  // ─────────────────────────────── LESSON 1 ────────────────────────────────
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
        body: 'If you could only eat two foods for the rest of your life, what would they be and why?',
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Recap: Last Lesson',
        heading: 'What Did We Learn?',
        body: 'Last time we learned what makes something a robot. Who can finish these sentences?',
        items: [
          'A robot must SENSE its _______ (environment)',
          'A robot must _______ a decision (plan / make)',
          'A robot must ACT using _______ (motors / actuators)',
          'Robots are best for jobs that are Dull, Dirty, or _______ (Dangerous)',
        ],
      },
      {
        type: 'visual',
        label: '— The Restaurant World',
        heading: 'Running a Restaurant is Hard!',
        body: 'A busy restaurant has dozens of jobs happening at once. Which ones could a robot do?',
        cards: [
          { icon: '📋', title: 'Taking Orders', body: 'Remembering what every table ordered — a robot tablet can do this perfectly.' },
          { icon: '🍳', title: 'Cooking', body: 'Flipping the same burger 500 times a day — a robot arm never tires or burns it.' },
          { icon: '🛵', title: 'Delivering Food', body: 'Carrying plates from kitchen to table — rolling robots do this in Japan and China today.' },
          { icon: '🧽', title: 'Cleaning Up', body: 'Washing dishes and mopping floors — dishwasher machines and cleaning robots handle this.' },
        ],
      },
      {
        type: 'concept',
        label: '— Key Idea',
        heading: 'What is Automation?',
        body: 'Automation means making a machine do a job automatically — without a human doing it manually every time.',
        items: [
          '⚡ Automatic doors open when you walk near them — no button press needed.',
          '🌡️ A smart thermostat turns the heat on when it gets cold — no human required.',
          '🏭 A car factory robot welds 500 car frames a day — no human welder needed.',
          '🤔 Question: What restaurant job would YOU most want to automate and why?',
        ],
      },
      {
        type: 'visual',
        label: '— The Color Sensor',
        heading: 'How Does Your Robot See Color?',
        body: 'The LEGO SPIKE color sensor shines a light and measures what bounces back. Different surfaces reflect different amounts of light.',
        cards: [
          { icon: '💡', title: 'It Shines Light', body: 'A tiny LED inside the sensor emits white light toward the surface below.' },
          { icon: '🔴', title: 'Color Reflects', body: 'A red surface absorbs most light but reflects red wavelengths back into the sensor.' },
          { icon: '📊', title: 'Sensor Reads It', body: 'The sensor measures how much red, green, and blue light returns and reports the color name.' },
          { icon: '💻', title: 'Code Reacts', body: 'Your program checks the color value and decides what to do — play a sound, move, stop.' },
        ],
      },
      {
        type: 'video',
        label: '— Real World: Robot Waiters',
        heading: 'Robot Waiters in Action',
        body: 'These robots are delivering food in real restaurants right now. Watch how they navigate and interact with customers.',
        videos: [
          { label: 'Robot Waiter #1', url: 'https://www.youtube.com/watch?v=NDmH7Wtu6XY' },
          { label: 'Robot Waiter #2', url: 'https://www.youtube.com/watch?v=gOYA0zmSWbA' },
        ],
      },
      {
        type: 'concept',
        label: '— Discussion After Videos',
        heading: 'What Did You Notice?',
        body: 'After watching the robot waiters, let us think critically about them:',
        items: [
          '🤔 What could go wrong? What happens if a customer steps in its path?',
          '💸 Why would a restaurant owner want to use robots instead of people?',
          '👷 What happens to the human waiters who lose their jobs?',
          '🌍 Is robot automation good or bad for society? There is no easy answer!',
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Place Your Order',
        body: 'Unit Plans → Kickstart a Business → Place Your Order. You will build a robot that uses the color sensor to inspect "food orders" — detecting good vs bad items.',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Detect Good vs Bad Food',
        body: 'Use the color sensor to detect at least 2 different colors. For each color, make the robot react differently — a happy face for good food, a sad face for bad food. Add a sound too!',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Build a Delivery Robot',
        body: 'Add wheels to your robot. Program it to drive toward an object, stop right in front of it, detect its color, then react. Can you make it feel like a real waiter checking an order?',
        challengeNum: 2,
      },
    ],
  },

  // ─────────────────────────────── LESSON 2 ────────────────────────────────
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
        body: "What is your favorite day of the year? Is it a holiday, your birthday, or something else? What makes it special?",
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Recap',
        heading: 'Last Time: Color Sensors',
        body: 'We used the color sensor to detect food orders. Who remembers how it works?',
        items: [
          '💡 The sensor shines a _______ at the surface (light)',
          '🔴 The surface _______ some of that light back (reflects)',
          '📊 The sensor measures red, green, and _______ values (blue)',
          '💻 Our program _______ the color and decides what to do (reads / checks)',
        ],
      },
      {
        type: 'visual',
        label: '— Programming Concept',
        heading: 'What is an Array?',
        body: 'An array is a list of things stored in order. Every item has a NUMBER position called its index. The first item is always at index 0.',
        cards: [
          { icon: '🎵', title: 'Playlist', body: 'Song 0, Song 1, Song 2, Song 3... Your music app stores songs in an array and plays them in order.' },
          { icon: '🛒', title: 'Shopping Cart', body: 'Item 0: Apples, Item 1: Milk, Item 2: Bread. Your cart is an array of products.' },
          { icon: '📅', title: 'Week Days', body: 'days[0]="Monday", days[1]="Tuesday"... Computers store the days of the week as an array.' },
          { icon: '🎮', title: 'High Scores', body: 'scores[0]=9999, scores[1]=8750... Games store top scores in an array sorted from highest to lowest.' },
        ],
      },
      {
        type: 'concept',
        label: '— Arrays in Code',
        heading: 'How Computers Use Arrays',
        body: 'In SPIKE, an array lets you store a sequence of values and do something with each one. Here is the key rule:',
        items: [
          '📋 All items in an array must be the SAME type — all colors, all numbers, or all text.',
          '🔢 Every item has an INDEX number. The first item is index 0, the next is 1, then 2...',
          '➡️ You can LOOP through an array — do something to each item one by one.',
          '🔄 Example: colors = [red, blue, green]. Loop through and print each color name.',
          '🎯 In our project, we store a sequence of expected colors — then check each one matches!',
        ],
      },
      {
        type: 'visual',
        label: '— Real World: Arrays',
        heading: 'Arrays Are Everywhere',
        body: 'Without arrays, computers could not organise data. Here is how they show up in daily life:',
        cards: [
          { icon: '📱', title: 'Contacts List', body: 'Your phone stores every contact in an array. Searching scrolls through each entry until it finds a match.' },
          { icon: '🌐', title: 'Websites', body: 'A news website stores articles in an array — newest first (index 0) to oldest last.' },
          { icon: '🤖', title: 'Robot Memory', body: 'A robot stores a list of commands to execute in order — turn left, go forward, stop — all in an array.' },
          { icon: '🧬', title: 'DNA', body: 'DNA itself is nature\'s array — 3 billion pairs of A, T, G, C stored in a precise sequence.' },
        ],
      },
      {
        type: 'visual',
        label: '— Concept: Sequences',
        heading: 'Order Matters in Programming',
        body: 'A sequence is steps that happen in a SPECIFIC ORDER. Change the order and you get a completely different result.',
        cards: [
          { icon: '🥐', title: 'Making Toast', body: '1. Put bread in toaster. 2. Press down. 3. Wait. 4. Butter it. Change the order and it goes wrong!' },
          { icon: '🚪', title: 'Leaving Home', body: '1. Put on shoes. 2. Grab keys. 3. Open door. 4. Lock behind you. Skipping step 2 = locked out!' },
          { icon: '💻', title: 'Robot Code', body: 'Move forward THEN turn right gives a different result than turn right THEN move forward.' },
          { icon: '🔢', title: 'Math', body: '8 ÷ 2 + 2 = 6. But 8 ÷ (2 + 2) = 2. Order of operations changes everything!' },
        ],
      },
      {
        type: 'video',
        label: '— Real World: Robot Cooks',
        heading: 'Robot Chefs',
        body: 'Robot cooks are being tested in fast food kitchens. They use arrays of movements — each step stored in order and executed perfectly every time.',
        videos: [
          { label: 'Robot Cooks', url: 'https://www.youtube.com/watch?v=5bevi_0v6wU' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Brain Game',
        body: 'Unit Plans → Lifehacks → Brain Game. Build a robot that stores a sequence of colors as an array and plays a memory game — it shows a pattern and you must repeat it!',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Detect More Colors',
        body: 'Extend the project to detect at least 4 different colors. For each one, show a different display on the Hub screen (a number, a shape, or a face). Can you make it feel like a quiz?',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Build a Sorting Platform',
        body: 'Design a physical platform where objects of different colors can be lined up and passed under the sensor one by one. The robot scans each one and announces the result!',
        challengeNum: 2,
      },
    ],
  },

  // ─────────────────────────────── LESSON 3 ────────────────────────────────
  {
    id: 'lec3',
    num: 3,
    title: 'Veggie Love',
    theme: 'Weather & Smart Farming',
    slides: [
      { type: 'title', heading: 'Veggie Love', label: 'Lesson 3' },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'Favorite Season',
        body: "What is your favorite season — Spring, Summer, Fall, or Winter? What do you love most about it?",
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Recap',
        heading: 'Arrays and Sequences',
        body: 'Last lesson we stored data in lists called arrays. Quick questions:',
        items: [
          '🔢 The first item in an array is at index _______ (0)',
          '📋 All items in an array must be the same _______ (type)',
          '🔄 We use a _______ to go through each item one by one (loop)',
          '🤖 How did we use an array in the Brain Game project?',
        ],
      },
      {
        type: 'visual',
        label: '— Big Question: Weather Science',
        heading: 'Who Studies the Weather?',
        body: 'A METEOROLOGIST is a scientist who studies and forecasts weather. They rely heavily on sensors — just like our robots!',
        cards: [
          { icon: '🌡️', title: 'Temperature', body: 'Measured in Celsius or Fahrenheit. Affects what crops can grow and when they are harvested.' },
          { icon: '💧', title: 'Humidity', body: 'How much water vapour is in the air. Too dry = plants wilt. Too wet = mold and disease.' },
          { icon: '☀️', title: 'Sunlight', body: 'Plants need light to photosynthesise (make food). Too little and they cannot grow.' },
          { icon: '🌧️', title: 'Rainfall', body: 'Too little = drought, crops die. Too much = flooding, roots rot. The right amount is everything.' },
        ],
      },
      {
        type: 'concept',
        label: '— How Robots Help Farms',
        heading: 'Smart Farming with Technology',
        body: 'Modern farms use sensors and robots to monitor conditions automatically — no farmer standing in the field all day.',
        items: [
          '📡 Soil sensors buried underground constantly measure moisture and send data to a computer.',
          '🚁 Drones fly over fields taking photos to spot sick plants, dry patches, or pest damage.',
          '🤖 Harvesting robots pick strawberries, apples, and lettuce with robotic arms — faster and cheaper than human pickers.',
          '💦 Smart irrigation systems water only the sections that are actually dry — saving thousands of gallons of water.',
          '🌱 The data from all these sensors is stored in arrays and analysed to improve next year\'s harvest.',
        ],
      },
      {
        type: 'visual',
        label: '— The Temperature Sensor',
        heading: 'How Does Your Robot Feel Temperature?',
        body: 'The SPIKE Hub has a built-in temperature sensor. Here is how it works and why it matters:',
        cards: [
          { icon: '🔬', title: 'Thermistor Inside', body: 'A tiny component called a thermistor changes its electrical resistance based on heat. Hot = lower resistance.' },
          { icon: '📏', title: 'Measures Degrees', body: 'The Hub converts the resistance reading into a temperature value in Celsius or Fahrenheit.' },
          { icon: '⚡', title: 'Updates Live', body: 'The reading updates many times per second — your code can respond the moment temperature changes.' },
          { icon: '🌱', title: 'Farm Use Case', body: 'Place the robot in a greenhouse. If temperature drops below a set level, it triggers a heater or sends an alert.' },
        ],
      },
      {
        type: 'visual',
        label: '— Concept: Conditions',
        heading: 'If This, Then That',
        body: 'In programming, an IF statement checks a condition and decides what to do. This is the same logic smart farms use.',
        cards: [
          { icon: '🌡️', title: 'IF temp < 5°C', body: 'THEN turn on the greenhouse heater — the plant will freeze otherwise!' },
          { icon: '💧', title: 'IF soil is dry', body: 'THEN activate the irrigation system — water the plants automatically.' },
          { icon: '☀️', title: 'IF light < threshold', body: 'THEN turn on the grow lights — the plants still need their daily dose.' },
          { icon: '🚨', title: 'IF sensor fails', body: 'THEN send an alert to the farmer — something has gone wrong!' },
        ],
      },
      {
        type: 'video',
        label: '— Real World',
        heading: 'Farming and Weather Science',
        body: 'See how modern farming combines weather data and robot technology to grow more food with less waste.',
        videos: [
          { label: 'Farming Harvest', url: 'https://www.youtube.com/watch?v=rLrV5Tel7zw' },
          { label: 'SciShow: Meteorology', url: 'https://www.youtube.com/watch?v=dLQ0lHpyZd8' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Veggie Love',
        body: 'Unit Plans → Lifehacks → Veggie Love. Build a plant-monitoring robot that checks weather conditions and displays whether it is safe for your vegetables to grow.',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Switch from Rain to Temperature',
        body: 'The default project checks if it is raining. Change the code so it checks the Hub temperature sensor instead. Set a minimum temperature. If it drops below that number, show a warning on screen and play an alarm sound.',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Design a Custom Sound',
        body: 'Make your own custom beep melody for the robot to play when conditions are good. Use at least 4 different notes. Think of it as your robots happy farming song!',
        challengeNum: 2,
      },
    ],
  },

  // ─────────────────────────────── LESSON 4 ────────────────────────────────
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
        body: 'What did you do over the break? Anything interesting happen? Did anyone see any technology or machines that surprised them?',
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Recap',
        heading: 'Smart Farming Review',
        body: 'Last lesson our robot monitored weather for plants. Quick check:',
        items: [
          '🌡️ What sensor did we use to measure temperature? (The Hub\'s built-in thermistor)',
          '💧 What condition did we check for in the code? (Too dry / too cold)',
          '🤖 What did the robot DO when the condition was triggered? (Sound, display, alert)',
          '🌱 Name one real way farms use robots today.',
        ],
      },
      {
        type: 'visual',
        label: '— Design Question',
        heading: 'How Can a Robot Move?',
        body: 'There is not just one way for a robot to get around. Engineers choose the best movement type for the job. Here are the main options:',
        cards: [
          { icon: '🛞', title: 'Wheels', body: 'Fast and efficient on smooth surfaces. Cars, rovers, and delivery robots all use wheels. Simple to program.' },
          { icon: '🦿', title: 'Legs', body: 'Can climb stairs and uneven ground. Much harder to balance and program. Boston Dynamics uses legs.' },
          { icon: '🔗', title: 'Tracks', body: 'Like a tank — great grip on rough or muddy terrain. Slower but very stable. Used in military and mining.' },
          { icon: '🚁', title: 'Flying', body: 'Drones skip ground obstacles entirely. Limited battery life but can cover huge distances quickly.' },
        ],
      },
      {
        type: 'visual',
        label: '— How Legs Work',
        heading: 'Walking is Surprisingly Difficult',
        body: 'Two-legged walking (bipedal) is one of the hardest things to program. Here is what engineers have to solve:',
        cards: [
          { icon: '⚖️', title: 'Balance', body: 'The robot must constantly shift its weight so it does not fall. This uses gyro sensors to detect tilt.' },
          { icon: '🦵', title: 'Joints', body: 'Each leg needs multiple motors at the hip, knee, and ankle — all moving in precise coordination.' },
          { icon: '🧠', title: 'Gait Planning', body: 'The brain calculates where each foot lands and at what speed. Getting it wrong means a crash.' },
          { icon: '⚡', title: 'Energy Cost', body: 'Legged robots use far more battery power than wheeled ones. Every step burns energy fighting gravity.' },
        ],
      },
      {
        type: 'concept',
        label: '— Key Concept',
        heading: 'Differential Drive',
        body: 'When two wheels on the same axle spin at different speeds or in different directions, the robot turns. This is called DIFFERENTIAL DRIVE and it is how most wheeled robots steer.',
        items: [
          '➡️  Both motors forward at the SAME speed → robot goes STRAIGHT',
          '↩️  Left motor faster than right → robot turns RIGHT (steers toward the slower side)',
          '↪️  Right motor faster than left → robot turns LEFT',
          '🔄  Left motor FORWARD, right motor BACKWARD → robot SPINS in place!',
          '🎮  This is also how tanks steer — and how video game joysticks work!',
        ],
      },
      {
        type: 'visual',
        label: '— Real Robots',
        heading: 'Amazing Moving Robots in the World',
        body: 'Engineers have spent decades solving robot movement. Here are some of the most impressive results:',
        cards: [
          { icon: '🐕', title: 'Boston Dynamics Spot', body: 'A dog-like robot with 12 motors. It can trot, climb stairs, open doors, and recover from being pushed.' },
          { icon: '🚶', title: 'Atlas (Humanoid)', body: 'A 1.5m tall robot that can run, jump, do backflips, and even pick up boxes in a warehouse.' },
          { icon: '🦑', title: 'Underwater ROV', body: 'Has thrusters instead of wheels. Navigates 3D space underwater to inspect pipes and shipwrecks.' },
          { icon: '🔴', title: 'Mars Rover', body: 'Six wheels with rocker-bogie suspension — each wheel moves independently to climb rocks on Mars.' },
        ],
      },
      {
        type: 'video',
        label: '— Watch',
        heading: 'Moving Robots',
        body: 'See how cutting-edge robots handle movement in the real world. Notice how they recover from stumbles and obstacles.',
        videos: [
          { label: 'Boston Dynamics', url: 'https://www.youtube.com/watch?v=F_7IPm7f1vI' },
          { label: 'Robot in the Sea', url: 'https://www.youtube.com/watch?v=e1uqA-1st_U' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Hopper Race',
        body: 'Unit Plans → Invention Squad → Hopper Race. Build a walking robot using legs and motors. The goal is to make it hop or walk forward as efficiently as possible.',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Try Differential Drive',
        body: 'If your robot has two motors, try spinning them in opposite directions. Does it spin in place? Now adjust one motor faster — does it curve? Experiment and describe what you discover.',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Redesign the Legs',
        body: 'The default design uses one leg shape. Try building a different leg design — wider, shorter, with more joints, or add a rubber band for spring. Does your new design move faster? Record your best time!',
        challengeNum: 2,
      },
    ],
  },

  // ─────────────────────────────── LESSON 5 ────────────────────────────────
  {
    id: 'lec5',
    num: 5,
    title: 'Training Camp: Driving Around',
    theme: 'Navigation & Computer Vision',
    slides: [
      { type: 'title', heading: 'Training Camp:\nDriving Around', label: 'Lesson 5' },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'Favorite Class',
        body: "What is your favorite class in school and why? What is the most interesting thing you have learned this year outside of robotics?",
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Recap',
        heading: 'Movement Recap',
        body: 'Last lesson we built walking and driving robots. Who remembers?',
        items: [
          '🛞 What is the advantage of wheels over legs? (Faster, easier to control)',
          '↩️ What happens when one motor spins faster than the other? (Robot turns)',
          '🔄 What happens when motors spin in OPPOSITE directions? (Robot spins in place)',
          '🔢 What is this steering technique called? (Differential drive)',
        ],
      },
      {
        type: 'visual',
        label: '— How Robots Navigate',
        heading: 'Getting from A to B',
        body: 'Navigation means knowing where you are and finding a path to where you want to go. Robots solve this in several ways:',
        cards: [
          { icon: '📏', title: 'Dead Reckoning', body: 'Count wheel rotations and turns to estimate position. Simple but errors build up over time.' },
          { icon: '🗺️', title: 'Mapping (SLAM)', body: 'Build a map while exploring. The robot remembers what it has seen and localises itself within the map.' },
          { icon: '📡', title: 'GPS', body: 'Satellites tell the robot exactly where it is on Earth. Works outdoors but not inside buildings.' },
          { icon: '👁️', title: 'Vision', body: 'Cameras identify landmarks, road markings, and obstacles. The most flexible but computationally expensive.' },
        ],
      },
      {
        type: 'visual',
        label: '— Computer Vision',
        heading: 'How Robots See the World',
        body: 'Computer vision lets robots understand images from cameras. Here is the process from pixel to decision:',
        cards: [
          { icon: '📷', title: 'Camera Captures', body: 'A camera takes 30-60 photos per second. Each photo is a grid of tiny coloured squares called pixels.' },
          { icon: '🔢', title: 'Pixels Are Numbers', body: 'Every pixel is stored as 3 numbers: red, green, blue values from 0-255. A 1080p image has 2 million pixels.' },
          { icon: '🤖', title: 'AI Finds Patterns', body: 'A trained neural network scans the numbers to recognise shapes, colours, and objects — like a face or a stop sign.' },
          { icon: '⚡', title: 'Decision Made', body: 'In milliseconds the robot knows: "wall ahead — turn left." All from just numbers in a grid.' },
        ],
      },
      {
        type: 'concept',
        label: '— Programming Movement',
        heading: 'How to Program Your Robot to Drive',
        body: 'In SPIKE, you control movement with motor blocks. Here are the key ideas:',
        items: [
          '⏱️ TIMED movement: run motors for X seconds, then stop. Simple but not precise — battery level affects speed.',
          '📐 DEGREE movement: rotate wheels exactly N degrees. Much more precise — the motor counts its own rotations.',
          '🔁 LOOP: keep moving until a sensor triggers — like stop when you see red or bump a wall.',
          '🔧 SPEED control: 0% = stopped, 100% = full power, negative % = reverse direction.',
          '🎯 Challenge: how would YOU code a robot to drive a perfect square? Discuss before building!',
        ],
      },
      {
        type: 'visual',
        label: '— Sensor: Distance',
        heading: 'The Distance Sensor (Ultrasonic)',
        body: 'This sensor lets your robot avoid obstacles. Here is exactly how it works:',
        cards: [
          { icon: '📢', title: 'Sends a Ping', body: 'A tiny speaker fires an ultrasonic sound pulse (too high-pitched for humans to hear) at the obstacle.' },
          { icon: '⏰', title: 'Times the Echo', body: 'A microphone listens for the echo bouncing back. The Hub measures exactly how long that takes.' },
          { icon: '📏', title: 'Calculates Distance', body: 'Distance = (speed of sound × time) ÷ 2. The ÷2 is because sound travels there AND back.' },
          { icon: '🛑', title: 'Your Code Reacts', body: 'If distance < 15cm → stop, or turn. Your robot never crashes into a wall again!' },
        ],
      },
      {
        type: 'video',
        label: '— Real World: Robot Competitions',
        heading: 'Robot Racing and Battle',
        body: 'Robot competitions test navigation, speed, and programming skill. Watch how they move, turn, and avoid each other.',
        videos: [
          { label: 'Battle Bots', url: 'https://www.youtube.com/watch?v=L9BvIxAMSLE' },
          { label: 'Robot Race', url: 'https://www.youtube.com/watch?v=XS-ajo3B5SQ' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Training Camp 1: Driving Around',
        body: 'Unit Plans → Competition Ready → Training Camp 1: Driving Around. Build and program a driving robot that can navigate around a course.',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Drive a Perfect Square',
        body: 'Program your robot to drive in a perfect square: forward → turn 90° right → repeat 4 times → return to start. Hint: use degree-based motor movement for the turns. How close can you get it?',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Obstacle Avoidance',
        body: 'Attach the distance sensor to the front of your robot. Program it to drive forward and automatically turn when it detects an obstacle closer than 15cm. Can it navigate around a simple maze?',
        challengeNum: 2,
      },
    ],
  },

  // ─────────────────────────────── LESSON 6 ────────────────────────────────
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
        body: "What is your favorite class in school right now? What are you learning in it? Any connection to robotics?",
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Recap',
        heading: 'Navigation & Vision',
        body: 'Last lesson our robot drove around and avoided obstacles. Quick check:',
        items: [
          '📡 What does the distance sensor send out to measure distance? (Ultrasonic sound pulse)',
          '📏 How does the robot calculate distance from the echo time? (distance = speed × time ÷ 2)',
          '🎯 What is "dead reckoning" navigation? (counting wheel rotations to estimate position)',
          '📐 Why is degree-based movement more accurate than timed movement?',
        ],
      },
      {
        type: 'visual',
        label: '— Big Question',
        heading: 'Robot vs Human: Who Wins?',
        body: 'For every job, engineers ask: is a robot or a human better suited for this? Here is how they decide:',
        cards: [
          { icon: '🤖', title: 'Robot Wins When...', body: 'The task is repetitive, requires high precision, is dangerous, needs to run 24/7, or the data must be perfectly recorded.' },
          { icon: '🧑', title: 'Human Wins When...', body: 'The task needs creativity, emotional judgement, social skills, adapting to surprising situations, or physical dexterity.' },
          { icon: '🤝', title: 'Both Together', body: 'Most modern systems are human + robot working together. The robot does the heavy/precise work; the human makes decisions.' },
          { icon: '🔮', title: 'The Future?', body: 'AI is closing the gap. Tasks we thought only humans could do — writing, driving, diagnosing disease — robots now assist with.' },
        ],
      },
      {
        type: 'concept',
        label: '— Self-Driving Technology',
        heading: 'How Self-Driving Cars Actually Work',
        body: 'A self-driving car has multiple overlapping systems working together. No single sensor is enough on its own:',
        items: [
          '📷 CAMERAS (vision) — Read lane lines, traffic lights, signs, and recognise pedestrians.',
          '📡 LIDAR (laser radar) — Fires millions of laser pulses per second to build a precise 3D map of surroundings.',
          '🔊 RADAR (radio waves) — Detects speed and distance of moving objects — even in fog and rain.',
          '🗺️ HD MAPS — A pre-loaded centimetre-accurate map of every road. The car knows what should be there.',
          '🧠 AI FUSION — A computer combines ALL sensor data simultaneously to make driving decisions.',
        ],
      },
      {
        type: 'visual',
        label: '— Creative Robots',
        heading: 'Surprising Uses for Robots',
        body: 'Engineers have put robots in unexpected places. Which of these surprises you the most?',
        cards: [
          { icon: '🎨', title: 'Robot Painters', body: 'Robots spray-paint cars, walls, and even create original artwork. Precise and never gets tired.' },
          { icon: '💊', title: 'Medicine Delivery', body: 'Robots navigate hospital corridors to deliver medicine from pharmacy to patient room — reducing errors.' },
          { icon: '🌊', title: 'Beach Cleaning', body: 'Autonomous robots sieve through sand removing cigarette butts and microplastics.' },
          { icon: '🎸', title: 'Music Performance', body: 'Robot bands can play guitar, drums, and keyboards in perfect sync — and never cancel a tour.' },
        ],
      },
      {
        type: 'visual',
        label: '— Limits of Robots',
        heading: 'What Robots Still Cannot Do Well',
        body: 'Even with advanced AI, robots struggle with things a 5-year-old handles easily. Here is why:',
        cards: [
          { icon: '🤲', title: 'Soft Touch', body: 'Picking up a raw egg without crushing it requires sensing forces a fraction of a gram — still very hard for robots.' },
          { icon: '😂', title: 'Humour & Empathy', body: 'Reading social cues, telling a real joke, or comforting a sad friend requires human emotional intelligence.' },
          { icon: '🌀', title: 'Chaos', body: 'An unexpected object on the floor can completely confuse a robot designed for a known environment.' },
          { icon: '💡', title: 'True Creativity', body: 'Robots can remix patterns they have seen but generating a truly novel idea from scratch remains a human strength.' },
        ],
      },
      {
        type: 'video',
        label: '— Watch',
        heading: 'Self-Driving Cars',
        body: 'See how the multiple sensor systems work together. Can you spot the cameras, lidar, and radar in action?',
        videos: [
          { label: 'Self Driving Cars', url: 'https://www.youtube.com/watch?v=IQJL3htsDyQ' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'What is This?',
        body: 'Unit Plans → Supplementary Lessons → What is This? You will build a robot with an unknown purpose and then decide how to make it useful. Get creative!',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Invent a Use Case',
        body: 'Look at the robot you built and brainstorm 3 real problems it could solve. Pick the BEST one and modify the robot to make it more suited for that purpose. Explain your idea to the class.',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Add a Sensor',
        body: 'Add a camera, distance sensor, or color sensor to your robot from Challenge 1. Program it to use that sensor to do its job better. For example, if it is a delivery robot, make it stop when it detects a person in the way.',
        challengeNum: 2,
      },
    ],
  },

  // ─────────────────────────────── LESSON 7 ────────────────────────────────
  {
    id: 'lec7',
    num: 7,
    title: 'Goal!',
    theme: 'Sports Robots',
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
        heading: 'Last Time: Useful Robots',
        body: "We built a mystery robot and found a real use for it. Let us revisit what we learned:",
        items: [
          '🤖 When does a robot beat a human at a job?',
          '🧑 When does a human still beat a robot?',
          '📡 Name two sensors used in self-driving cars.',
          '🌀 What is one thing robots STILL struggle with?',
        ],
      },
      {
        type: 'question',
        label: '— Question of the Day',
        heading: 'Sports Talk',
        body: 'Do you play any sports? Which do you watch? What sport would be most fun to watch if the players were all robots?',
      },
      {
        type: 'visual',
        label: '— Robots and Sports',
        heading: 'Why Sports is an Interesting Problem',
        body: 'Sports requires the exact skills that make robotics hard — moving precisely, reacting fast, and working as a team.',
        cards: [
          { icon: '⚡', title: 'Speed', body: 'A soccer robot needs to react to a moving ball in under 50 milliseconds — faster than a human reflex.' },
          { icon: '🎯', title: 'Precision', body: 'Kicking a ball to exactly the right spot requires calculating force, angle, and timing simultaneously.' },
          { icon: '🧠', title: 'Strategy', body: 'Should it pass or shoot? Teams of robots must communicate and make game decisions in real time.' },
          { icon: '👥', title: 'Teamwork', body: 'Multiple robots must avoid bumping each other while coordinating to score. This is called multi-agent robotics.' },
        ],
      },
      {
        type: 'concept',
        label: '— Discussion',
        heading: 'Robots and Movement in Sports',
        body: 'Last class our robot moved forward. Now it needs to move like a player:',
        items: [
          '⚽ Soccer players do not stand still — they REACT to the ball, teammates, and opponents.',
          '🛑 Soccer players know WHEN to stop — when they have the ball in position to shoot.',
          '👊 Kicking a ball is similar to a robot knocking down a block — it is about calculating force and direction.',
          '🔄 What other movements from soccer could we program? (turning, reversing, stopping on a line)',
          '🤔 What sensor would help a robot know where the ball is? (camera / color sensor)',
        ],
      },
      {
        type: 'visual',
        label: '— Machines in Sports Today',
        heading: 'Technology Already in Sports',
        body: 'Even without playing robots, machines are already everywhere in sports:',
        cards: [
          { icon: '📹', title: 'VAR (Video)', body: 'In soccer, a computer reviews every goal using multiple camera angles in seconds to check for fouls.' },
          { icon: '🎾', title: 'Hawkeye', body: 'In tennis, lasers track the exact path of the ball to determine if it landed in or out — more accurate than any human judge.' },
          { icon: '🏃', title: 'Performance Tracking', body: 'Sensors on athletes track heart rate, speed, distance run, and even sleep quality to prevent injuries.' },
          { icon: '🤖', title: 'Robot Referees', body: 'Some competitions now use AI to make officiating decisions — removing human bias from the result.' },
        ],
      },
      {
        type: 'examples',
        label: '— Discussion',
        heading: 'Better Than Humans?',
        body: 'Which sports do you think a robot would dominate? Which ones would it lose at? Think about what each sport really requires.',
        items: [
          '🎯 Darts — a robot arm with perfect precision would never miss the bullseye.',
          '⚽ Soccer — needs vision, teamwork, and split-second creativity. Much harder for robots.',
          '♟️ Chess — AI already beats every human champion. Not physical, but it IS a competitive game.',
          '🏊 Swimming — robots are terrible at swimming! Fluid dynamics is incredibly hard to navigate.',
          '🤔 What sport would YOU put a robot in? Would it be fair to humans?',
        ],
      },
      {
        type: 'video',
        label: '— Watch',
        heading: 'Robot Sports!',
        body: 'See actual robot soccer teams compete. Notice how they detect the ball, communicate with teammates, and score goals.',
        videos: [
          { label: 'Robot Soccer', url: 'https://youtu.be/LXQ6Rm9CGTo' },
          { label: 'Robot Sports Highlights', url: 'https://youtu.be/tF4DML7FIWk' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Goal!',
        body: 'Unit Plans → Supplementary Lessons → Goal! Build a robot that kicks a ball into a goal. You will program it to drive forward and stop with precise timing to hit the target.',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Build a Moving Goal',
        body: 'Make the game harder! Add wheels to the goal so it moves left and right continuously. Now the kicker robot has to time its shot to hit the goal while it is moving. How do you adjust the timing?',
        challengeNum: 1,
      },
    ],
  },

  // ─────────────────────────────── LESSON 8 ────────────────────────────────
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
        body: 'Have you ever broken something you really liked? What did you do after — did you fix it, give up, or ask for help?',
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Recap',
        heading: 'Sports Robots Review',
        body: 'Last lesson we built goal-kicking robots. Who can answer:',
        items: [
          '⚡ Why is reacting quickly so important in sports robots? (ball/game moves fast)',
          '🎯 What does "precision" mean in the context of kicking a ball?',
          '📹 Name one piece of technology already used in real sports. (VAR, Hawkeye, sensors...)',
          '🤖 Did your robot hit the goal? What made it miss if it did?',
        ],
      },
      {
        type: 'visual',
        label: '— Builder\'s Mindset',
        heading: 'How Great Builders Think About Failure',
        body: 'Every engineer, inventor, and athlete has one thing in common: they use failure as information, not as a reason to stop.',
        cards: [
          { icon: '💡', title: 'Edison and the Lightbulb', body: 'Thomas Edison tried over 1,000 different filaments before finding one that worked. Each failure taught him something new.' },
          { icon: '✈️', title: 'Wright Brothers', body: 'Wilbur and Orville crashed over 100 times before their first successful 12-second flight at Kitty Hawk.' },
          { icon: '🚀', title: 'SpaceX', body: 'SpaceX rockets exploded dozens of times before landing successfully. Each explosion revealed what to fix next.' },
          { icon: '🧬', title: 'Penicillin', body: 'Alexander Fleming discovered penicillin from a mold that contaminated and "ruined" his experiment. A mistake saved millions of lives.' },
        ],
      },
      {
        type: 'visual',
        label: '— The Improvement Loop',
        heading: 'How Engineers Fix Things',
        body: 'Every engineer follows this cycle. You never just build once — you keep going around the loop until it works great!',
        cards: [
          { icon: '🔨', title: 'Build', body: 'Put it together — even if it is not perfect yet. A real attempt beats a perfect plan.' },
          { icon: '🧪', title: 'Test', body: 'Try it out in the real world. Does it do what you wanted? Measure the result.' },
          { icon: '👀', title: 'Observe', body: 'Watch carefully. What exactly goes wrong? At what point? In what conditions?' },
          { icon: '💡', title: 'Improve', body: 'Change ONE thing at a time. If you change many things at once, you will not know what fixed it.' },
          { icon: '🔁', title: 'Repeat', body: 'Go back to Build. Every loop makes it stronger and smarter. The best robots go through this loop hundreds of times.' },
        ],
      },
      {
        type: 'visual',
        label: '— Types of Robot Problems',
        heading: 'Diagnosing What is Wrong',
        body: 'Before you can fix a broken robot, you need to know WHAT kind of problem it has. There are three main categories:',
        cards: [
          { icon: '🔩', title: 'Mechanical', body: 'Physical problems — loose axles, pieces that popped off, gears not meshing, wheels slipping. Fix: rebuild or tighten.' },
          { icon: '💻', title: 'Code / Logic', body: 'The build is fine but the program has a mistake — wrong port number, wrong direction, timing off. Fix: debug the code.' },
          { icon: '📡', title: 'Sensor', body: 'The sensor is not reading correctly — wrong port, dirty lens, too close/far, or wrong calibration. Fix: check connections and range.' },
          { icon: '🔋', title: 'Power', body: 'Low battery causes motors to run slower and sensors to read inaccurately. Fix: charge or replace before testing.' },
        ],
      },
      {
        type: 'concept',
        label: '— Debugging',
        heading: 'The Art of Finding Bugs',
        body: 'In programming, a "bug" is any mistake that causes unexpected behaviour. Debugging means finding and fixing it systematically.',
        items: [
          '1️⃣  DESCRIBE the problem exactly. Not "it does not work" but "it turns left instead of right on the second move."',
          '2️⃣  REPRODUCE it. Can you make the problem happen again? If yes, you can study it.',
          '3️⃣  ISOLATE it. Remove parts of the code until you find the line that causes the problem.',
          '4️⃣  HYPOTHESIZE. Make a guess: "I think the issue is the motor speed is set to -100 when it should be +100."',
          '5️⃣  TEST the fix. Change one thing, run it, check result. Did it get better or worse?',
          '6️⃣  DOCUMENT what you did. Write down what the bug was and what fixed it.',
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Broken',
        body: 'Unit Plans → Invention Squad → Broken. You will receive a robot that is intentionally broken. Diagnose the problem and fix it using the Builder\'s Mindset process.',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Diagnose the Problem',
        body: 'After building the broken robot, write down your diagnosis: Is the problem mechanical, code, sensor, or power? What specifically is wrong? What evidence supports your guess? Do not start fixing until you have written your diagnosis.',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Implement Your Fix',
        body: 'Now fix it! Change ONE thing at a time and test after each change. Can you improve the robot beyond its original design? Add a feature that was not there before.',
        challengeNum: 2,
      },
    ],
  },

  // ─────────────────────────────── LESSON 9 ────────────────────────────────
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
        body: 'Have you ever fixed something broken by yourself? What was it? What tools or thinking did you use?',
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Recap',
        heading: 'Builder\'s Mindset Check',
        body: 'Last lesson we learned to diagnose and fix robots. Quick review:',
        items: [
          '🔩 Name the 4 types of robot problems. (Mechanical, Code, Sensor, Power)',
          '🐛 What is a "bug" in programming? (Any mistake that causes unexpected behaviour)',
          '🔁 What is the Improvement Loop? (Build → Test → Observe → Improve → Repeat)',
          '1️⃣  Why change only ONE thing at a time when debugging?',
        ],
      },
      {
        type: 'visual',
        label: '— How Line Following Works',
        heading: 'The Robot Reads the Floor',
        body: 'A color sensor checks the ground hundreds of times per second. It steers based on what color it sees beneath it.',
        cards: [
          { icon: '⚫', title: 'Sees Black', body: 'The sensor detects dark surface — it is on the line! Keep going forward, no correction needed.' },
          { icon: '⚪', title: 'Sees White', body: 'The sensor detects light surface — it has drifted off the line! Time to steer back.' },
          { icon: '↩️', title: 'Correct Course', body: 'The robot steers toward whichever side the black line is on, pulling itself back on track.' },
          { icon: '🔁', title: 'Super Fast Loop', body: 'This sense → correct → sense cycle happens hundreds of times per second — too fast to see with your eyes.' },
        ],
      },
      {
        type: 'visual',
        label: '— Feedback Loops',
        heading: 'What is a Feedback Loop?',
        body: 'Line following is an example of a FEEDBACK LOOP — one of the most important ideas in all of engineering and biology.',
        cards: [
          { icon: '🌡️', title: 'Thermostat', body: 'Senses temperature → if too cold, turns on heat → temperature rises → senses temperature again. Same loop!' },
          { icon: '🚗', title: 'Cruise Control', body: 'Car senses its speed → if too slow, adds gas → speed increases → senses speed again.' },
          { icon: '🦅', title: 'Bird in Flight', body: 'Eyes see which way wind is pushing → wings adjust angle → bird stays on course → eyes look again.' },
          { icon: '🤖', title: 'Line Follower', body: 'Sensor sees color → if off the line, steer back → sensor sees color again. The same 3-step loop.' },
        ],
      },
      {
        type: 'concept',
        label: '— Programming Reactions',
        heading: 'Writing the Line-Following Code',
        body: 'The code for line following uses a loop with an IF-ELSE statement inside. Here is the logic step by step:',
        items: [
          '🔁 LOOP FOREVER (the feedback loop never stops while the robot is running)',
          '📡 READ the color sensor value',
          '⚫ IF the sensor sees black THEN go straight (both motors same speed)',
          '⚪ ELSE (sensor sees white or gray) THEN turn toward the line (slow one motor)',
          '🔁 Back to the top of the loop — repeat immediately',
          '🎛️ Tuning: the AMOUNT you slow one motor determines how sharp the correction is. Start small!',
        ],
      },
      {
        type: 'visual',
        label: '— The "Edge" Technique',
        heading: 'Advanced: Following the Edge of the Line',
        body: 'Most professional line-following robots do not track the center of the line — they track the EDGE. Here is why it is smarter:',
        cards: [
          { icon: '🎯', title: 'Center Method', body: 'Robot tries to stay on the black line. But "black" gives no direction — is it drifting left or right? Hard to know.' },
          { icon: '📐', title: 'Edge Method', body: 'Robot aims to stay at the exact border between black and white — reads a gray value (e.g. 50%). Any deviation gives clear direction.' },
          { icon: '⚡', title: 'Faster & Smoother', body: 'Edge tracking oscillates less. The robot makes smaller, faster corrections instead of big side-to-side swings.' },
          { icon: '🔢', title: 'PID Control', body: 'Advanced robots use a math formula (PID) to calculate correction size proportionally. This is used in real industrial robots.' },
        ],
      },
      {
        type: 'examples',
        label: '— Real World',
        heading: 'Line-Following Robots in Industry',
        body: 'This simple idea powers some of the world\'s most important automated systems:',
        items: [
          '📦 Amazon warehouse robots follow lines painted on the floor to navigate between shelves.',
          '🏭 Car factory assembly robots follow embedded magnetic strips in the floor to move parts.',
          '🏥 Hospital robots follow invisible IR lines in the floor to deliver medicine and meals.',
          '✈️ Airport luggage robots follow guide paths to sort bags to the correct departure gate.',
          '🌾 Agricultural robots follow GPS-guided virtual lines across fields to plant or harvest crops.',
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Training Camp 3: Reacting to Lines',
        body: 'Unit Plans → Competition Ready → Training Camp 3: Reacting to Lines. Build and program a robot that follows a black line on a white surface.',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Debug Your Line Follower',
        body: 'Run your line follower on the track. If it wobbles too much, try reducing the motor speed difference. If it loses the line, try increasing it. Document what speed setting works best and WHY.',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Improve the Design',
        body: 'Try two improvements: (1) physically move the color sensor closer to the ground, and (2) try tracking the edge of the line instead of the center. Does the robot get smoother and faster?',
        challengeNum: 2,
      },
    ],
  },

  // ─────────────────────────────── LESSON 10 ───────────────────────────────
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
        body: "What did you do over spring break? What was the most interesting or fun thing? Did you see any technology or machines that caught your attention?",
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Recap',
        heading: 'Line Following Review',
        body: 'Two lessons ago we built line-following robots using feedback loops. Quick check:',
        items: [
          '🔁 What is a feedback loop? (sense → react → sense → react, continuously)',
          '⚫ What does the robot do when the sensor sees black? (keep straight)',
          '⚪ What does the robot do when it sees white? (steer back to line)',
          '📐 What is the "edge" technique and why is it better?',
        ],
      },
      {
        type: 'visual',
        label: '— Engineering Design Process',
        heading: 'How Engineers Solve Problems',
        body: 'Engineers do not just build randomly — they follow a structured process. This 6-step cycle is used everywhere from NASA to LEGO.',
        cards: [
          { icon: '❓', title: '1. Ask', body: 'What problem needs to be solved? Who has this problem? What would success look like?' },
          { icon: '💭', title: '2. Imagine', body: 'Brainstorm as many ideas as possible without judging them. Wild ideas are welcome — they often lead to good ones.' },
          { icon: '📐', title: '3. Plan', body: 'Choose the best idea and sketch it out. Plan the materials, steps, and measurements.' },
          { icon: '🔨', title: '4. Build', body: 'Construct the solution. Follow the plan but adapt when things do not go as expected.' },
          { icon: '🧪', title: '5. Test', body: 'Try it with the real users or in real conditions. Measure the results against your definition of success.' },
          { icon: '✨', title: '6. Improve', body: 'Use what you learned from testing to go back and make it better. The loop restarts.' },
        ],
      },
      {
        type: 'concept',
        label: '— Testing & Experiments',
        heading: 'What is a Fair Test?',
        body: 'To know if a change truly made your robot better, you need to run a FAIR TEST. Here is the rule:',
        items: [
          '🎯 CONTROL: Run the ORIGINAL design and measure its result precisely (e.g. completes track in 12 seconds).',
          '🔧 CHANGE ONE VARIABLE: Modify exactly ONE thing (e.g. double the motor speed).',
          '🧪 TEST AGAIN: Run the new design under the SAME conditions and measure the result.',
          '📊 COMPARE: Is the new result better, worse, or the same as the control?',
          '⚠️ If you change two things at once, you will not know which one caused the difference!',
          '🔬 This is the scientific method — and it is exactly how real engineering labs work.',
        ],
      },
      {
        type: 'visual',
        label: '— What Can Be Upgraded?',
        heading: 'Robot Functions to Improve',
        body: 'When upgrading a robot, think about each of its functions separately. Improving one thing at a time leads to better results.',
        cards: [
          { icon: '⚡', title: 'Speed', body: 'Faster motor speed? Bigger wheels? Lighter build? What makes your robot move faster without losing control?' },
          { icon: '🎯', title: 'Accuracy', body: 'Does it stop in the right place? Turn at the right angle? Adding encoder-based movement improves precision.' },
          { icon: '💪', title: 'Strength', body: 'Can it push or lift heavier loads? Better gear ratios multiply motor torque for more power.' },
          { icon: '🔋', title: 'Efficiency', body: 'Does it drain battery fast? Reducing unnecessary motor movement extends how long it can run.' },
        ],
      },
      {
        type: 'concept',
        label: '— Gears & Gear Ratios',
        heading: 'How Gears Change Speed and Strength',
        body: 'Gears are one of the oldest and most important machines. They trade speed for strength or strength for speed.',
        items: [
          '⚙️ A SMALL gear driving a LARGE gear: the large gear turns SLOWER but with more TORQUE (strength). Good for pushing/lifting.',
          '⚙️ A LARGE gear driving a SMALL gear: the small gear turns FASTER but with less torque. Good for speed.',
          '🚲 A bicycle uses this trick — low gear (easy to pedal, slow) for hills; high gear (hard to pedal, fast) for flat roads.',
          '🔢 GEAR RATIO: if the driving gear has 8 teeth and the driven gear has 24 teeth, the ratio is 1:3 — 3 rotations of the driver per 1 rotation of the driven gear.',
          '🤔 How could you use gears to make your LEGO robot stronger without a more powerful motor?',
        ],
      },
      {
        type: 'visual',
        label: '— Famous Upgrades',
        heading: 'Upgrades That Changed the World',
        body: 'Sometimes one key upgrade transforms something ordinary into something extraordinary:',
        cards: [
          { icon: '📱', title: 'iPhone (2007)', body: 'Nokia already made phones. Apple added a touchscreen + internet. One upgrade changed the entire industry.' },
          { icon: '🚗', title: 'Electric Cars', body: 'Cars already existed. Adding electric motors instead of combustion engines made them cleaner and faster-accelerating.' },
          { icon: '✈️', title: 'Jet Engine', body: 'Propeller planes already flew. Jet engines made them 5x faster and opened up global travel.' },
          { icon: '🔬', title: 'Electron Microscope', body: 'Regular microscopes already existed. Adding electron beams let scientists see individual atoms.' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Time for an Upgrade',
        body: 'Unit Plans → Competition Ready → Time for an Upgrade. Take your competition robot from earlier lessons and upgrade it using the Engineering Design Process. Test, measure, improve.',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Improve One Function',
        body: 'Identify the WEAKEST function of your robot (speed, accuracy, strength, or efficiency). Use the fair test method: measure the current performance, make ONE change, measure again. Did it improve? By how much?',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Add a New Sensor',
        body: 'Add a sensor that your robot did not have before. Think carefully about WHERE to place it for maximum usefulness. Program it to improve one aspect of your robot\'s performance. Explain why you chose that sensor.',
        challengeNum: 2,
      },
    ],
  },

  // ─────────────────────────────── LESSON 11 ───────────────────────────────
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
        heading: 'Pets and Robots',
        body: 'Would you get a robot pet instead of a real pet? What would you want your robot pet to be able to do that a real pet cannot?',
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Recap',
        heading: 'Engineering Design Review',
        body: 'Last lesson we applied the engineering design process to upgrade our robots. Quick recall:',
        items: [
          '6️⃣ What are the 6 steps of the engineering design process? (Ask, Imagine, Plan, Build, Test, Improve)',
          '🧪 What is a "fair test"? Why does changing one variable matter?',
          '⚙️ What do gears let you trade between? (Speed vs strength)',
          '📊 Did your upgrade from last lesson work? What metric improved?',
        ],
      },
      {
        type: 'visual',
        label: '— Why Do We Love Pets?',
        heading: 'What Makes Pets Special?',
        body: 'People have kept pets for over 15,000 years. They fulfill deep human needs. Here is what pets give us:',
        cards: [
          { icon: '💛', title: 'Companionship', body: 'Pets reduce loneliness. Studies show pet owners have lower stress, lower blood pressure, and live longer.' },
          { icon: '🧠', title: 'Routine', body: 'Feeding, walking, and playing creates healthy daily structure — especially important for children.' },
          { icon: '🤗', title: 'Unconditional Love', body: 'Pets do not judge. They are always happy to see you — no matter what kind of day you had.' },
          { icon: '🎓', title: 'Responsibility', body: 'Caring for a living creature teaches empathy, patience, and commitment from a young age.' },
        ],
      },
      {
        type: 'visual',
        label: '— Pets vs Robot Pets',
        heading: 'Comparing Real Pets to Robot Pets',
        body: 'Let us compare honestly. Both have real advantages and real limitations:',
        cards: [
          { icon: '🐕', title: 'Real Pet', body: 'Feels real emotions, can get sick and hurt, needs daily care, creates a genuine bond. Unpredictable and alive.' },
          { icon: '🤖', title: 'Robot Pet', body: 'Never gets sick, available anytime, customisable behaviour, does not require food or walks. Predictable and safe.' },
          { icon: '💛', title: 'What Both Give', body: 'Companionship, a reason to care for something, playful interaction, and something to look forward to each day.' },
          { icon: '🤔', title: 'The Big Question', body: 'Can a robot ever truly be a friend? What ingredients of friendship can a machine match — and what can it never replace?' },
        ],
      },
      {
        type: 'visual',
        label: '— Real Robot Pets',
        heading: 'Robot Pets That Exist Right Now',
        body: 'These are not science fiction — they are real products being used by people around the world today:',
        cards: [
          { icon: '🐶', title: 'Sony AIBO', body: 'A robot dog with AI that learns its owner\'s preferences over time. It reacts to being petted and responds to voice commands.' },
          { icon: '🦭', title: 'PARO', body: 'A robotic baby seal used in hospitals and care homes. It reduces anxiety in elderly patients and people with dementia.' },
          { icon: '🐱', title: 'Tombot', body: 'A robot golden retriever puppy designed for dementia patients who cannot care for a real dog but need the comfort.' },
          { icon: '🦁', title: 'Spot (Boston Dynamics)', body: 'Not designed as a pet, but children in hospitals have responded to it emotionally — demonstrating how easily we bond with robots that move naturally.' },
        ],
      },
      {
        type: 'concept',
        label: '— Design Thinking for Pets',
        heading: 'What Makes a Robot Feel Alive?',
        body: 'When designing a robot pet, engineers focus on these features to make it feel real and loveable:',
        items: [
          '👁️ EYE CONTACT — Looking at a person makes a robot feel aware and attentive.',
          '🔊 SOUND — Purring, barking, whimpering at the right moments triggers emotional responses.',
          '🤝 TOUCH RESPONSE — Reacting to being petted (stroking the back activates a sound or movement).',
          '🎲 RANDOMNESS — Slightly unpredictable behaviour makes it feel more alive than a scripted machine.',
          '😴 REST STATE — Appearing to sleep when inactive makes it feel like a living thing rather than a device.',
          '❤️ MEMORY — Remembering your name or preferences makes it feel personal.',
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Build a LEGO Robot Pet',
        body: 'Design and build your own LEGO robot pet. Think about personality: is it energetic or calm? Playful or serious? Your robot should feel like it has character.',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Requirement',
        heading: 'Give It Movement',
        body: 'Your LEGO robot pet MUST move and use the motors. Add wheels, waving arms, wagging tail, or bobbing head. Program at least 3 different movements/behaviours. You will present your pet to the class!',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Add Sensor Interaction',
        body: 'Make your pet respond to YOU. Use any sensor: wave your hand near the distance sensor to make it wag its tail, press the force sensor to hear it bark, or show it a color to change its mood. Make it feel alive!',
        challengeNum: 2,
      },
    ],
  },

  // ─────────────────────────────── LESSON 12 ───────────────────────────────
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
        heading: 'Looking Back',
        body: 'What was your favorite project from this entire class? What was the hardest thing you learned? What would you want to build if you had unlimited LEGO pieces?',
      },
      {
        type: 'rules',
        label: '— Class Rules',
        heading: 'Rules',
        items: RULES_STANDARD,
      },
      {
        type: 'concept',
        label: '— Recap',
        heading: 'Robot Pet Review',
        body: 'Last lesson you designed and built robot pets. Let us remember:',
        items: [
          '💛 What 4 things do pets give humans that make them special?',
          '🤖 Name one real robot pet that exists today. What does it do?',
          '👁️ What design features make a robot feel alive? (eye contact, sound, touch response, randomness...)',
          '🎤 Present your pet to the group — name it and explain one behaviour you programmed.',
        ],
      },
      {
        type: 'visual',
        label: '— What Makes Something Secure?',
        heading: 'The Science of Security',
        body: 'Security systems are designed around one idea: only allow the RIGHT person in. Here is how different systems achieve this:',
        cards: [
          { icon: '🔑', title: 'Something You Have', body: 'A physical key — only works because very few people have that specific shape. Weakness: it can be copied or stolen.' },
          { icon: '🔢', title: 'Something You Know', body: 'A PIN or combination — only works if you remember the right sequence. Weakness: it can be guessed or watched.' },
          { icon: '👆', title: 'Something You Are', body: 'A fingerprint, face, or eye scan — unique biological traits. Weakness: very hard to fake but cannot be changed if stolen.' },
          { icon: '🌐', title: 'Two-Factor', body: 'Using TWO of the above together (e.g. PIN + fingerprint). Much harder to break since the attacker needs both.' },
        ],
      },
      {
        type: 'visual',
        label: '— How Locks Work',
        heading: 'Inside a Lock',
        body: 'Most physical locks use the same basic mechanism. Here is how a standard pin tumbler lock (like your front door) works:',
        cards: [
          { icon: '📌', title: 'The Pins', body: 'Inside the lock are spring-loaded pin stacks. Without the correct key, pins block the cylinder from rotating.' },
          { icon: '🔑', title: 'The Key', body: 'Each key has a unique pattern of notches. The notches push each pin stack to exactly the right height.' },
          { icon: '⭕', title: 'The Shear Line', body: 'When the correct key is inserted, ALL pins align perfectly at the shear line. The cylinder is now free to rotate.' },
          { icon: '🚪', title: 'The Open', body: 'Rotating the cylinder pulls back the latch — the door opens. Wrong key? Even one misaligned pin blocks everything.' },
        ],
      },
      {
        type: 'visual',
        label: '— Security in Technology',
        heading: 'How Do Computers Stay Secure?',
        body: 'The same principles apply to digital security. Here is how computers protect information:',
        cards: [
          { icon: '🔐', title: 'Passwords', body: 'Something you know — but stored as a scrambled hash, not the original text. Even the server cannot read your real password.' },
          { icon: '📨', title: '2FA Code', body: 'A one-time code sent to your phone. Even if someone steals your password, they still need physical access to your device.' },
          { icon: '🛡️', title: 'Encryption', body: 'Data is scrambled using a mathematical key. Only someone with the matching key can unscramble and read it.' },
          { icon: '👁️', title: 'Face / Touch ID', body: 'Your device scans your face or fingerprint and compares it to a stored biometric template — unlocks only for you.' },
        ],
      },
      {
        type: 'concept',
        label: '— Vault Design',
        heading: 'What Makes a Great Vault?',
        body: 'The best vaults combine multiple security layers. Here is what designers think about:',
        items: [
          '🔒 MULTIPLE LOCKS — Even if one is picked, the others still block entry.',
          '⚖️ WEIGHT — A heavy vault door is harder to force open. Steel vault doors can weigh over 2,000 kg.',
          '🕰️ TIME DELAY — Bank vaults automatically lock for hours after an alarm trigger. Even the correct code will not open them.',
          '🚨 SENSORS — Motion, vibration, and heat sensors detect tampering and trigger alarms silently.',
          '🏗️ MATERIALS — Vault walls use layers of steel, concrete, and copper to resist drilling, burning, and electromagnetic attacks.',
          '👁️ CAMERAS + GUARDS — Human and AI surveillance monitor 24/7. The first alert goes to a response team in seconds.',
        ],
      },
      {
        type: 'visual',
        label: '— Group Engineering',
        heading: 'Working as a Team',
        body: 'Today\'s challenge is a GROUP build. Teamwork in engineering requires clear roles and communication:',
        cards: [
          { icon: '🏗️', title: 'Lead Builder', body: 'Responsible for the physical structure — the vault body, door mechanism, and moving parts.' },
          { icon: '💻', title: 'Lead Programmer', body: 'Responsible for the code — motor control, sensor detection, and the locking/unlocking logic.' },
          { icon: '🎨', title: 'Creative Director', body: 'Responsible for the design story — what makes this vault unique and how to present it.' },
          { icon: '🧪', title: 'Lead Tester', body: 'Responsible for testing every feature, finding bugs, and confirming the vault actually works under all conditions.' },
        ],
      },
      {
        type: 'project',
        label: "— Today's Project",
        heading: 'Building a Vault',
        body: 'Build a LEGO vault as a group. Your vault must have: a door that opens and closes with a motor, at least one sensor that acts as the "key", and a visual/sound indicator for locked vs unlocked states.',
        projectLink: { label: 'Open in LEGO SPIKE', url: LEGO_SPIKE },
      },
      {
        type: 'challenge',
        label: '— Requirement',
        heading: 'Motor-Powered Door',
        body: 'Your vault door MUST use a motor to open and close. Program it so the door only opens when the correct sensor condition is met — a specific color card shown, a button pressed, or a hand waved at the correct distance.',
        challengeNum: 1,
      },
      {
        type: 'challenge',
        label: '— Challenge',
        heading: 'Tell Your Vault\'s Story',
        body: 'Design a story around your vault. Give it a name, decide what is inside it, and add atmosphere: a guard robot, a dramatic alarm sound when someone gets too close, or a countdown timer before it locks again. Present the full story to the class!',
        challengeNum: 2,
      },
    ],
  },
];

export const LECTURE_MAP: Record<string, Lecture> = Object.fromEntries(
  LECTURES.map(l => [l.id, l])
);
