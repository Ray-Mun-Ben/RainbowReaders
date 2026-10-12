// Rainbow Readers - Seed Data & Curriculum Model
// Tailored for CBC Learners in Grades 1-3 at Madaraka Primary School

export const DEMO_USERS = {
  student: {
    username: 'amani',
    password: 'read123',
    name: 'Amani Otieno',
    role: 'student',
    grade: 2,
    classRoom: '2A',
    pathway: 'Starting', // Starts in Starting or resets here for demo flow
    avatar: '👦🏾',
    hasCompletedBaseline: false,
    completedActivities: 0
  },
  teacher: {
    username: 'kamau',
    password: 'teach123',
    name: 'Mrs. Wanjiru Kamau',
    role: 'teacher',
    title: 'Teacher',
    avatar: '👩🏾‍🏫',
    school: 'Madaraka Primary School'
  },
  parent: {
    username: 'parent',
    password: 'home123',
    name: 'Mrs. Otieno',
    role: 'parent',
    title: 'Parent',
    studentName: 'Amani Otieno',
    avatar: '👩🏾'
  }
};

export const INITIAL_STUDENTS = [
  { id: 's1', name: 'Brian Otieno', grade: 1, classRoom: '1A', pathway: 'Starting', progress: { completed: 1, total: 4 }, needsSupport: true, lastActivity: '2026-08-20' },
  { id: 's2', name: 'Diana Achieng', grade: 1, classRoom: '1B', pathway: 'Exploring', progress: { completed: 2, total: 2 }, needsSupport: false, lastActivity: '2026-08-25' },
  { id: 's3', name: 'Faith Njeri', grade: 1, classRoom: '1A', pathway: 'Growing', progress: { completed: 3, total: 3 }, needsSupport: false, lastActivity: '2026-08-29' },
  { id: 's4', name: 'Kevin Mwangi', grade: 1, classRoom: '1B', pathway: 'Starting', progress: { completed: 2, total: 4 }, needsSupport: false, lastActivity: '2026-08-28' },
  { id: 's5', name: 'Amani Otieno', grade: 2, classRoom: '2A', pathway: 'Growing', progress: { completed: 2, total: 3 }, needsSupport: false, lastActivity: '2026-09-07' },
  { id: 's6', name: 'Grace Wambui', grade: 2, classRoom: '2A', pathway: 'Growing', progress: { completed: 2, total: 3 }, needsSupport: false, lastActivity: '2026-08-27' },
  { id: 's7', name: 'Mercy Chebet', grade: 2, classRoom: '2B', pathway: 'Starting', progress: { completed: 0, total: 3 }, needsSupport: true, lastActivity: '—' },
  { id: 's8', name: 'Peter Kamau', grade: 2, classRoom: '2A', pathway: 'Starting', progress: { completed: 1, total: 3 }, needsSupport: false, lastActivity: '2026-08-21' },
  { id: 's9', name: 'Samuel Odhiambo', grade: 2, classRoom: '2B', pathway: 'Exploring', progress: { completed: 3, total: 3 }, needsSupport: false, lastActivity: '2026-08-30' },
  { id: 's10', name: 'Dennis Mutua', grade: 3, classRoom: '3B', pathway: 'Exploring', progress: { completed: 1, total: 3 }, needsSupport: false, lastActivity: '2026-08-17' },
  { id: 's11', name: 'Esther Nyambura', grade: 3, classRoom: '3B', pathway: 'Starting', progress: { completed: 0, total: 3 }, needsSupport: true, lastActivity: '—' },
  { id: 's12', name: 'John Kiptoo', grade: 3, classRoom: '3A', pathway: 'Starting', progress: { completed: 1, total: 3 }, needsSupport: false, lastActivity: '2026-08-24' },
  { id: 's13', name: 'Lucy Wanjiku', grade: 3, classRoom: '3A', pathway: 'Growing', progress: { completed: 3, total: 3 }, needsSupport: false, lastActivity: '2026-09-01' }
];

export const INITIAL_MILESTONES = [
  { id: 'm1', icon: '🌱', title: 'First Steps — completed your first activity', date: '2026-08-11', type: 'seed', desc: 'Finished the initial phonics and letter recognition check.' },
  { id: 'm2', icon: '🟦', title: 'Explored every activity in the Starting pathway', date: '2026-08-19', type: 'starting', desc: 'Mastered single sounds and simple syllables blending.' },
  { id: 'm3', icon: '⭐', title: 'Getting Stronger — 5 activities completed', date: '2026-09-07', type: 'growing', desc: 'Demonstrated consistent sentence fluency and question comprehension.' }
];

