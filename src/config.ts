// ============================================================
// GENERATION CLASH — INDIA EDITION
// All game content & rules live here. Change generations,
// questions, weights and result messages in ONE place.
// Future editions (Tamil Nadu, Bollywood, Office…) can be
// added as new packs in QUESTION_PACKS.
// ============================================================

export type GenId = 'millennial' | 'genz' | 'genalpha' | 'genbeta'

export interface Generation {
  id: GenId
  name: string
  emoji: string
  from: number // inclusive birth year
  to: number   // inclusive; use 9999 for open-ended
  vibe: string // playful one-liner
}

export const GENERATIONS: Generation[] = [
  { id: 'millennial', name: 'Millennial', emoji: '📼', from: 1981, to: 1996, vibe: 'Retro soul. Remembers dial-up tones.' },
  { id: 'genz',       name: 'Gen Z',      emoji: '📱', from: 1997, to: 2012, vibe: 'Digital native. Fluent in reels.' },
  { id: 'genalpha',   name: 'Gen Alpha',  emoji: '🤖', from: 2013, to: 2024, vibe: 'Never knew a world without Wi-Fi.' },
  { id: 'genbeta',    name: 'Gen Beta',   emoji: '🚀', from: 2025, to: 9999, vibe: 'Future generation. Literally.' },
]

export function generationForYear(year: number): Generation {
  return GENERATIONS.find(g => year >= g.from && year <= g.to) ?? GENERATIONS[0]
}

// Weights: how much an answer pushes each hidden generation score.
export type Weights = Partial<Record<GenId, number>>

export interface Answer {
  text: string
  weights: Weights
}

export interface Question {
  id: string
  category: string
  emoji: string
  question: string
  answers: Answer[] // exactly 4
}

// Shorthand helpers keep the pool readable
const M = (n: number): Weights => ({ millennial: n })
const Z = (n: number): Weights => ({ genz: n })
const A = (n: number): Weights => ({ genalpha: n })
const B = (n: number): Weights => ({ genbeta: n })

export const QUESTIONS_PER_GAME = 10

