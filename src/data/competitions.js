export const CATEGORIES = [
  {
    id: 'Kids',
    name: 'Kids',
    tagline: 'Young Talents',
    ageRange: 'Age below 13',
    minAge: 5,
    maxAge: 12,
    description: 'Fun, creative and engaging competitions for young talents.',
    gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(14, 165, 233, 0.05))',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    accentColor: '#38BDF8',
    count: 4,
    icon: 'Sparkles'
  },
  {
    id: 'Medium',
    name: 'Medium',
    tagline: 'Middle & Teenage',
    ageRange: 'Age 13–17',
    minAge: 13,
    maxAge: 17,
    description: 'Skill-based competitions for school and teenage participants.',
    gradient: 'linear-gradient(135deg, rgba(129, 140, 248, 0.15), rgba(99, 102, 241, 0.05))',
    borderColor: 'rgba(129, 140, 248, 0.3)',
    accentColor: '#818CF8',
    count: 4,
    icon: 'Award'
  },
  {
    id: 'Under 35',
    name: 'Under 35',
    tagline: 'Emerging Achievers',
    ageRange: 'Age 18–34',
    minAge: 18,
    maxAge: 34,
    description: 'Showcase your skills and compete with talented participants across the state.',
    gradient: 'linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(16, 185, 129, 0.05))',
    borderColor: 'rgba(52, 211, 153, 0.3)',
    accentColor: '#34D399',
    count: 4,
    icon: 'Trophy'
  }
];

export const COMPETITIONS_DATA = [
  // --- Kids Category ---
  {
    id: 'comp-kids-1',
    name: 'Drawing Competition',
    category: 'Kids',
    shortDescription: 'Express your creative imagination on canvas with rich themes depicting nature, state heritage, and futuristic dreams.',
    eligibility: 'Age below 13',
    status: 'Registration Open',
    spotsAvailable: '120 Spots Remaining',
    duration: '2 Hours',
    venue: 'Creative Arts Hall / State Pavilion',
    tags: ['Art & Color', 'Creative', 'Canvas'],
    icon: 'Palette'
  },
  {
    id: 'comp-kids-2',
    name: 'Storytelling',
    category: 'Kids',
    shortDescription: 'Narrate captivating moral and imaginative stories with expressive voice modulation, enthusiasm, and stage presence.',
    eligibility: 'Age below 13',
    status: 'Registration Open',
    spotsAvailable: '85 Spots Remaining',
    duration: '5 Minutes',
    venue: 'Auditorium Stage B',
    tags: ['Expression', 'Public Speaking', 'Narrative'],
    icon: 'BookOpen'
  },
  {
    id: 'comp-kids-3',
    name: 'Singing',
    category: 'Kids',
    shortDescription: 'Solo vocal competition showcasing young melodious voices across classical, folk, and light music genres.',
    eligibility: 'Age below 13',
    status: 'Registration Open',
    spotsAvailable: '60 Spots Remaining',
    duration: '4 Minutes',
    venue: 'Music Arena 1',
    tags: ['Music', 'Vocal', 'Classical/Folk'],
    icon: 'Mic'
  },
  {
    id: 'comp-kids-4',
    name: 'Handwriting',
    category: 'Kids',
    shortDescription: 'Celebrate the timeless beauty of neat, artistic penmanship, cursive fluidity, and calligraphic elegance.',
    eligibility: 'Age below 13',
    status: 'Registration Open',
    spotsAvailable: '150 Spots Remaining',
    duration: '45 Minutes',
    venue: 'Academic Hall 3',
    tags: ['Penmanship', 'Cursive', 'Accuracy'],
    icon: 'PenTool'
  },

  // --- Medium Category ---
  {
    id: 'comp-med-1',
    name: 'Quiz Competition',
    category: 'Medium',
    shortDescription: 'A fast-paced knowledge duel spanning science breakthroughs, state history, world affairs, and cutting-edge tech.',
    eligibility: 'Age 13–17',
    status: 'Registration Open',
    spotsAvailable: '90 Spots Remaining',
    duration: '1.5 Hours',
    venue: 'Central Amphitheater',
    tags: ['General Knowledge', 'STEM', 'Rapid Fire'],
    icon: 'HelpCircle'
  },
  {
    id: 'comp-med-2',
    name: 'Speech Competition',
    category: 'Medium',
    shortDescription: 'Deliver powerful, articulate oratory on the role of youth in shaping the economic and cultural future of the state.',
    eligibility: 'Age 13–17',
    status: 'Registration Open',
    spotsAvailable: '70 Spots Remaining',
    duration: '5 Minutes',
    venue: 'Elocution Hall A',
    tags: ['Elocution', 'Leadership', 'Perspective'],
    icon: 'Megaphone'
  },
  {
    id: 'comp-med-3',
    name: 'Essay Writing',
    category: 'Medium',
    shortDescription: 'Structured analytical essays exploring sustainable state growth, artificial intelligence, and societal resilience.',
    eligibility: 'Age 13–17',
    status: 'Registration Open',
    spotsAvailable: '110 Spots Remaining',
    duration: '1 Hour',
    venue: 'Examination Wing B',
    tags: ['Literature', 'Analysis', 'Critical Thinking'],
    icon: 'FileText'
  },
  {
    id: 'comp-med-4',
    name: 'Photography',
    category: 'Medium',
    shortDescription: 'Capture genuine slices of community life, architectural splendor, and natural landscapes through your lens.',
    eligibility: 'Age 13–17',
    status: 'Registration Open',
    spotsAvailable: '75 Spots Remaining',
    duration: 'Submissions & Live Shoot',
    venue: 'Visual Media Center',
    tags: ['Visual Art', 'Perspective', 'Composition'],
    icon: 'Camera'
  },

  // --- Under 35 Category ---
  {
    id: 'comp-u35-1',
    name: 'Coding Competition',
    category: 'Under 35',
    shortDescription: 'Tackle rigorous algorithmic puzzles, data structures, and rapid problem-solving against top programmers across the state.',
    eligibility: 'Age 18–34',
    status: 'Registration Open',
    spotsAvailable: '200 Spots Remaining',
    duration: '3 Hours',
    venue: 'Tech Innovation Labs',
    tags: ['Algorithms', 'Software', 'Speed Coding'],
    icon: 'Code'
  },
  {
    id: 'comp-u35-2',
    name: 'Photography',
    category: 'Under 35',
    shortDescription: 'High-caliber photojournalism and conceptual photography capturing the vibrant soul, people, and transitions of the state.',
    eligibility: 'Age 18–34',
    status: 'Registration Open',
    spotsAvailable: '80 Spots Remaining',
    duration: 'Exhibition & Evaluation',
    venue: 'State Gallery & Media Wing',
    tags: ['Visual Arts', 'Storytelling', 'Exhibition'],
    icon: 'Camera'
  },
  {
    id: 'comp-u35-3',
    name: 'Public Speaking',
    category: 'Under 35',
    shortDescription: 'Keynote-level persuasive speaking addressing socio-economic development, technological disruption, and state leadership.',
    eligibility: 'Age 18–34',
    status: 'Registration Open',
    spotsAvailable: '50 Spots Remaining',
    duration: '7 Minutes',
    venue: 'Grand Plenary Hall',
    tags: ['Keynote', 'Rhetoric', 'State Vision'],
    icon: 'Mic'
  },
  {
    id: 'comp-u35-4',
    name: 'Talent Competition',
    category: 'Under 35',
    shortDescription: 'An electrifying multi-discipline showcase for instrumental maestros, versatile artists, and unique performers.',
    eligibility: 'Age 18–34',
    status: 'Registration Open',
    spotsAvailable: '65 Spots Remaining',
    duration: '6 Minutes',
    venue: 'Main State Stage',
    tags: ['Performance', 'Performing Arts', 'Live Stage'],
    icon: 'Sparkles'
  }
];