// Baseline 5-Stage Comprehension Assessment Data
export const BASELINE_ASSESSMENT = {
  id: 'baseline-check',
  title: 'Foundational Comprehension Check',
  grade: 2,
  description: 'Establishing your reading baseline through phonics, blending, and comprehension.',
  stages: [
    {
      stageNumber: 1,
      title: 'Stage 1: Letter Sounds',
      instruction: 'Listen carefully to each letter sound, then say it out loud.',
      items: [
        { char: 'A', phonetic: 'ah', example: 'as in Apple' },
        { char: 'B', phonetic: 'buh', example: 'as in Ball' },
        { char: 'E', phonetic: 'eh', example: 'as in Elephant' },
        { char: 'R', phonetic: 'rrr', example: 'as in Red' },
        { char: 'D', phonetic: 'duh', example: 'as in Duck' }
      ]
    },
    {
      stageNumber: 2,
      title: 'Stage 2: Syllable Blending',
      instruction: 'Combine the letter sounds together to make syllables.',
      items: [
        { text: 'Ba', breakdown: 'B + a', speech: 'Ba', note: 'Like the start of Basket' },
        { text: 'Do', breakdown: 'D + o', speech: 'Do', note: 'Like the start of Door' },
        { text: 'Re', breakdown: 'R + e', speech: 'Re', note: 'Like the start of Red' },
        { text: 'Ad', breakdown: 'A + d', speech: 'Ad', note: 'Like the end of Bad' }
      ]
    },
    {
      stageNumber: 3,
      title: 'Stage 3: Simple 3 to 4 Letter Words',
      instruction: 'Blend syllables together to read complete words.',
      items: [
        { word: 'Red', speech: 'Red', meaning: 'The color of ripe berries', icon: '🔴' },
        { word: 'Bed', speech: 'Bed', meaning: 'Where we sleep at night', icon: '🛏️' },
        { word: 'Bad', speech: 'Bad', meaning: 'Opposite of good', icon: '❌' },
        { word: 'Rob', speech: 'Rob', meaning: 'A name or action', icon: '👤' },
        { word: 'Ball', speech: 'Ball', meaning: 'A round toy for playing', icon: '⚽' }
      ]
    },
    {
      stageNumber: 4,
      title: 'Stage 4: Sentence Reading',
      instruction: 'Listen to the full sentence and read it along with the audio.',
      sentence: 'The boy has a red ball',
      words: ['The', 'boy', 'has', 'a', 'red', 'ball'],
      audioText: 'The boy has a red ball.'
    },
    {
      stageNumber: 5,
      title: 'Stage 5: Comprehension Check',
      instruction: 'Based on what you just read, answer the question below.',
      passage: 'The boy has a red ball.',
      question: 'What color was the ball?',
      options: [
        { text: 'Red', isCorrect: true },
        { text: 'Blue', isCorrect: false },
        { text: 'Green', isCorrect: false },
        { text: 'Yellow', isCorrect: false }
      ]
    }
  ]
};

