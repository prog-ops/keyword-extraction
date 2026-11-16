import { matchCase } from '@/domain/grammar/grammarTypes'

const CONTRACTION_MAP = Object.freeze({
  dont: "don't",
  doesnt: "doesn't",
  didnt: "didn't",
  cant: "can't",
  wont: "won't",
  wasnt: "wasn't",
  werent: "weren't",
  isnt: "isn't",
  arent: "aren't",
  hasnt: "hasn't",
  havent: "haven't",
  hadnt: "hadn't",
  shouldnt: "shouldn't",
  wouldnt: "wouldn't",
  couldnt: "couldn't",
  mustnt: "mustn't",
  im: "I'm",
  ive: "I've",
  id: "I'd",
  youre: "you're",
  theyre: "they're",
  weve: "we've",
  thats: "that's",
  whats: "what's",
})

const IRREGULAR_PAST_PARTICIPLES = Object.freeze({
  went: 'gone',
  saw: 'seen',
  did: 'done',
  wrote: 'written',
  write: 'written',
  took: 'taken',
  take: 'taken',
  ate: 'eaten',
  eat: 'eaten',
  spoke: 'spoken',
  speak: 'spoken',
  broke: 'broken',
  break: 'broken',
  chose: 'chosen',
  choose: 'chosen',
  drove: 'driven',
  drive: 'driven',
  fell: 'fallen',
  fall: 'fallen',
  flew: 'flown',
  fly: 'flown',
  forgot: 'forgotten',
  forget: 'forgotten',
  gave: 'given',
  give: 'given',
  grew: 'grown',
  grow: 'grown',
  knew: 'known',
  know: 'known',
  began: 'begun',
  begin: 'begun',
  drank: 'drunk',
  drink: 'drunk',
  ran: 'run',
  sang: 'sung',
  sing: 'sung',
  swam: 'swum',
  swim: 'swum',
  stole: 'stolen',
  steal: 'stolen',
  wore: 'worn',
  wear: 'worn',
})

const PASSIVE_PARTICIPLE_MAP = Object.freeze({
  build: 'built',
  make: 'made',
  write: 'written',
  wrote: 'written',
  take: 'taken',
  took: 'taken',
  break: 'broken',
  broke: 'broken',
  speak: 'spoken',
  spoke: 'spoken',
  choose: 'chosen',
  chose: 'chosen',
  know: 'known',
  knew: 'known',
  show: 'shown',
  give: 'given',
  gave: 'given',
  send: 'sent',
  spend: 'spent',
  buy: 'bought',
  bring: 'brought',
  catch: 'caught',
  teach: 'taught',
  think: 'thought',
  find: 'found',
  pay: 'paid',
  say: 'said',
  tell: 'told',
  sell: 'sold',
  hold: 'held',
  keep: 'kept',
  leave: 'left',
  lose: 'lost',
  do: 'done',
  did: 'done',
  see: 'seen',
  saw: 'seen',
})

const PAST_TO_BASE_VERB = Object.freeze({
  went: 'go',
  saw: 'see',
  knew: 'know',
  came: 'come',
  bought: 'buy',
  made: 'make',
  took: 'take',
  said: 'say',
  did: 'do',
  had: 'have',
  ate: 'eat',
  gave: 'give',
  found: 'find',
  thought: 'think',
  told: 'tell',
  became: 'become',
  left: 'leave',
  felt: 'feel',
  put: 'put',
  brought: 'bring',
  began: 'begin',
  kept: 'keep',
  held: 'hold',
  wrote: 'write',
  stood: 'stand',
  heard: 'hear',
  met: 'meet',
  ran: 'run',
  paid: 'pay',
  sat: 'sit',
  spoke: 'speak',
  grew: 'grow',
  lost: 'lose',
  fell: 'fall',
  sent: 'send',
  built: 'build',
  understood: 'understand',
  broke: 'break',
  spent: 'spend',
  caught: 'catch',
  drove: 'drive',
  chose: 'choose',
  wore: 'wear',
  won: 'win',
})

