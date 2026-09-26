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
  { id: 'millennial', name: '90s Kids', emoji: '📼', from: 1981, to: 1996, vibe: 'Retro soul. Remembers dial-up tones.' },
  { id: 'genz',       name: '2K Kids',     emoji: '📱', from: 1997, to: 2012, vibe: 'Digital native. Fluent in reels.' },
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
  {
    id: 'ringtones', category: 'PHONE SOUNDS', emoji: '🔔',
    question: 'Your ringtone growing up was…',
    answers: [
      { text: 'Whatever came with the phone', weights: { ...A(2), ...Z(1) } },
      { text: 'A downloaded MP3 / caller tune', weights: { ...M(2), ...Z(2) } },
      { text: 'Nokia tune / monotone beeps', weights: M(4) },
      { text: 'The landline\'s tring-tring', weights: M(5) },
    ],
  },
  {
    id: 'video-games', category: 'VIDEO GAMES', emoji: '👾',
    question: 'Your first gaming experience?',
    answers: [
      { text: 'Phone / tablet since forever', weights: { ...A(3), ...Z(1) } },
      { text: 'Mobile games on touchscreens', weights: Z(4) },
      { text: 'TV video game with cassettes', weights: M(4) },
      { text: 'Video game parlour with coins', weights: M(5) },
    ],
  },
  {
    id: 'whatsapp-dp', category: 'PROFILE PICTURES', emoji: '🖼️',
    question: 'Your first profile picture anywhere was…',
    answers: [
      { text: 'A selfie, obviously', weights: { ...A(3), ...Z(2) } },
      { text: 'Filtered selfie / cartoon DP', weights: Z(4) },
      { text: 'A cringey edited photo with frame', weights: M(4) },
      { text: 'You didn\'t have a profile picture', weights: M(5) },
    ],
  },
  {
    id: 'snacks', category: 'SNACKS', emoji: '🍬',
    question: 'The snack that takes you straight back to childhood?',
    answers: [
      { text: 'Delivery apps / cloud kitchen food', weights: { ...A(2), ...Z(2) } },
      { text: 'Lays / Kurkure with Frooti', weights: Z(3) },
      { text: 'Kismi / Hajmola candy / éclairs', weights: M(4) },
      { text: '5-rupee mixture from the kirana shop', weights: M(5) },
    ],
  },
  {
    id: 'school-tech', category: 'SCHOOL TECH', emoji: '🖥️',
    question: 'Computer class at school meant…',
    answers: [
      { text: 'Smart boards / tablets in class', weights: { ...A(3), ...Z(1) } },
      { text: 'Smart class projectors', weights: Z(3) },
      { text: 'Windows XP PCs, paint and typing', weights: M(4) },
      { text: 'Only one computer lab in the whole school', weights: M(5) },
    ],
  },
  {
    id: 'birthday-gifts', category: 'BIRTHDAYS', emoji: '🎁',
    question: 'A typical birthday gift you got or gave?',
    answers: [
      { text: 'Ordered online last minute', weights: { ...Z(2), ...A(2) } },
      { text: 'Gift cards / UPI money transfer', weights: Z(3) },
      { text: 'Archies cards + perfume sets', weights: M(4) },
      { text: 'Nothing — mithai and blessings were enough', weights: M(5) },
    ],
  },
  {
    id: 'song-dedication', category: 'MUSIC SHOWS', emoji: '🎤',
    question: 'Requesting your favourite song on TV/radio?',
    answers: [
      { text: 'What\'s a song request?', weights: { ...A(3), ...Z(1) } },
      { text: 'YouTube comments / requests', weights: Z(3) },
      { text: 'SMS to music channels', weights: M(3) },
      { text: 'Waiting hours for it on TV countdowns', weights: M(5) },
    ],
  },
  {
    id: 'exam-results', category: 'EXAM RESULTS', emoji: '📊',
    question: 'Checking your board exam results?',
    answers: [
      { text: 'Instant app / website notification', weights: { ...A(2), ...Z(2) } },
      { text: 'Refreshing a website nervously', weights: Z(3) },
      { text: 'IVR phone call / SMS', weights: M(3) },
      { text: 'Newspaper / school notice board', weights: M(5) },
    ],
  },
  {
    id: 'family-calls', category: 'FAMILY', emoji: '👨‍👩‍👧',
    question: 'Weekly call with grandparents?',
    answers: [
      { text: 'Video call on WhatsApp', weights: { ...Z(2), ...A(2) } },
      { text: 'Phone call when you remember', weights: Z(3) },
      { text: 'STD calls on Sundays', weights: M(3) },
      { text: 'Letters / meet only on festivals', weights: M(5) },
    ],
  },
  {
    id: 'summer-holidays', category: 'HOLIDAYS', emoji: '🌞',
    question: 'Summer holidays as a kid meant…',
    answers: [
      { text: 'Screen time and AC rooms', weights: { ...A(2), ...Z(2) } },
      { text: 'YouTube marathons', weights: Z(3) },
      { text: 'Cartoons + board games + terrace games', weights: M(3) },
      { text: 'Visiting nani\'s house, zero plans', weights: M(5) },
    ],
  },
  {
    id: 'horoscope', category: 'SUPERSTITIONS', emoji: '🔮',
    question: 'Astro Uncle / daily horoscope — your take?',
    answers: [
      { text: 'Astrology apps with notifications', weights: { ...A(2), ...Z(2) } },
      { text: 'Instagram astro memes', weights: Z(3) },
      { text: 'Watched it on TV sometimes', weights: M(3) },
      { text: 'Rashifpal in the morning newspaper', weights: M(5) },
    ],
  },
  {
    id: 'tiffin', category: 'SCHOOL TIFFIN', emoji: '🍱',
    question: 'Your tiffin swap strategy?',
    answers: [
      { text: 'Ordered canteen food online', weights: A(4) },
      { text: 'Canteen + shared snacks', weights: Z(3) },
      { text: 'Swapping parathas for Maggi', weights: M(4) },
      { text: 'Home food, no complaints', weights: M(5) },
    ],
  },
  {
    id: 'recharge', category: 'MOBILE RECHARGE', emoji: '📶',
    question: 'Getting your mobile recharged?',
    answers: [
      { text: 'Auto-recharge, never think about it', weights: { ...A(2), ...Z(2) } },
      { text: 'UPI apps in seconds', weights: Z(3) },
      { text: 'Scratch cards / recharge shops', weights: M(4) },
      { text: 'Asking parents for their phone first', weights: M(3) },
    ],
  },
  {
    id: 'photocopy', category: 'STUDY MATERIAL', emoji: '📄',
    question: 'Notes before exams came from…',
    answers: [
      { text: 'Shared Google Drive / PDFs', weights: { ...Z(2), ...A(2) } },
      { text: 'WhatsApp forwarded PDFs', weights: Z(3) },
      { text: 'Xerox shop + guide books', weights: M(4) },
      { text: 'Copying from the class topper', weights: M(5) },
    ],
  },
  {
    id: 'tv-remote', category: 'TV BATTLES', emoji: '📺',
    question: 'Who controlled the TV remote at home?',
    answers: [
      { text: 'Everyone has their own screen', weights: { ...A(3), ...Z(1) } },
      { text: 'Fought over YouTube vs TV', weights: Z(3) },
      { text: 'Dad\'s news, no negotiation', weights: M(3) },
      { text: 'One TV = one channel, dad\'s word final', weights: M(5) },
    ],
  },
  {
    id: 'chores', category: 'HELP AT HOME', emoji: '🧹',
    question: 'Being sent to buy things from the shop?',
    answers: [
      { text: 'Order everything online', weights: { ...Z(2), ...A(2) } },
      { text: 'Quick app order', weights: Z(3) },
      { text: 'Go with a written list', weights: M(4) },
      { text: 'Memorise the list + exact change', weights: M(5) },
    ],
  },
  {
    id: 'music-copy', category: 'MUSIC SHARING', emoji: '💾',
    question: 'Getting a new song to your device?',
    answers: [
      { text: 'Stream it instantly', weights: { ...Z(2), ...A(2) } },
      { text: 'Download via apps', weights: Z(3) },
      { text: 'Bluetooth / SD card from friends', weights: M(4) },
      { text: 'Record it from the radio/TV', weights: M(5) },
    ],
  },
  {
    id: 'otp', category: 'BANKING', emoji: '🏦',
    question: 'Banking as you grew up?',
    answers: [
      { text: 'UPI for everything since day one', weights: { ...A(2), ...Z(2) } },
      { text: 'Net banking + UPI', weights: Z(3) },
      { text: 'ATM + branch visits', weights: M(3) },
      { text: 'Bank passbook + long queues', weights: M(5) },
    ],
  },
  {
    id: 'festivals-wishes', category: 'FESTIVALS', emoji: '🪔',
    question: 'Diwali wishes to relatives?',
    answers: [
      { text: 'Instagram story with everyone tagged', weights: { ...Z(3), ...A(2) } },
      { text: 'WhatsApp forward with diyas GIF', weights: Z(4) },
      { text: 'SMS to all contacts', weights: M(3) },
      { text: 'Phone calls, one by one', weights: M(5) },
    ],
  },
  {
    id: 'cabs', category: 'TRAVEL', emoji: '🚕',
    question: 'Going somewhere in the city?',
    answers: [
      { text: 'Booked a cab / auto app', weights: { ...Z(2), ...A(2) } },
      { text: 'Ola / Uber on parents\' phone', weights: Z(3) },
      { text: 'Shared autos + buses', weights: M(3) },
      { text: 'Family scooter or cycle', weights: M(5) },
    ],
  },
  {
    id: 'movie-tickets', category: 'MOVIE PLANS', emoji: '🎟️',
    question: 'Booking movie tickets?',
    answers: [
      { text: 'App booking, recliner seats', weights: { ...Z(2), ...A(2) } },
      { text: 'Online + snacks combo', weights: Z(3) },
      { text: 'Counter queue on release day', weights: M(4) },
      { text: 'Black tickets outside theatre 😅', weights: M(5) },
    ],
  },
  {
    id: 'passwords', category: 'ACCOUNTS', emoji: '🔑',
    question: 'Your first online account password was…',
    answers: [
      { text: 'Generated by a password manager', weights: { ...A(3), ...Z(1) } },
      { text: 'One strong password everywhere', weights: Z(3) },
      { text: 'Your name + 123', weights: M(3) },
      { text: 'Your pet\'s name or roll number', weights: M(5) },
    ],
  },
  {
    id: 'new-word', category: 'LEARNING', emoji: '🗣️',
    question: 'Hearing a new slang word, you…',
    answers: [
      { text: 'Already know it, used it yesterday', weights: { ...A(2), ...Z(2) } },
      { text: 'Urban Dictionary / reels', weights: Z(3) },
      { text: 'Google it quietly', weights: { ...M(2), ...Z(1) } },
      { text: 'Ask a younger cousin', weights: M(4) },
    ],
  },
  {
    id: 'alarm', category: 'MORNINGS', emoji: '⏰',
    question: 'Waking up for school meant…',
    answers: [
      { text: 'Phone alarm x5 snoozes', weights: { ...Z(2), ...A(2) } },
      { text: 'Phone alarm', weights: Z(3) },
      { text: 'Alarm clock on the cupboard', weights: M(4) },
      { text: 'Mom\'s voice, no snooze option', weights: M(5) },
    ],
  },
  {
    id: 'weekend-plans', category: 'WEEKENDS', emoji: '🎯',
    question: 'Weekend plans with friends?',
    answers: [
      { text: 'Decided 10 min before, on chat', weights: { ...Z(2), ...A(2) } },
      { text: 'Mall + movie + food', weights: Z(3) },
      { text: 'Park / ground + junk food', weights: M(3) },
      { text: 'No plans — cycles and gully cricket', weights: M(5) },
    ],
  },
  {
    id: 'wallpaper', category: 'CUSTOMISATION', emoji: '🎨',
    question: 'Your phone wallpaper history?',
    answers: [
      { text: 'Aesthetic Pinterest wallpapers', weights: { ...Z(3), ...A(1) } },
      { text: 'Selfies / memes', weights: Z(3) },
      { text: 'Free wallpaper packs / Zedge', weights: M(3) },
      { text: 'Default wallpaper, always', weights: M(5) },
    ],
  },
  {
    id: 'calling-cards', category: 'PHONE CARDS', emoji: '💳',
    question: 'Ever used a phone card or coupon?',
    answers: [
      { text: 'Coupons from food apps', weights: { ...Z(2), ...A(2) } },
      { text: 'E-vouchers', weights: Z(3) },
      { text: 'Recharge coupons / gift vouchers', weights: M(3) },
      { text: 'Phone cards from the kirana shop', weights: M(5) },
    ],
  },
  {
    id: 'voice-messages', category: 'TALKING', emoji: '🎙️',
    question: 'Long conversations happen via…',
    answers: [
      { text: 'Voice notes / disappearing chats', weights: { ...A(3), ...Z(2) } },
      { text: 'Calls or voice notes', weights: Z(3) },
      { text: 'Long SMS threads', weights: M(4) },
      { text: 'Actual long phone calls', weights: M(4) },
    ],
  },
  {
    id: 'comics', category: 'READING', emoji: '📚',
    question: 'Comics and books growing up?',
    answers: [
      { text: 'Webtoons / e-books', weights: { ...A(3), ...Z(1) } },
      { text: 'PDFs and fan fiction', weights: Z(3) },
      { text: 'Champak / Tinkle / Chacha Chaudhary', weights: M(4) },
      { text: 'Library books only in exams', weights: M(5) },
    ],
  },
  {
    id: 'gps-vs-directions', category: 'DIRECTIONS', emoji: '🧭',
    question: 'You trust ___ to reach anywhere?',
    answers: [
      { text: 'Maps blindly, even for the corner shop', weights: { ...Z(2), ...A(2) } },
      { text: 'Maps mostly', weights: Z(3) },
      { text: 'Maps + local knowledge', weights: { ...M(2), ...Z(1) } },
      { text: 'Landmarks: "turn at the big peepal tree"', weights: M(5) },
    ],
  },
  {
    id: 'status-updates', category: 'SOCIAL MEDIA', emoji: '💬',
    question: 'Your first social media status was…',
    answers: [
      { text: 'A story or reel', weights: { ...Z(3), ...A(1) } },
      { text: 'A Facebook/Instagram post', weights: Z(4) },
      { text: 'An Orkut scrap / hi5 post', weights: M(4) },
      { text: 'No status — SMS forwards were enough', weights: M(5) },
    ],
  },
  {
    id: 'cloud', category: 'FILES', emoji: '☁️',
    question: 'Where do your photos live?',
    answers: [
      { text: 'Cloud, auto-synced forever', weights: { ...A(3), ...Z(1) } },
      { text: 'Google Photos / cloud', weights: Z(3) },
      { text: 'Laptop folders + pen drives', weights: M(4) },
      { text: 'Photo albums in the cupboard', weights: M(5) },
    ],
  },
  {
    id: 'momos', category: 'STREET FOOD', emoji: '🥟',
    question: 'Street food hangouts?',
    answers: [
      { text: 'Cloud kitchens on apps', weights: { ...A(2), ...Z(1) } },
      { text: 'Momo / momos delivery', weights: Z(3) },
      { text: 'Chaat bhaiya and momo stalls', weights: M(3) },
      { text: 'Golgappa bhaiya with exact change', weights: M(5) },
    ],
  },
  {
    id: 'screen-time', category: 'DAILY HABITS', emoji: '⏳',
    question: 'Your daily screen time report would say…',
    answers: [
      { text: '8+ hours, multitasking apps', weights: { ...A(3), ...Z(2) } },
      { text: '5-8 hours, mostly social', weights: Z(4) },
      { text: '2-4 hours, controlled', weights: M(3) },
      { text: 'What screen? TV was the only screen', weights: M(5) },
    ],
  },
  {
    id: 'relationship-status', category: 'DRAMA', emoji: '💔',
    question: 'Relationship drama unfolded on…',
    answers: [
      { text: 'Close friends story / private chats', weights: { ...A(2), ...Z(2) } },
      { text: 'Vague posts everyone screenshots', weights: Z(3) },
      { text: 'Facebook relationship status', weights: M(4) },
      { text: 'Gossip after school, face to face', weights: M(5) },
    ],
  },
  {
    id: 'school-bags', category: 'SCHOOL LIFE', emoji: '🎒',
    question: 'Your school bag had…',
    answers: [
      { text: 'Tablet + QR-coded books', weights: A(4) },
      { text: 'Laptop + heavy books', weights: Z(3) },
      { text: 'Books wrapped in brown paper', weights: M(4) },
      { text: 'Steel tiffin + compass box + cloth bag', weights: M(5) },
    ],
  },
  {
    id: 'doordarshan', category: 'TV MEMORIES', emoji: '📡',
    question: 'Sunday afternoon TV meant…',
    answers: [
      { text: 'YouTube on the big screen', weights: { ...Z(2), ...A(2) } },
      { text: 'Reruns + phone scrolling', weights: Z(3) },
      { text: 'DD National serials / movies', weights: M(4) },
      { text: 'The rotating DD logo + antenna fixing', weights: M(5) },
    ],
  },
  {
    id: 'qr-menu', category: 'EATING OUT', emoji: '🍽️',
    question: 'Ordering at a restaurant today?',
    answers: [
      { text: 'QR code menu, pay by UPI', weights: { ...Z(2), ...A(2) } },
      { text: 'Zomato/Swiggy even inside restaurants', weights: Z(3) },
      { text: 'Menu card, waiter takes order', weights: M(4) },
      { text: 'Dhaba-style: point at the pot, pay cash', weights: M(5) },
    ],
  },
  {
    id: 'friend-groups', category: 'FRIENDSHIP', emoji: '👯',
    question: 'Your friend group name was decided on…',
    answers: [
      { text: 'An inside joke in a private chat', weights: { ...Z(3), ...A(1) } },
      { text: 'A WhatsApp group name poll', weights: Z(4) },
      { text: 'Orkut community / SMS group', weights: M(4) },
      { text: 'No name — "the colony gang" was enough', weights: M(5) },
    ],
  },
  {
    id: 'typing-style', category: 'TEXTING', emoji: '⌨️',
    question: 'Your texting style?',
    answers: [
      { text: 'short. lowercase. no punctuation', weights: { ...Z(3), ...A(2) } },
      { text: 'Full words + emojis 😂', weights: Z(3) },
      { text: 'Txt spcl lyk dis 2 save bal', weights: M(4) },
      { text: 'Full SMS grammar with capital letters', weights: M(5) },
    ],
  },
  {
    id: 'wedding-invites', category: 'INVITATIONS', emoji: '💌',
    question: 'Wedding invites reach you via…',
    answers: [
      { text: 'Instagram save-the-date reels', weights: { ...A(2), ...Z(2) } },
      { text: 'WhatsApp PDF invite', weights: Z(3) },
      { text: 'Printed card, hand-delivered', weights: M(4) },
      { text: 'Word of mouth + family network', weights: M(5) },
    ],
  },
  {
    id: 'kite-festival', category: 'SEASONS', emoji: '🪁',
    question: 'Sankranti / kite flying with friends?',
    answers: [
      { text: 'Watched reels of kites', weights: { ...A(2), ...Z(1) } },
      { text: 'Clicked photos, flew a bit', weights: Z(3) },
      { text: 'Terrace all day, cut neighbours\' kites', weights: M(4) },
      { text: 'Manjha battles till sundown, glass-coated', weights: M(5) },
    ],
  },
  {
    id: 'status-symbol', category: 'GADGETS', emoji: '📱',
    question: 'The coolest phone feature back then?',
    answers: [
      { text: 'AI everything / 120Hz screen', weights: { ...A(3), ...Z(1) } },
      { text: 'Camera + gaming', weights: Z(3) },
      { text: 'Color screen + polyphonic ringtones', weights: M(4) },
      { text: 'Snake + torch + interchangeable covers', weights: M(5) },
    ],
  },
  {
    id: 'bus-rides', category: 'TRAVEL', emoji: '🚌',
    question: 'Music on a long bus/train ride?',
    answers: [
      { text: 'Playlists downloaded for offline', weights: { ...Z(2), ...A(2) } },
      { text: 'Streaming with earphones', weights: Z(3) },
      { text: 'Shared earphone, one device', weights: M(4) },
      { text: 'Window seat + scenery + antakshari', weights: M(5) },
    ],
  },
  {
    id: 'groups-forward', category: 'FORWARDS', emoji: '➡️',
    question: 'Good morning messages in family groups?',
    answers: [
      { text: 'Muted the group ages ago', weights: { ...Z(3), ...A(2) } },
      { text: 'React with emojis, no typing', weights: Z(3) },
      { text: 'Forward the forward 😅', weights: M(3) },
      { text: 'You are the one sending them', weights: M(4) },
    ],
  },
  {
    id: 'video-calls', category: 'CALLING', emoji: '📹',
    question: 'Your first video call?',
    answers: [
      { text: 'Literally in primary school', weights: { ...A(3), ...Z(1) } },
      { text: 'Skype / Duo era', weights: Z(3) },
      { text: 'Webcam on a desktop, carefully planned', weights: M(4) },
      { text: 'Video call? We had one landline', weights: M(5) },
    ],
  },
  {
    id: 'meme-origin', category: 'HUMOUR', emoji: '😆',
    question: 'Your meme diet today?',
    answers: [
      { text: 'Trending reels within minutes', weights: { ...A(3), ...Z(2) } },
      { text: 'Meme pages + forwards', weights: Z(3) },
      { text: 'Forwards from family groups', weights: M(4) },
      { text: 'Jokes told in person, word of mouth', weights: M(5) },
    ],
  },
  {
    id: 'school-projects', category: 'PROJECTS', emoji: '🧪',
    question: 'Science fair project making?',
    answers: [
      { text: 'AI-generated designs + 3D print', weights: { ...A(3), ...Z(1) } },
      { text: 'YouTube tutorial + Amazon parts', weights: Z(3) },
      { text: 'Thermocol models + chart paper', weights: M(4) },
      { text: 'Dad made it the night before', weights: M(5) },
    ],
  },
  {
    id: 'games-outside', category: 'PLAYTIME', emoji: '🛝',
    question: 'Evening playtime growing up?',
    answers: [
      { text: 'Online games with school friends', weights: { ...A(2), ...Z(2) } },
      { text: 'Football/cricket + hangouts', weights: Z(3) },
      { text: 'Hide & seek, lock & key, pithu', weights: M(4) },
      { text: 'Until street lights came on', weights: M(5) },
    ],
  },
  {
    id: 'otp-share', category: 'DIGITAL SAFETY', emoji: '🛡️',
    question: 'Your take on sharing OTPs?',
    answers: [
      { text: 'Never. Scam-awareness certified', weights: { ...Z(2), ...A(2) } },
      { text: 'Suspicious of everything', weights: Z(3) },
      { text: 'Learnt after one mistake', weights: M(3) },
      { text: 'What\'s an OTP?', weights: M(5) },
    ],
  },
  {
    id: 'playlist', category: 'PLAYLISTS', emoji: '🎧',
    question: 'Who made your music playlists?',
    answers: [
      { text: 'AI-curated mixes', weights: { ...A(3), ...Z(1) } },
      { text: 'Curated my own on Spotify', weights: Z(3) },
      { text: 'Handpicked folders + Winamp', weights: M(4) },
      { text: 'Radio DJ\'s choices were final', weights: M(5) },
    ],
  },
  {
    id: 'textbooks', category: 'BOOKS', emoji: '📕',
    question: 'New academic year shopping?',
    answers: [
      { text: 'Everything digital on a tablet', weights: A(4) },
      { text: 'Online bookstores + deliveries', weights: Z(3) },
      { text: 'Book binders + brown paper covering', weights: M(4) },
      { text: 'Second-hand books + name on first page', weights: M(5) },
    ],
  },
  {
    id: 'friendship-bands', category: 'FRIENDSHIP DAY', emoji: '🎗️',
    question: 'Friendship Day meant…',
    answers: [
      { text: 'Stories with bestie photos', weights: { ...Z(3), ...A(1) } },
      { text: 'WhatsApp wishes', weights: Z(3) },
      { text: 'Bands on wrists + Archies cards', weights: M(4) },
      { text: 'Exchanging homemade cards', weights: M(5) },
    ],
  },
  {
    id: 'wifi-password', category: 'HOME', emoji: '🏠',
    question: 'The Wi-Fi password at home is…',
    answers: [
      { text: 'Printed on the router, scanned by guests', weights: { ...A(2), ...Z(1) } },
      { text: 'Given on request, changed yearly', weights: Z(3) },
      { text: 'Family secret, shared carefully', weights: M(3) },
      { text: 'There was no Wi-Fi. Shared 2G data', weights: M(5) },
    ],
  },
  {
    id: 'annoying-ads', category: 'ADS', emoji: '📢',
    question: 'Ads you still remember word-for-word?',
    answers: [
      { text: 'Skip in 5… skip in 5…', weights: { ...Z(3), ...A(2) } },
      { text: 'App ads everywhere', weights: Z(3) },
      { text: 'TV jingles (Amul, Nirma, Fevicol)', weights: M(5) },
      { text: 'Radio spots + newspaper classifieds', weights: M(5) },
    ],
  },
  {
    id: 'fan-mail', category: 'FANDOM', emoji: '⭐',
    question: 'Showing love to your favourite star?',
    answers: [
      { text: 'Fan edits, fan pages, streaming parties', weights: { ...Z(3), ...A(2) } },
      { text: 'Following everything online', weights: Z(3) },
      { text: 'Poster on wall + audio cassettes', weights: M(4) },
      { text: 'Cuttings from film magazines', weights: M(5) },
    ],
  },
  {
    id: 'lunch-break', category: 'SCHOOL TIME', emoji: '🕛',
    question: 'Lunch break entertainment?',
    answers: [
      { text: 'Phones under the desk', weights: { ...A(2), ...Z(2) } },
      { text: 'Charging phones in class 😅', weights: Z(3) },
      { text: 'Tazos, trump cards, WWE cards', weights: M(4) },
      { text: 'Antakshari + pen fights', weights: M(5) },
    ],
  },
  {
    id: 'online-shopping', category: 'SHOPPING APPS', emoji: '📦',
    question: 'Your first online order?',
    answers: [
      { text: 'Can\'t even remember, it\'s that normal', weights: { ...A(3), ...Z(2) } },
      { text: 'Flipkart/Amazon early days', weights: Z(3) },
      { text: 'COD with nervous doorbell wait', weights: M(4) },
      { text: 'Catalogue shopping or none', weights: M(5) },
    ],
  },
  {
    id: 'rainy-day', category: 'MONSOON', emoji: '🌧️',
    question: 'A rainy day at home meant…',
    answers: [
      { text: 'Binge watch + snacks delivery', weights: { ...Z(2), ...A(2) } },
      { text: 'Movies + pakoras', weights: Z(3) },
      { text: 'Paper boats + pakoras', weights: M(4) },
      { text: 'Hot chai + radio + balcony watching', weights: M(5) },
    ],
  },
  {
    id: 'nicknames', category: 'IDENTITY', emoji: '🏷️',
    question: 'Your online identity was…',
    answers: [
      { text: 'Clean handle, real name', weights: { ...A(2), ...Z(2) } },
      { text: 'Aesthetic username', weights: Z(3) },
      { text: 'coolboy_raj_1995 / sweetchick_07', weights: M(4) },
      { text: 'First pet + favourite number', weights: M(5) },
    ],
  },
  {
    id: 'health-app', category: 'HEALTH', emoji: '💪',
    question: 'Tracking your fitness?',
    answers: [
      { text: 'Smartwatch + health app everything', weights: { ...A(3), ...Z(1) } },
      { text: 'Gym selfies + apps', weights: Z(3) },
      { text: 'Morning walk when guilty', weights: M(3) },
      { text: 'Running behind the school bus was cardio', weights: M(5) },
    ],
  },
  {
    id: 'travel-booking', category: 'TRIPS', emoji: '🧳',
    question: 'Planning a family trip?',
    answers: [
      { text: 'AI itinerary + instant booking', weights: { ...A(3), ...Z(1) } },
      { text: 'Google + apps + reviews', weights: Z(3) },
      { text: 'Travel agent + uncle\'s recommendations', weights: M(4) },
      { text: 'Relatives\' house was the trip', weights: M(5) },
    ],
  },
  {
    id: 'group-projects', category: 'TEAMWORK', emoji: '👨‍💻',
    question: 'Group assignments with friends?',
    answers: [
      { text: 'Shared docs, live editing', weights: { ...A(3), ...Z(2) } },
      { text: 'Google Docs + meet links', weights: Z(3) },
      { text: 'Meet at someone\'s house with one laptop', weights: M(4) },
      { text: 'Divide pages, copy, staple', weights: M(5) },
    ],
  },
  {
    id: 'salary-day', category: 'MONEY', emoji: '💰',
    question: 'Your first pocket money/allowance?',
    answers: [
      { text: 'UPI transfer from parents', weights: { ...A(3), ...Z(1) } },
      { text: 'Bank transfer + UPI', weights: Z(3) },
      { text: 'Cash, on good behaviour', weights: M(4) },
      { text: 'Festivals = only payday', weights: M(5) },
    ],
  },
  {
    id: 'speech', category: 'PRESENTATIONS', emoji: '🗣️',
    question: 'A school/college presentation today?',
    answers: [
      { text: 'AI slides + speaker notes', weights: { ...A(3), ...Z(1) } },
      { text: 'Canva + templates', weights: Z(3) },
      { text: 'PowerPoint + clipart galore', weights: M(4) },
      { text: 'Charts on chart paper + markers', weights: M(5) },
    ],
  },
  {
    id: 'queue', category: 'WAITING', emoji: '🎢',
    question: 'Waiting in a long queue (temple, tickets, school)?',
    answers: [
      { text: 'Scroll reels, time flies', weights: { ...A(2), ...Z(2) } },
      { text: 'Phone games + music', weights: Z(3) },
      { text: 'SMS or Snake on Nokia', weights: M(4) },
      { text: 'Observed people, made up stories', weights: M(5) },
    ],
  },
  {
    id: 'sticker-packs', category: 'EXPRESSING', emoji: '😜',
    question: 'Your emoji/sticker game?',
    answers: [
      { text: 'Custom sticker packs + GIFs', weights: { ...A(2), ...Z(2) } },
      { text: 'Emojis do the talking 😂', weights: Z(3) },
      { text: ':) and :D era', weights: M(4) },
      { text: 'Actual words. Full sentences.', weights: M(4) },
    ],
  },
  {
    id: 'fan-theories', category: 'MOVIES', emoji: '🍿',
    question: 'After a big movie release?',
    answers: [
      { text: 'Instant reviews + fan theories on YouTube', weights: { ...A(2), ...Z(2) } },
      { text: 'Memes first, movie later', weights: Z(3) },
      { text: 'Wait for reviews, then theatre', weights: M(3) },
      { text: 'Listen to songs on cassette till release', weights: M(5) },
    ],
  },
  {
    id: 'recycling', category: 'OLD STUFF', emoji: '🗄️',
    question: 'Old gadgets at your home became…',
    answers: [
      { text: 'Sold on resale apps', weights: { ...Z(2), ...A(2) } },
      { text: 'Given away / recycled', weights: Z(3) },
      { text: 'Kept in a drawer "just in case"', weights: M(4) },
      { text: 'Passed down like family treasure', weights: M(5) },
    ],
  },
  {
    id: 'new-year', category: 'NEW YEAR', emoji: '🎆',
    question: 'New Year\'s Eve celebration?',
    answers: [
      { text: 'Stories, countdown livestreams', weights: { ...A(2), ...Z(2) } },
      { text: 'House party / club', weights: Z(3) },
      { text: 'TV countdown + family', weights: M(4) },
      { text: 'Sleep by 10, it\'s just a date', weights: M(5) },
    ],
  },
  {
    id: 'lost-phone', category: 'FEARS', emoji: '😱',
    question: 'Your phone dying/lost feels like…',
    answers: [
      { text: 'End of the world, everything\'s there', weights: { ...A(3), ...Z(2) } },
      { text: 'Major panic attack', weights: Z(3) },
      { text: 'Annoying but manageable', weights: M(3) },
      { text: 'Peaceful, actually', weights: M(4) },
    ],
  },
  {
    id: 'tuitions', category: 'EXTRA CLASSES', emoji: '➕',
    question: 'Tuition/coaching memories?',
    answers: [
      { text: 'Online classes + recorded lectures', weights: { ...A(3), ...Z(1) } },
      { text: 'Coaching institute + test series apps', weights: Z(3) },
      { text: 'Guruji\'s house, wooden bench', weights: M(4) },
      { text: 'Neighbour uncle taught for free', weights: M(5) },
    ],
  },
  {
    id: 'dance', category: 'DANCE', emoji: '💃',
    question: 'Learning a new dance step?',
    answers: [
      { text: '15-second tutorial on loop', weights: { ...A(2), ...Z(2) } },
      { text: 'YouTube choreography videos', weights: Z(3) },
      { text: 'Copied the hero step from movies', weights: M(4) },
      { text: 'Weddings were dance school', weights: M(5) },
    ],
  },
  {
    id: 'post-office', category: 'COMMUNICATION', emoji: '🏤',
    question: 'Ever visited a post office?',
    answers: [
      { text: 'Never — what\'s a post office?', weights: { ...A(3), ...Z(1) } },
      { text: 'Once, for passport work', weights: Z(3) },
      { text: 'For money orders / speed post', weights: M(4) },
      { text: 'Regular: inland letters + stamps', weights: M(5) },
    ],
  },
  {
    id: 'smart-home', category: 'HOME TECH', emoji: '🏠',
    question: 'Gadgets around your house?',
    answers: [
      { text: 'Smart lights, speakers, everything talks', weights: { ...A(3), ...Z(1) } },
      { text: 'Smart TV + Alexa sometimes', weights: Z(3) },
      { text: 'One TV, one fridge, zero smart', weights: M(4) },
      { text: 'Radio + ceiling fan = technology', weights: M(5) },
    ],
  },
  {
    id: 'bike', category: 'FIRST RIDE', emoji: '🏍️',
    question: 'Your first personal ride?',
    answers: [
      { text: 'Scooty with Bluetooth helmet', weights: { ...A(2), ...Z(1) } },
      { text: 'Activa / bike with phone mount', weights: Z(3) },
      { text: 'Bike with a fuel gauge you tapped', weights: M(4) },
      { text: 'Bicycle with a carrier + ring bell', weights: M(5) },
    ],
  },
  {
    id: 'typing-speed', category: 'SKILLS', emoji: '⚡',
    question: 'Your typing skills came from…',
    answers: [
      { text: 'Born typing on touchscreens', weights: { ...A(3), ...Z(1) } },
      { text: 'Chatting + gaming', weights: Z(3) },
      { text: 'MS Word assignments + Yahoo chat', weights: M(4) },
      { text: 'Typewriter tuition (yes, really)', weights: M(5) },
    ],
  },
  {
    id: 'mela', category: 'FAIRS', emoji: '🎡',
    question: 'Mela / exhibition trips meant…',
    answers: [
      { text: 'Instagram-worthy pics first', weights: { ...Z(3), ...A(1) } },
      { text: 'Street food + selfies', weights: Z(3) },
      { text: 'Giant wheel + jalebi', weights: M(4) },
      { text: 'Held dad\'s hand, lost in the crowd anyway', weights: M(5) },
    ],
  },
  {
    id: 'sick-day', category: 'SICK LEAVE', emoji: '🤒',
    question: 'A sick day at home looked like…',
    answers: [
      { text: 'Streaming marathons in bed', weights: { ...A(2), ...Z(2) } },
      { text: 'YouTube + soup', weights: Z(3) },
      { text: 'Cartoon network + soup', weights: M(4) },
      { text: 'Dadi\'s kadha + one TV channel', weights: M(5) },
    ],
  },
  {
    id: 'captions', category: 'POSTING', emoji: '✍️',
    question: 'Writing a caption for a post?',
    answers: [
      { text: 'AI writes it, I approve', weights: { ...A(3), ...Z(1) } },
      { text: 'Spend 10 min, delete, rewrite', weights: Z(3) },
      { text: '"Nice pic", "good one" era', weights: M(3) },
      { text: 'No captions — albums spoke for themselves', weights: M(5) },
    ],
  },
];

// ---- Result messages ----
// Keyed "official:vibe", with wildcard fallback "vibe:*". One is picked at random.
export const RESULT_MESSAGES: Record<string, string[]> = {
  'millennial:genz': [
    'You survived the cassette era but adapted suspiciously well to WhatsApp.',
    '90s kid by birth. 2K kid by vibe. The algorithm claims you.',
    'Orkut raised you, but Reels own you now.',
  ],
  'genz:millennial': [
    'Born 2K kid. Mentally stuck somewhere between Orkut and Instagram.',
    'You have the birth year of a digital native and the soul of a landline.',
    'Old-school energy detected in a 2K kid body. Respect.',
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
    'Certified 90s kid. You know what a landline is. Respect.',
    'Retro soul, fully intact. The tape recorder approves.',
  ],
  'genz:genz': [
    'Peak digital native. You think in 15-second videos.',
    '2K kid through and through. Main character energy. 📱',
  ],
  'millennial:genalpha': [
    'You grew up rewinding cassettes with a pencil… and now you vibe like Wi-Fi was always there.',
    'A 90s kid with Gen Alpha reflexes. The kids have influenced you.',
  ],
  'genz:genalpha': [
    '2K kid outside, Gen Alpha inside. The future is rubbing off on you.',
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