// Curriculum Activity Bank across Grades and Pathways
export const CURRICULUM_ACTIVITIES = [
  // GRADE 1
  {
    id: 'g1-s1',
    grade: 1,
    pathway: 'Starting',
    title: 'Single Letter Sounds & Phonics',
    description: 'Learn the primary sounds of letters S, A, T, P, I, N.',
    focus: 'Single letter sounds',
    items: ['S', 'A', 'T', 'P', 'I', 'N'],
    sentence: 'Sam sat in a pan.',
    question: 'Who sat down?',
    options: ['Sam', 'Tom', 'Cat', 'Dog'],
    correctAnswer: 'Sam'
  },
  {
    id: 'g1-s2',
    grade: 1,
    pathway: 'Starting',
    title: 'Double Word Sounds & Blending',
    description: 'Blend consonant-vowel combinations like Ma, Pa, Ta.',
    focus: 'Double word sounds',
    items: ['Ma', 'Pa', 'Ta', 'Na'],
    sentence: 'Pat the cat on the mat.',
    question: 'Where is the cat?',
    options: ['On the mat', 'In the car', 'On the bed', 'Outside'],
    correctAnswer: 'On the mat'
  },
  {
    id: 'g1-g1',
    grade: 1,
    pathway: 'Growing',
    title: 'Short Sentence Success',
    description: 'Read 3-word to 5-word phrases fluently.',
    focus: 'Fluency in short sentences',
    items: ['The cat', 'A big dog', 'Sun is hot'],
    sentence: 'The big sun is hot today.',
    question: 'What is hot?',
    options: ['The sun', 'The milk', 'The pan', 'The hat'],
    correctAnswer: 'The sun'
  },
  {
    id: 'g1-e1',
    grade: 1,
    pathway: 'Exploring',
    title: 'Early Story Safari',
    description: 'Simple stories with cheerful animal characters.',
    focus: 'Early story comprehension',
    items: ['Lion', 'Zebra', 'Run', 'Fast'],
    sentence: 'The fast zebra ran past the tree.',
    question: 'Who ran fast?',
    options: ['Zebra', 'Lion', 'Giraffe', 'Elephant'],
    correctAnswer: 'Zebra'
  },

  // GRADE 2
  {
    id: 'g2-s1',
    grade: 2,
    pathway: 'Starting',
    title: 'Double Letter Sounds & Blends',
    description: 'Practice consonant blends: Sh, Ch, Th, Wh.',
    focus: 'Consonant blends & digraphs',
    items: ['Sh', 'Ch', 'Th', 'Wh'],
    sentence: 'The ship sailed to the shop.',
    question: 'Where did the ship sail?',
    options: ['To the shop', 'To the tree', 'To the river', 'Home'],
    correctAnswer: 'To the shop'
  },
  {
    id: 'g2-g1',
    grade: 2,
    pathway: 'Growing',
    title: 'Vowel Exploration (A, E, I, O, U)',
    description: 'Re-introducing vowels in 3-4 letter words with comprehension checks.',
    focus: 'Vowel sounds in words',
    items: ['Bat', 'Bed', 'Bin', 'Box', 'Bus'],
    sentence: 'The red bus stopped at the school gate.',
    question: 'Where did the bus stop?',
    options: ['At the school gate', 'At the shop', 'At the park', 'By the river'],
    correctAnswer: 'At the school gate'
  },
  {
    id: 'g2-g2',
    grade: 2,
    pathway: 'Growing',
    title: 'Sentence Fluency & Comprehension',
    description: 'Read descriptive sentences and answer detail questions.',
    focus: 'Sentence comprehension with MCQs',
    items: ['Green frog', 'Jumps high', 'In the pond'],
    sentence: 'A little green frog jumped into the cool water.',
    question: 'What did the little green frog do?',
    options: ['Jumped into the cool water', 'Climbed a tall tree', 'Ate a fly', 'Fell asleep'],
    correctAnswer: 'Jumped into the cool water'
  },
  {
    id: 'g2-e1',
    grade: 2,
    pathway: 'Exploring',
    title: 'Grade 3 Preview: Compound Words & Stories',
    description: 'Preview higher grade content after proving mastery in Growing.',
    focus: 'Compound words & multi-clause sentences',
    items: ['Sunlight', 'Raindrop', 'Classroom', 'Playground'],
    sentence: 'The golden sunlight warmed the school playground at Madaraka.',
    question: 'What warmed the playground?',
    options: ['Golden sunlight', 'A camp fire', 'Warm tea', 'The bright moon'],
    correctAnswer: 'Golden sunlight'
  },

  // GRADE 3
  {
    id: 'g3-s1',
    grade: 3,
    pathway: 'Starting',
    title: 'Consonant Clusters & Long Vowels',
    description: 'Practice silent-E and complex sound groups.',
    focus: 'Long vowels and silent-e',
    items: ['Cake', 'Bite', 'Hope', 'Tube'],
    sentence: 'She baked a sweet cake for the class party.',
    question: 'What did she bake?',
    options: ['A sweet cake', 'Fresh bread', 'A fruit pie', 'Biscuits'],
    correctAnswer: 'A sweet cake'
  },
  {
    id: 'g3-g1',
    grade: 3,
    pathway: 'Growing',
    title: 'Complex Sentences & Context Clues',
    description: 'Sentences combining vowels and irregular phonics.',
    focus: 'Complex sentences & comprehension',
    items: ['Because', 'Although', 'Together', 'Through'],
    sentence: 'The students walked through the forest trail because the morning air was fresh.',
    question: 'Why did the students walk through the trail?',
    options: ['Because morning air was fresh', 'Because they were lost', 'To see animals', 'To run away'],
    correctAnswer: 'Because morning air was fresh'
  },
  {
    id: 'g3-e1',
    grade: 3,
    pathway: 'Exploring',
    title: 'Full Paragraph CBC Reading Adventure',
    description: 'Deep comprehension of community and environmental stories.',
    focus: 'Paragraph fluency & inference',
    items: ['Conservation', 'Harvest', 'Community', 'Tradition'],
    sentence: 'Madaraka learners planted five avocado seedlings near the library so future classes could enjoy shade and fruit.',
    question: 'Where did the learners plant seedlings?',
    options: ['Near the library', 'On the main road', 'By the soccer field', 'At home'],
    correctAnswer: 'Near the library'
  }
];