const VERB_3RD_TO_BASE = Object.freeze({
  goes: 'go',
  does: 'do',
  has: 'have',
  tries: 'try',
  studies: 'study',
  flies: 'fly',
  cries: 'cry',
  carries: 'carry',
  worries: 'worry',
  marries: 'marry',
  replies: 'reply',
  applies: 'apply',
  watches: 'watch',
  teaches: 'teach',
  reaches: 'reach',
  catches: 'catch',
  touches: 'touch',
  pushes: 'push',
  wishes: 'wish',
  finishes: 'finish',
  washes: 'wash',
  passes: 'pass',
  misses: 'miss',
  kisses: 'kiss',
  fixes: 'fix',
  mixes: 'mix',
  relaxes: 'relax',
  discusses: 'discuss',
})

const BASE_TO_PAST_TENSE = Object.freeze({
  go: 'went',
  goes: 'went',
  receive: 'received',
  receives: 'received',
  buy: 'bought',
  buys: 'bought',
  come: 'came',
  comes: 'came',
  see: 'saw',
  sees: 'saw',
  eat: 'ate',
  eats: 'ate',
  make: 'made',
  makes: 'made',
  take: 'took',
  takes: 'took',
  win: 'won',
  wins: 'won',
  meet: 'met',
  meets: 'met',
  say: 'said',
  says: 'said',
  tell: 'told',
  tells: 'told',
  think: 'thought',
  thinks: 'thought',
  find: 'found',
  finds: 'found',
  give: 'gave',
  gives: 'gave',
  know: 'knew',
  knows: 'knew',
  get: 'got',
  gets: 'got',
  work: 'worked',
  works: 'worked',
  walk: 'walked',
  walks: 'walked',
  play: 'played',
  plays: 'played',
  watch: 'watched',
  watches: 'watched',
  start: 'started',
  starts: 'started',
  visit: 'visited',
  visits: 'visited',
  call: 'called',
  calls: 'called',
  arrive: 'arrived',
  arrives: 'arrived',
  happen: 'happened',
  happens: 'happened',
  study: 'studied',
  studies: 'studied',
  try: 'tried',
  tries: 'tried',
  finish: 'finished',
  finishes: 'finished',
  help: 'helped',
  helps: 'helped',
  ask: 'asked',
  asks: 'asked',
  live: 'lived',
  lives: 'lived',
  move: 'moved',
  moves: 'moved',
  open: 'opened',
  opens: 'opened',
  wait: 'waited',
  waits: 'waited',
  learn: 'learned',
  learns: 'learned',
  send: 'sent',
  sends: 'sent',
  spend: 'spent',
  spends: 'spent',
  leave: 'left',
  leaves: 'left',
  feel: 'felt',
  feels: 'felt',
  bring: 'brought',
  brings: 'brought',
  write: 'wrote',
  writes: 'wrote',
  speak: 'spoke',
  speaks: 'spoke',
  run: 'ran',
  runs: 'ran',
  pay: 'paid',
  pays: 'paid',
  lose: 'lost',
  loses: 'lost',
  fall: 'fell',
  falls: 'fell',
  build: 'built',
  builds: 'built',
  break: 'broke',
  breaks: 'broke',
  choose: 'chose',
  chooses: 'chose',
})

const COMMON_3RD_SINGULAR_VERBS = new Set([
  'goes',
  'likes',
  'wants',
  'needs',
  'works',
  'knows',
  'makes',
  'takes',
  'comes',
  'sees',
  'gets',
  'gives',
  'thinks',
  'says',
  'tells',
  'asks',
  'uses',
  'finds',
  'feels',
  'tries',
  'leaves',
  'calls',
  'keeps',
  'lets',
  'begins',
  'seems',
  'helps',
  'talks',
  'turns',
  'starts',
  'shows',
  'hears',
  'plays',
  'runs',
  'moves',
  'lives',
  'believes',
  'holds',
  'brings',
  'happens',
  'writes',
  'provides',
  'sits',
  'stands',
  'loses',
  'pays',
  'meets',
  'includes',
  'continues',
  'sets',
  'learns',
  'changes',
  'leads',
  'understands',
  'watches',
  'follows',
  'stops',
  'creates',
  'speaks',
  'reads',
  'allows',
  'adds',
  'spends',
  'grows',
  'opens',
  'walks',
  'wins',
  'offers',
  'remembers',
  'loves',
  'considers',
  'appears',
  'buys',
  'waits',
  'serves',
  'sends',
  'expects',
  'builds',
  'stays',
  'falls',
  'reaches',
  'explains',
  'depends',
  'agrees',
  'arrives',
  'studies',
  'discusses',
  'receives',
  'prefer',
  'prefers',
])