// ---- Question pool (random 10 picked each game) ----
export const QUESTION_POOL: Question[] = [
  {
    id: 'music', category: 'MUSIC', emoji: '🎵',
    question: 'How did you mostly listen to music while growing up?',
    answers: [
      { text: 'YouTube / Spotify / JioSaavn', weights: { ...Z(2), ...A(2) } },
      { text: 'CDs / DVDs', weights: M(3) },
      { text: 'Cassettes / tape recorder', weights: M(4) },
      { text: 'Radio / TV', weights: M(5) },
    ],
  },
  {
    id: 'contact', category: 'CONTACTING FRIENDS', emoji: '📞',
    question: 'Your parents wanted to contact you when you were outside. What did they usually do?',
    answers: [
      { text: 'WhatsApp message', weights: { ...Z(2), ...A(3) } },
      { text: 'Call your mobile', weights: { ...M(2), ...Z(2) } },
      { text: "Call your friend's landline", weights: M(4) },
      { text: 'Wait until you came home', weights: M(5) },
    ],
  },
  {
    id: 'movies', category: 'WATCHING MOVIES', emoji: '🎬',
    question: 'You wanted to watch a movie at home. What was your usual option?',
    answers: [
      { text: 'Netflix / Prime / Hotstar', weights: { ...Z(2), ...A(2) } },
      { text: 'YouTube', weights: { ...Z(3), ...A(1) } },
      { text: 'CD / DVD', weights: M(3) },
      { text: 'Cable TV and wait for the movie', weights: M(5) },
    ],
  },
  {
    id: 'numbers', category: 'FINDING PHONE NUMBERS', emoji: '📇',
    question: "You wanted to find someone's phone number. What did you usually do?",
    answers: [
      { text: 'WhatsApp / Instagram', weights: { ...Z(2), ...A(2) } },
      { text: 'Google it', weights: { ...Z(2), ...M(1) } },
      { text: 'Search your mobile contacts', weights: { ...M(2), ...Z(1) } },
      { text: 'Check a telephone diary / ask someone', weights: M(5) },
    ],
  },
  {
    id: 'photos-send', category: 'SENDING PHOTOS', emoji: '📸',
    question: 'Your friend says: “I’ll send you the photo.” What would you expect?',
    answers: [
      { text: 'WhatsApp', weights: { ...Z(2), ...A(2) } },
      { text: 'Instagram DM', weights: { ...Z(3), ...A(2) } },
      { text: 'Bluetooth', weights: M(3) },
      { text: 'They’ll give you a printed photo 😂', weights: M(5) },
    ],
  },
  {
    id: 'after-school', category: 'AFTER SCHOOL', emoji: '🏏',
    question: 'What was your favourite entertainment after coming home from school?',
    answers: [
      { text: 'YouTube / Reels / mobile gaming', weights: { ...Z(2), ...A(3) } },
      { text: 'PlayStation / PC games', weights: { ...M(2), ...Z(2) } },
      { text: 'Cartoon channels / TV', weights: M(3) },
      { text: 'Going outside to play with friends', weights: M(5) },
    ],
  },
  {
    id: 'info', category: 'FINDING INFORMATION', emoji: '📖',
    question: 'You wanted to know the meaning of an English word. What did you usually use?',
    answers: [
      { text: 'Google', weights: { ...Z(2), ...M(1) } },
      { text: 'ChatGPT', weights: { ...A(3), ...B(2) } },
      { text: 'Dictionary', weights: M(4) },
      { text: 'Ask a teacher / parent / friend', weights: M(5) },
    ],
  },
  {
    id: 'photos-take', category: 'CHILDHOOD PHOTOS', emoji: '🎞️',
    question: 'How did you mostly take photos during your childhood?',
    answers: [
      { text: 'Smartphone', weights: { ...Z(2), ...A(3) } },
      { text: 'Digital camera', weights: { ...M(2), ...Z(1) } },
      { text: 'Film camera', weights: M(4) },
      { text: 'Someone else took photos at family functions 😂', weights: M(5) },
    ],
  },
  {
    id: 'message', category: 'IMPORTANT MESSAGES', emoji: '✉️',
    question: 'You needed to send an important message before smartphones. What would you most likely use?',
    answers: [
      { text: 'WhatsApp', weights: { ...Z(2), ...A(2) } },
      { text: 'SMS', weights: { ...M(2), ...Z(2) } },
      { text: 'Email', weights: M(3) },
      { text: 'Landline / handwritten note', weights: M(5) },
    ],
  },
  {
    id: 'plans', category: 'MAKING PLANS', emoji: '🗓️',
    question: 'Your friends want to meet tomorrow. How do you coordinate?',
    answers: [
      { text: 'WhatsApp group', weights: { ...Z(2), ...A(2) } },
      { text: 'Instagram / Discord', weights: { ...Z(3), ...A(2) } },
      { text: 'Phone calls / SMS', weights: M(3) },
      { text: 'Tell them today and trust everyone to show up 😂', weights: M(5) },
    ],
  },
  // ---- extra pool questions ----
  {
    id: 'cartoons', category: 'TV TIME', emoji: '📺',
    question: 'Which feels most like YOUR childhood TV?',
    answers: [
      { text: 'YouTube Kids / Cocomelon', weights: { ...A(4), ...B(1) } },
      { text: 'Pogo / Nickelodeon / Hungama', weights: Z(4) },
      { text: 'Cartoon Network + DD Sunday movies', weights: M(3) },
      { text: 'Whatever the one family TV was showing', weights: M(5) },
    ],
  },
  {
    id: 'internet', category: 'INTERNET', emoji: '💻',
    question: 'Your earliest internet memory?',
    answers: [
      { text: 'Always had Wi-Fi at home', weights: { ...A(4), ...B(1) } },
      { text: 'Broadband + Orkut / Facebook', weights: Z(4) },
      { text: 'Cyber cafe / dial-up / 2G packs', weights: M(4) },
      { text: 'Internet? We had imagination 😂', weights: M(5) },
    ],
  },
  {
    id: 'gaming', category: 'GAMING', emoji: '🎮',
    question: 'Your go-to game growing up?',
    answers: [
      { text: 'Roblox / Minecraft / Free Fire', weights: { ...A(3), ...Z(1) } },
      { text: 'Subway Surfers / PUBG / Ludo King', weights: Z(4) },
      { text: 'Contra / Mario / Road Rash on PC or console', weights: M(4) },
      { text: 'Gilli-danda / hide & seek / marbles', weights: M(5) },
    ],
  },
  {
    id: 'ringtone', category: 'PHONE VIBES', emoji: '📟',
    question: 'Which of these have you actually done?',
    answers: [
      { text: 'Screen-recorded a reel to share it', weights: { ...Z(2), ...A(2) } },
      { text: 'Set a caller tune from an ad jingle', weights: { ...M(2), ...Z(2) } },
      { text: 'Bought a ringtone / sent an SMS to a shortcode', weights: M(4) },
      { text: 'Rushed to pick up the landline before it stopped', weights: M(5) },
    ],
  },
  {
    id: 'homework', category: 'SCHOOL LIFE', emoji: '📚',
    question: 'How did you usually finish homework or projects?',
    answers: [
      { text: 'AI apps / YouTube explainers', weights: { ...A(3), ...B(1) } },
      { text: 'Google + Wikipedia copy-paste 😅', weights: Z(4) },
      { text: 'School library + guide books', weights: M(4) },
      { text: 'Copied from the topper’s notebook', weights: M(5) },
    ],
  },
  {
    id: 'money', category: 'POCKET MONEY', emoji: '💸',
    question: 'How did you pay for snacks growing up?',
    answers: [
      { text: 'UPI scan with parents’ phone', weights: { ...A(3), ...Z(1) } },
      { text: 'UPI / Paytm myself', weights: Z(4) },
      { text: 'Cash from pocket money', weights: M(4) },
      { text: 'Coins saved in a piggy bank / gullak', weights: M(5) },
    ],
  },
  {
    id: 'news', category: 'STAYING UPDATED', emoji: '📰',
    question: 'How do you mostly get your news now?',
    answers: [
      { text: 'Reels / YouTube Shorts', weights: { ...A(2), ...Z(2) } },
      { text: 'Twitter/X / Instagram pages', weights: Z(3) },
      { text: 'News apps / Google News', weights: { ...M(2), ...Z(1) } },
      { text: 'TV news / newspaper', weights: M(5) },
    ],
  },
  {
    id: 'travel', category: 'TRAIN TRAVEL', emoji: '🚆',
    question: 'Booking a train ticket growing up meant…',
    answers: [
      { text: 'Parents tap an app, done', weights: { ...A(3), ...Z(1) } },
      { text: 'IRCTC website at odd hours', weights: { ...M(2), ...Z(2) } },
      { text: 'Standing in the station queue', weights: M(5) },
      { text: 'A travel agent uncle handled it', weights: M(4) },
    ],
  },
  {
    id: 'camera', category: 'SELFIES', emoji: '🤳',
    question: 'Your relationship with the camera?',
    answers: [
      { text: 'Front camera since birth, basically', weights: { ...A(3), ...B(1) } },
      { text: 'Selfies + filters + stories', weights: Z(4) },
      { text: 'Digital camera on trips only', weights: M(3) },
      { text: 'One family photo a year, studio pose 😂', weights: M(5) },
    ],
  },
  {
    id: 'learning', category: 'LEARNING SKILLS', emoji: '🛠️',
    question: 'Want to learn something new (cooking, guitar, coding)? You…',
    answers: [
      { text: 'Watch a 60-second reel tutorial', weights: { ...A(2), ...Z(2) } },
      { text: 'YouTube deep-dive playlist', weights: Z(3) },
      { text: 'Online course / blog articles', weights: M(3) },
      { text: 'Ask someone who knows / take classes', weights: M(5) },
    ],
  },
  {
    id: 'shopping', category: 'SHOPPING', emoji: '🛍️',
    question: 'Festival clothes shopping growing up?',
    answers: [
      { text: 'Picked on apps, delivered home', weights: { ...Z(2), ...A(2) } },
      { text: 'Online + mall mix', weights: Z(3) },
      { text: 'Mall trip with family', weights: M(3) },
      { text: 'Local tailor + street market bargaining', weights: M(5) },
    ],
  },
  {
    id: 'cricket', category: 'CRICKET', emoji: '🏏',
    question: 'How did you follow live cricket scores?',
    answers: [
      { text: 'Reels / highlights only', weights: { ...A(2), ...Z(1) } },
      { text: 'Live streaming on phone', weights: Z(3) },
      { text: 'TV match + SMS score alerts', weights: M(3) },
      { text: 'Radio commentary / next-day newspaper', weights: M(5) },
    ],
  },
  {
    id: 'birthday', category: 'BIRTHDAYS', emoji: '🎂',
    question: 'How did friends wish you on your birthday?',
    answers: [
      { text: 'Instagram story shoutout / snap streak', weights: { ...Z(3), ...A(2) } },
      { text: 'WhatsApp group spam + cake emoji flood', weights: Z(3) },
      { text: 'Facebook wall posts', weights: M(3) },
      { text: 'Phone call or actually showing up 😂', weights: M(5) },
    ],
  },
  {
    id: 'maps', category: 'GETTING AROUND', emoji: '🗺️',
    question: 'Finding an address in a new area?',
    answers: [
      { text: 'Google Maps voice directions', weights: { ...Z(2), ...A(2) } },
      { text: 'Share live location on WhatsApp', weights: Z(3) },
      { text: 'Call the person 5 times for directions', weights: M(3) },
      { text: 'Ask every shopkeeper on the street', weights: M(5) },
    ],
  },
]

