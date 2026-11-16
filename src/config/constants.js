export const APP_CONFIG = Object.freeze({
  title: 'English Grammar Checker',
  subtitle:
    'Paste or type your English text below and click Start to rewrite it with corrected words highlighted in bold.',
  footerText: 'Built with Vite, React, Chakra UI & Bun',
  languageToolEndpoint: 'https://api.languagetool.org/v2/check',
  requestTimeoutMs: 3500,
})

export const SAMPLE_TEXTS = Object.freeze([
  {
    id: 'daily-story',
    label: 'Past Tense & Agreement',
    text: 'i goes to school yesterday and recieve many informations from my freind. she dont likes an university library because it are always crowded.',
  },
  {
    id: 'work-email',
    label: 'Business Email',
    text: 'he have went to they\'re office for discuss about the new softwares. can you explains me how this project are build and wether we needs more equipments?',
  },
  {
    id: 'opinion-essay',
    label: 'Essay & Prepositions',
    text: 'i am agree with you\'re opinion about the enviroment. there is many peoples who doesnt knows that success depend of hard work and good advices.',
  },
])