const BASE_TO_3RD_SINGULAR = Object.freeze({
  work: 'works',
  like: 'likes',
  want: 'wants',
  need: 'needs',
  know: 'knows',
  make: 'makes',
  take: 'takes',
  come: 'comes',
  see: 'sees',
  get: 'gets',
  give: 'gives',
  think: 'thinks',
  say: 'says',
  tell: 'tells',
  ask: 'asks',
  use: 'uses',
  find: 'finds',
  feel: 'feels',
  try: 'tries',
  leave: 'leaves',
  call: 'calls',
  keep: 'keeps',
  begin: 'begins',
  seem: 'seems',
  help: 'helps',
  talk: 'talks',
  start: 'starts',
  show: 'shows',
  hear: 'hears',
  play: 'plays',
  run: 'runs',
  move: 'moves',
  live: 'lives',
  believe: 'believes',
  bring: 'brings',
  happen: 'happens',
  write: 'writes',
  provide: 'provides',
  stand: 'stands',
  lose: 'loses',
  pay: 'pays',
  meet: 'meets',
  include: 'includes',
  continue: 'continues',
  learn: 'learns',
  change: 'changes',
  lead: 'leads',
  understand: 'understands',
  watch: 'watches',
  follow: 'follows',
  stop: 'stops',
  create: 'creates',
  speak: 'speaks',
  read: 'reads',
  allow: 'allows',
  add: 'adds',
  spend: 'spends',
  grow: 'grows',
  open: 'opens',
  walk: 'walks',
  win: 'wins',
  offer: 'offers',
  remember: 'remembers',
  love: 'loves',
  consider: 'considers',
  appear: 'appears',
  buy: 'buys',
  wait: 'waits',
  serve: 'serves',
  send: 'sends',
  expect: 'expects',
  build: 'builds',
  stay: 'stays',
  fall: 'falls',
  reach: 'reaches',
  explain: 'explains',
  depend: 'depends',
  agree: 'agrees',
  arrive: 'arrives',
  study: 'studies',
  discuss: 'discusses',
  receive: 'receives',
  go: 'goes',
  do: 'does',
  have: 'has',
})

/**
 * Converts a 3rd-person singular verb ("likes", "explains", "goes") into its base form.
 * @param {string} verb
 * @returns {string}
 */
function toBaseVerb(verb) {
  const lower = verb.toLowerCase()
  if (VERB_3RD_TO_BASE[lower]) {
    return VERB_3RD_TO_BASE[lower]
  }
  if (PAST_TO_BASE_VERB[lower]) {
    return PAST_TO_BASE_VERB[lower]
  }
  if (lower.endsWith('ies') && lower.length > 4) {
    return `${lower.slice(0, -3)}y`
  }
  if (
    (lower.endsWith('ches') ||
      lower.endsWith('shes') ||
      lower.endsWith('sses') ||
      lower.endsWith('xes') ||
      lower.endsWith('zes')) &&
    lower.length > 4
  ) {
    return lower.slice(0, -2)
  }
  if (lower.endsWith('s') && !lower.endsWith('ss') && lower.length > 3) {
    return lower.slice(0, -1)
  }
  return lower
}

/**
 * Determines whether an English word starts with a vowel sound (for "a" vs "an").
 * @param {string} word
 * @returns {boolean}
 */
function startsWithVowelSound(word) {
  const lower = word.toLowerCase()
  const silentH = ['hour', 'hours', 'honest', 'honestly', 'honor', 'honors', 'honour', 'heir']
  if (silentH.some((prefix) => lower.startsWith(prefix))) {
    return true
  }

  const consonantSoundVowels = [
    'uni',
    'use',
    'usa',
    'usu',
    'utensil',
    'utility',
    'eul',
    'eup',
    'eur',
    'one',
    'once',
  ]
  if (consonantSoundVowels.some((prefix) => lower.startsWith(prefix))) {
    return false
  }

  return /^[aeiou]/i.test(lower)
}

/**
 * Helper to apply a regex pattern replacement and record a log entry.
 */