export const TAMIL_NADU_DISTRICTS = [
  'Ariyalur',
  'Chengalpattu',
  'Chennai',
  'Coimbatore',
  'Cuddalore',
  'Dharmapuri',
  'Dindigul',
  'Erode',
  'Kallakurichi',
  'Kanchipuram',
  'Kanyakumari',
  'Karur',
  'Krishnagiri',
  'Madurai',
  'Mayiladuthurai',
  'Nagapattinam',
  'Namakkal',
  'Nilgiris',
  'Perambalur',
  'Pudukkottai',
  'Ramanathapuram',
  'Ranipet',
  'Salem',
  'Sivaganga',
  'Tenkasi',
  'Thanjavur',
  'Theni',
  'Thoothukudi (Tuticorin)',
  'Tiruchirappalli (Trichy)',
  'Tirunelveli',
  'Tirupathur',
  'Tiruppur',
  'Tiruvallur',
  'Tiruvannamalai',
  'Tiruvarur',
  'Vellore',
  'Viluppuram',
  'Virudhunagar'
];

/**
 * Calculates exact age in full years from a YYYY-MM-DD date string.
 */
export function calculateAge(dobString) {
  if (!dobString) return null;
  const birthDate = new Date(dobString);
  if (isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 0 ? age : 0;
}

/**
 * Determines the eligible category based on age rules:
 * - Kids: Age below 13 (< 13)
 * - Medium: Age 13–17 (13 <= age <= 17)
 * - Under 35: Age 18–34 (18 <= age <= 34)
 * - 35+: Not eligible
 */
export function getCategoryForAge(age) {
  if (age === null || age === undefined || isNaN(age)) return null;
  if (age < 5) return 'TOO_YOUNG'; // Below 5
  if (age < 13) return 'Kids';
  if (age <= 17) return 'Medium';
  if (age < 35) return 'Under 35';
  return 'OVER_AGE'; // 35 or above
}

/**
 * Validates if the selected category matches the age
 */
export function isCategoryMatchingAge(age, category) {
  if (age === null || age === undefined) return { valid: false, message: 'Please enter Date of Birth first' };

  if (age >= 35) {
    return {
      valid: false,
      message: 'This event is currently available only for participants below 35 years.'
    };
  }

  if (age < 5) {
    return {
      valid: false,
      message: 'Minimum age requirement for participation is 5 years.'
    };
  }

  const expectedCategory = getCategoryForAge(age);
  if (expectedCategory !== category) {
    return {
      valid: false,
      message: 'Your age does not match the selected category.'
    };
  }

  return { valid: true };
}

const STORAGE_KEY = 'state_compete_registrations';
const COUNTER_KEY = 'state_compete_reg_counter';

/**
 * Retrieves all registrations stored in LocalStorage.
 */
export function getStoredRegistrations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read from localStorage', e);
    return [];
  }
}

/**
 * Generates the next sequential unique Registration ID.
 * Example: REG-2026-00125
 */
export function generateRegistrationId() {
  try {
    let currentCount = parseInt(localStorage.getItem(COUNTER_KEY) || '124', 10);
    const nextCount = currentCount + 1;
    localStorage.setItem(COUNTER_KEY, nextCount.toString());
    const padded = String(nextCount).padStart(5, '0');
    return `REG-2026-${padded}`;
  } catch (e) {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    return `REG-2026-${randomSuffix}`;
  }
}

/**
 * Saves a new participant registration to LocalStorage.
 */
export function saveRegistration(registrationData) {
  try {
    const existing = getStoredRegistrations();
    const updated = [registrationData, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Failed to save to localStorage', e);
    return false;
  }
}