// ---- Result messages ----
// Keyed "official:vibe", with wildcard fallback "vibe:*". One is picked at random.
export const RESULT_MESSAGES: Record<string, string[]> = {
  'millennial:genz': [
    'You survived the cassette era but adapted suspiciously well to WhatsApp.',
    'Millennial by birth. Gen Z by vibe. The algorithm claims you.',
    'Orkut raised you, but Reels own you now.',
  ],
  'genz:millennial': [
    'Born Gen Z. Mentally stuck somewhere between Orkut and Instagram.',
    'You have the birth year of a digital native and the soul of a landline.',
    'Old-school energy detected in a Gen Z body. Respect.',
  ],
  'genalpha:*': [
    'You don’t remember a world without Wi-Fi.',
    'Future generation confirmed. Be kind to the cassette people.',
    'Born after 2013 and already beating everyone at this quiz.',
  ],
  'genbeta:*': [
    'Gen Beta?! This quiz is honoured to meet someone from the future.',
    'You’re so new, your generation is still in beta testing. 🚀',
  ],
  'millennial:millennial': [
    'You remember when buffering had a personality.',
    'Certified Millennial. You know what a landline is. Respect.',
    'Retro soul, fully intact. The tape recorder approves.',
  ],
  'genz:genz': [
    'Peak digital native. You think in 15-second videos.',
    'Gen Z through and through. Main character energy. 📱',
  ],
  'millennial:genalpha': [
    'You grew up rewinding cassettes with a pencil… and now you vibe like Wi-Fi was always there.',
    'A Millennial with Gen Alpha reflexes. The kids have influenced you.',
  ],
  'genz:genalpha': [
    'Gen Z outside, Gen Alpha inside. The future is rubbing off on you.',
    'Somewhere between reels and robots. Very 2020s of you.',
  ],
  '*:*': [
    'Your birth year says one thing. Your answers say another.',
    'Generations are just labels. Your vibe is your own.',
  ],
}