function replaceWithLog(text, regex, replacer, category, explanation, matchLogs) {
  return text.replace(regex, (...args) => {
    const fullMatch = args[0]
    const replacement =
      typeof replacer === 'function' ? replacer(...args) : replacer
    if (replacement !== fullMatch) {
      matchLogs.push({
        original: fullMatch,
        replacement,
        category,
        explanation:
          typeof explanation === 'function'
            ? explanation(fullMatch, replacement)
            : explanation,
      })
    }
    return replacement
  })
}

/**
 * Applies comprehensive English grammar pattern rules.
 * @param {string} inputText
 * @param {import('@/domain/grammar/grammarTypes').RuleMatchLog[]} matchLogs
 * @returns {string}
 */
export function applyGrammarPatterns(inputText, matchLogs = []) {
  let text = inputText

  // 1. Contractions missing apostrophes
  text = text.replace(/\b([A-Za-z]+)\b/g, (word) => {
    const lower = word.toLowerCase()
    const target = CONTRACTION_MAP[lower]
    if (!target) return word
    const replaced = matchCase(word, target)
    if (replaced !== word) {
      matchLogs.push({
        original: word,
        replacement: replaced,
        category: 'Contraction',
        explanation: `Missing apostrophe in contraction "${replaced}".`,
      })
    }
    return replaced
  })

  // 2. Common multi-word typos & confusables
  const confusableRules = [
    {
      regex: /\balot\b/gi,
      replacer: (m) => matchCase(m, 'a lot'),
      category: 'Spelling',
      explanation: '"A lot" is always written as two words.',
    },
    {
      regex:
        /\b(they're|there)\s+(house|home|office|car|dog|cat|friend|friends|team|family|work|school|parents|children|idea|ideas|plan|plans|problem|problems|life|lives|company|business|room|country)\b/gi,
      replacer: (m, pron, noun) => `${matchCase(pron, 'their')} ${noun}`,
      category: 'Word Choice',
      explanation: 'Use the possessive determiner "their" before a noun.',
    },
    {
      regex:
        /\byou're\s+(opinion|opinions|house|home|office|car|friend|friends|name|work|job|phone|email|idea|ideas|life|family|book|team|problem|help|support|advice|project|question)\b/gi,
      replacer: (m, noun) => `${matchCase(m.split(/\s+/)[0], 'your')} ${noun}`,
      category: 'Word Choice',
      explanation: 'Use the possessive determiner "your" before a noun.',
    },
    {
      regex: /\byour\s+(welcome|right|wrong|going|doing|invited|late)\b/gi,
      replacer: (m, adj) => `${matchCase(m.split(/\s+/)[0], "you're")} ${adj}`,
      category: 'Word Choice',
      explanation: 'Use the contraction "you\'re" ("you are") here.',
    },
    {
      regex:
        /\b(better|worse|more|less|faster|slower|bigger|smaller|older|younger|higher|lower|easier|harder|stronger|smarter|rather|other)\s+then\b/gi,
      replacer: (m, comp) => `${comp} than`,
      category: 'Word Choice',
      explanation: 'Use "than" for comparisons instead of "then".',
    },
    {
      regex: /\b(should|could|would|must|might)\s+of\b/gi,
      replacer: (m, modal) => `${modal} have`,
      category: 'Grammar',
      explanation: 'Use "have" instead of "of" after a modal verb.',
    },
  ]

  for (const rule of confusableRules) {
    text = replaceWithLog(
      text,
      rule.regex,
      rule.replacer,
      rule.category,
      rule.explanation,
      matchLogs
    )
  }

  // 3. Overuse of "be" with active verbs ("I am agree" -> "I agree")
  text = replaceWithLog(
    text,
    /\b(I|you|we|they)\s+(?:am|are)\s+(agree|depend|belong)\b/gi,
    (m, subj, verb) => {
      const normalizedSubj = subj.toLowerCase() === 'i' ? 'I' : subj
      return `${normalizedSubj} ${verb.toLowerCase()}`
    },
    'Verb Form',
    'Action/stative verbs like "agree", "depend", and "belong" do not take "am/are".',
    matchLogs
  )

  text = replaceWithLog(
    text,
    /\b(he|she|it)\s+is\s+(agree|depend|belong|happen)\b/gi,
    (m, subj, verb) => `${subj} ${verb.toLowerCase()}s`,
    'Verb Form',
    'Use the simple present verb form without "is".',
    matchLogs
  )

  // 4. Preposition & collocation rules
  const collocationRules = [
    {
      regex: /\b(discuss|discussed|discusses|discussing)\s+about\b/gi,
      replacer: (m, verb) => verb,
      category: 'Preposition',
      explanation: '"Discuss" is transitive and does not need "about".',
    },
    {
      regex: /\b(explain|explains|explained|explaining)\s+(me|him|her|us|them)\b/gi,
      replacer: (m, verb, obj) => `${verb} to ${obj}`,
      category: 'Preposition',
      explanation: 'Use "explain to [someone]" in English.',
    },
    {
      regex: /\b(depend|depends|depended|depending)\s+of\b/gi,
      replacer: (m, verb) => `${verb} on`,
      category: 'Preposition',
      explanation: 'The correct preposition with "depend" is "on".',
    },
    {
      regex: /\binterested\s+on\b/gi,
      replacer: (m) => `${matchCase(m.split(/\s+/)[0], 'interested')} in`,
      category: 'Preposition',
      explanation: 'Use "interested in" instead of "interested on".',
    },
    {
      regex: /\bmarried\s+with\b/gi,
      replacer: (m) => `${matchCase(m.split(/\s+/)[0], 'married')} to`,
      category: 'Preposition',
      explanation: 'Use "married to" instead of "married with".',
    },
    {
      regex: /\b(good|bad)\s+in\s+([A-Za-z]+ing|math|science|english|sports|coding|writing|speaking)\b/gi,
      replacer: (m, adj, skill) => `${adj} at ${skill}`,
      category: 'Preposition',
      explanation: 'Use "good/bad at" when referring to skills or activities.',
    },
    {
      regex: /\b(arrive|arrives|arrived|arriving)\s+to\s+(the\s+)?(office|school|work|home|airport|station|hotel|hospital|party)\b/gi,
      replacer: (m, verb, art = '', place) =>
        place.toLowerCase() === 'home'
          ? `${verb} ${place}`
          : `${verb} at ${art}${place}`,
      category: 'Preposition',
      explanation: 'Use "arrive at" for buildings/places (or no preposition before "home").',
    },
    {
      regex: /\bfor\s+(buy|discuss|make|get|see|do|learn|find|help|build|create|check|fix|improve|solve|understand|write|read|speak|study)\b/gi,
      replacer: (m, verb) => `${matchCase(m.split(/\s+/)[0], 'to')} ${verb.toLowerCase()}`,
      category: 'Infinitive',
      explanation: 'Use the infinitive "to + base verb" to express purpose instead of "for + base verb".',
    },
    {
      regex: /\bdespite\s+of\b/gi,
      replacer: (m) => matchCase(m.split(/\s+/)[0], 'despite'),
      category: 'Preposition',
      explanation: 'Use "despite" without "of" (or use "in spite of").',
    },
    {
      regex: /\b(comprise|comprises|comprised)\s+of\b/gi,
      replacer: (m, verb) => verb,
      category: 'Preposition',
      explanation: '"Comprise" means "consist of" and does not take "of".',
    },
    {
      regex: /\b(listen|listens|listened|listening)\s+(music|songs|podcasts|radio)\b/gi,
      replacer: (m, verb, noun) => `${verb} to ${noun}`,
      category: 'Preposition',
      explanation: 'Always use "to" after "listen" before an object.',
    },
    {
      regex: /\b(return|returned|returns)\s+back\b/gi,
      replacer: (m, verb) => verb,
      category: 'Redundancy',
      explanation: '"Return" already means "go back"; "back" is redundant.',
    },
    {
      regex: /\b(repeat|repeated|repeats)\s+again\b/gi,
      replacer: (m, verb) => verb,
      category: 'Redundancy',
      explanation: '"Repeat" already means "do again"; "again" is redundant.',
    },
  ]

  for (const rule of collocationRules) {
    text = replaceWithLog(
      text,
      rule.regex,
      rule.replacer,
      rule.category,
      rule.explanation,
      matchLogs
    )
  }

  // 5. Uncountable nouns & irregular plurals
  text = replaceWithLog(
    text,
    /\bmany\s+(informations?|advices?|equipments?|furnitures?|homeworks?|knowledges?|softwares?|hardwares?|researches?|feedbacks?|traffics?|luggages?)\b/gi,
    (m, noun) => {
      const singular = noun.toLowerCase().replace(/s$/, '')
      return `${matchCase(m.split(/\s+/)[0], 'much')} ${singular}`
    },
    'Uncountable Noun',
    'Uncountable nouns take "much" (or "a lot of") and do not have a plural "-s" form.',
    matchLogs
  )

  text = replaceWithLog(
    text,
    /\b(an?|one)\s+(informations?|advices?|equipments?|furnitures?|homeworks?|knowledges?|softwares?|hardwares?|feedbacks?|luggages?)\b/gi,
    (m, det, noun) => {
      const singular = noun.toLowerCase().replace(/s$/, '')
      return `${matchCase(det, 'some')} ${singular}`
    },
    'Uncountable Noun',
    'Uncountable nouns cannot take "a/an" directly; use "some" or "a piece of".',
    matchLogs
  )

  text = replaceWithLog(
    text,
    /\b(informations|advices|equipments|furnitures|homeworks|knowledges|softwares|hardwares|feedbacks|luggages|baggages|sceneries|breads)\b/gi,
    (m) => m.replace(/ies$/i, 'y').replace(/s$/i, ''),
    'Uncountable Noun',
    'This noun is uncountable in English and does not take a plural "-s".',
    matchLogs
  )

  const irregularPlurals = {
    childs: 'children',
    childrens: 'children',
    mans: 'men',
    mens: 'men',
    womans: 'women',
    womens: 'women',
    peoples: 'people',
    tooths: 'teeth',
    teeths: 'teeth',
    foots: 'feet',
    feets: 'feet',
    mouses: 'mice',
    gooses: 'geese',
    sheeps: 'sheep',
    deers: 'deer',
    aircrafts: 'aircraft',
  }

  text = text.replace(/\b([A-Za-z]+)\b/g, (word) => {
    const lower = word.toLowerCase()
    const target = irregularPlurals[lower]
    if (!target) return word
    const replaced = matchCase(word, target)
    matchLogs.push({
      original: word,
      replacement: replaced,
      category: 'Plural Form',
      explanation: `The correct plural form is "${replaced}".`,
    })
    return replaced
  })

  // Double comparatives ("more better" -> "better")
  text = replaceWithLog(
    text,
    /\bmore\s+(better|worse|faster|slower|bigger|smaller|easier|harder|higher|lower|cheaper|stronger|smarter|older|younger)\b/gi,
    (m, comp) => matchCase(m.split(/\s+/)[0], comp.toLowerCase()),
    'Comparative',
    'Avoid double comparatives like "more better".',
    matchLogs
  )

  // 6. Auxiliary, Modal & Negation patterns
  // "he/she/it don't" -> "he/she/it doesn't"
  text = replaceWithLog(
    text,
    /\b(he|she|it|this|that|everyone|everybody|someone|somebody|anyone|anybody|nobody)\s+don't\b/gi,
    (m, subj) => `${subj} doesn't`,
    'Subject-Verb Agreement',
    'Use "doesn\'t" with third-person singular subjects.',
    matchLogs
  )

  // "I/you/we/they/people doesn't" -> "don't"
  text = replaceWithLog(
    text,
    /\b(I|you|we|they|people|children|men|women)\s+(?:who\s+)?doesn't\b/gi,
    (m) => m.replace(/doesn't/i, "don't"),
    'Subject-Verb Agreement',
    'Use "don\'t" with plural subjects or "I/you/we/they".',
    matchLogs
  )

  // "doesn't / don't / didn't + conjugated verb" -> base verb ("doesn't likes" -> "doesn't like", "didn't went" -> "didn't go")
  text = replaceWithLog(
    text,
    /\b(doesn't|don't|didn't|does\s+not|do\s+not|did\s+not)\s+([A-Za-z]+)\b/gi,
    (m, aux, verb) => {
      const base = toBaseVerb(verb)
      if (base !== verb.toLowerCase()) {
        return `${aux} ${base}`
      }
      return m
    },
    'Verb Form',
    'Always use the base form of the verb after "do/does/did/don\'t/doesn\'t/didn\'t".',
    matchLogs
  )

  // Modal verbs + conjugated verb ("can explains" -> "can explain", "can you explains" -> "can you explain")
  text = replaceWithLog(
    text,
    /\b(can|could|will|would|shall|should|may|might|must)\s+(?:(I|you|he|she|it|we|they)\s+)?([A-Za-z]+)\b/gi,
    (m, modal, pron, verb) => {
      const lowerVerb = verb.toLowerCase()
      if (
        ['be', 'have', 'do', 'go', 'not', 'also', 'always', 'never', 'only', 'just', 'still', 'even', 'please'].includes(
          lowerVerb
        )
      ) {
        return m
      }
      if (COMMON_3RD_SINGULAR_VERBS.has(lowerVerb) || PAST_TO_BASE_VERB[lowerVerb]) {
        const base = toBaseVerb(lowerVerb)
        return pron ? `${modal} ${pron} ${base}` : `${modal} ${base}`
      }
      return m
    },
    'Modal Verb',
    'Use the base form of the verb after modal verbs (can, should, will, must, etc.).',
    matchLogs
  )

  // "he/she/it have" -> "he/she/it has"
  text = replaceWithLog(
    text,
    /\b(he|she|it)\s+have\b/gi,
    (m, subj) => `${subj} has`,
    'Subject-Verb Agreement',
    'Use "has" with third-person singular subjects (he/she/it).',
    matchLogs
  )

  // "I/you/we/they has" -> "I/you/we/they have"
  text = replaceWithLog(
    text,
    /\b(I|you|we|they)\s+has\b/gi,
    (m, subj) => `${subj.toLowerCase() === 'i' ? 'I' : subj} have`,
    'Subject-Verb Agreement',
    'Use "have" with "I", "you", "we", and "they".',
    matchLogs
  )

  // Perfect tense ("have/has/had went" -> "have/has/had gone")
  text = replaceWithLog(
    text,
    /\b(have|has|had|haven't|hasn't|hadn't)\s+([A-Za-z]+)\b/gi,
    (m, aux, verb) => {
      const participle = IRREGULAR_PAST_PARTICIPLES[verb.toLowerCase()]
      if (participle) {
        return `${aux} ${participle}`
      }
      return m
    },
    'Present/Past Perfect',
    'Use the past participle form after "have", "has", or "had".',
    matchLogs
  )

  // Singular nouns with "are/were" ("this project are" -> "this project is", "it are" -> "it is")
  text = replaceWithLog(
    text,
    /\b(this|that)\s+(project|system|app|application|website|company|book|movie|idea|problem|solution|car|house|place|person|report|tool)\s+are\b/gi,
    (m, dem, noun) => `${dem} ${noun} is`,
    'Subject-Verb Agreement',
    'A singular subject takes the singular verb "is".',
    matchLogs
  )

  text = replaceWithLog(
    text,
    /\b(he|she|it|this|that)\s+are\b/gi,
    (m, subj) => `${subj} is`,
    'Subject-Verb Agreement',
    'Use "is" with singular subject pronouns (he, she, it, this, that).',
    matchLogs
  )

  text = replaceWithLog(
    text,
    /\bI\s+(is|are)\b/gi,
    () => 'I am',
    'Subject-Verb Agreement',
    'Use "am" with the pronoun "I".',
    matchLogs
  )

  text = replaceWithLog(
    text,
    /\b(you|we|they)\s+is\b/gi,
    (m, subj) => `${subj} are`,
    'Subject-Verb Agreement',
    'Use "are" with "you", "we", and "they".',
    matchLogs
  )

  text = replaceWithLog(
    text,
    /\b(you|we|they)\s+was\b/gi,
    (m, subj) => `${subj} were`,
    'Subject-Verb Agreement',
    'Use "were" with "you", "we", and "they".',
    matchLogs
  )

  // "there is many / several / a lot of / two..." -> "there are..."
  text = replaceWithLog(
    text,
    /\b(there)\s+is\s+(many|several|few|a\s+lot\s+of|two|three|four|five|six|seven|eight|nine|ten|people|children)\b/gi,
    (m, thereWord, quant) => `${thereWord} are ${quant}`,
    'Subject-Verb Agreement',
    'Use "there are" before plural nouns or plural quantifiers like "many".',
    matchLogs
  )

  // Passive voice participles ("is build" -> "is built", "was write" -> "was written")
  text = replaceWithLog(
    text,
    /\b(am|is|are|was|were|be|been|being)\s+(?:(always|often|usually|already|now|currently|recently)\s+)?([A-Za-z]+)\b/gi,
    (m, beVerb, adv, word) => {
      const participle = PASSIVE_PARTICIPLE_MAP[word.toLowerCase()]
      if (!participle) return m
      return adv ? `${beVerb} ${adv} ${participle}` : `${beVerb} ${participle}`
    },
    'Passive Voice',
    'Passive voice requires the past participle form of the verb (e.g., "is built", "was written").',
    matchLogs
  )

  // 7. First/Second/Plural subjects + 3rd-person singular verb ("I goes" -> "I go", "we needs" -> "we need")
  text = replaceWithLog(
    text,
    /\b(I|you|we|they|people|children|my\s+friends)\s+(?:(always|often|usually|sometimes|never)\s+)?([A-Za-z]+)\b/gi,
    (m, subj, adv, verb) => {
      const lowerVerb = verb.toLowerCase()
      if (!COMMON_3RD_SINGULAR_VERBS.has(lowerVerb)) return m
      const base = toBaseVerb(lowerVerb)
      const normalizedSubj = subj.toLowerCase() === 'i' ? 'I' : subj
      return adv ? `${normalizedSubj} ${adv} ${base}` : `${normalizedSubj} ${base}`
    },
    'Subject-Verb Agreement',
    'Plural subjects and "I/you/we/they" take the base verb form without "-s".',
    matchLogs
  )

  // 8. Third-person singular subjects + base verb ("he work" -> "he works", "success depend" -> "success depends")
  text = replaceWithLog(
    text,
    /\b(he|she|it|everyone|everybody|someone|somebody|anyone|anybody|nobody|success|my\s+brother|my\s+sister|my\s+friend|my\s+mother|my\s+father|my\s+boss|my\s+teacher|the\s+company|the\s+system)\s+(?:(always|often|usually|sometimes|never)\s+)?([A-Za-z]+)\b/gi,
    (m, subj, adv, verb) => {
      const lowerVerb = verb.toLowerCase()
      const thirdPerson = BASE_TO_3RD_SINGULAR[lowerVerb]
      if (!thirdPerson) return m
      return adv
        ? `${subj} ${adv} ${thirdPerson}`
        : `${subj} ${thirdPerson}`
    },
    'Subject-Verb Agreement',
    'Third-person singular subjects take a verb ending in "-s/-es" in the present tense.',
    matchLogs
  )

  // 9. Past-tense context enforcement per sentence when past time markers exist ("yesterday", "last week", "ago")
  const pastMarkerRegex =
    /\b(yesterday|last\s+(?:night|week|month|year|monday|tuesday|wednesday|thursday|friday|saturday|sunday)|(?:\d+|two|three|four|five|few|several)\s+(?:days?|weeks?|months?|years?)\s+ago|in\s+(?:19\d\d|20[01]\d|202[0-5]))\b/i

  text = text.replace(/[^.!?]+[.!?]?/g, (sentence) => {
    if (!pastMarkerRegex.test(sentence)) {
      return sentence
    }

    return sentence.replace(
      /\b(I|you|he|she|it|we|they|my\s+[A-Za-z]+|[A-Za-z]+\s+and)\s+([A-Za-z]+)\b/gi,
      (m, prefix, verb) => {
        const lowerVerb = verb.toLowerCase()
        const pastForm = BASE_TO_PAST_TENSE[lowerVerb]
        if (!pastForm) return m
        // Avoid changing infinitives ("to go")
        if (prefix.toLowerCase() === 'to') return m
        const replacement = `${prefix} ${pastForm}`
        matchLogs.push({
          original: m,
          replacement,
          category: 'Verb Tense',
          explanation: `Use the past tense "${pastForm}" when referring to a past time marker like "yesterday" or "last week".`,
        })
        return replacement
      }
    )
  })

  // 10. Indefinite articles "a" vs "an"
  text = replaceWithLog(
    text,
    /\b(a|an)\s+([A-Za-z]+)\b/gi,
    (m, article, nextWord) => {
      const needsAn = startsWithVowelSound(nextWord)
      const correctArticle = matchCase(article, needsAn ? 'an' : 'a')
      if (correctArticle === article) return m
      return `${correctArticle} ${nextWord}`
    },
    'Article (a/an)',
    (orig, repl) =>
      `Use "${repl.split(/\s+/)[0]}" before "${repl.split(/\s+/)[1]}" based on its initial sound.`,
    matchLogs
  )

  return text
}