export function pickResultMessage(official: GenId, vibe: GenId): string {
  const specific = RESULT_MESSAGES[`${official}:${vibe}`]
  const wildcard = RESULT_MESSAGES[`${vibe}:*`]
  const generic = RESULT_MESSAGES['*:*']
  const pool = specific ?? wildcard ?? generic
  return pool[Math.floor(Math.random() * pool.length)]
}

// ---- Scoring ----
export interface ScoreBreakdown { gen: GenId; pct: number }

export function computeResult(questions: Question[], picks: number[]): { pct: Record<GenId, number>; breakdown: ScoreBreakdown[] } {
  const raw: Record<GenId, number> = { millennial: 0, genz: 0, genalpha: 0, genbeta: 0 }
  questions.forEach((q, i) => {
    const w = q.answers[picks[i]]?.weights ?? {}
    ;(Object.keys(w) as GenId[]).forEach(g => { raw[g] += w[g] ?? 0 })
  })
  const total = Object.values(raw).reduce((a, b) => a + b, 0) || 1
  // Normalize to whole percentages that sum to 100 (largest remainder)
  const exact = GENERATIONS.map(g => ({ gen: g.id, val: (raw[g.id] / total) * 100 }))
  const floors = exact.map(e => Math.floor(e.val))
  let remainder = 100 - floors.reduce((a, b) => a + b, 0)
  const order = exact.map((e, i) => ({ i, frac: e.val - Math.floor(e.val) })).sort((a, b) => b.frac - a.frac)
  order.forEach(o => { if (remainder > 0) { floors[o.i]++; remainder-- } })
  const pct = {} as Record<GenId, number>
  GENERATIONS.forEach((g, i) => { pct[g.id] = floors[i] })
  const breakdown = GENERATIONS.map(g => ({ gen: g.id, pct: pct[g.id] })).sort((a, b) => b.pct - a.pct)
  return { pct, breakdown }
}
