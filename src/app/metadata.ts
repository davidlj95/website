export const NICKNAME = 'davidlj95';
export const REALNAME = 'David LJ';
export const SITENAME = `${REALNAME} 🔗 @${NICKNAME}`;
export const DESCRIPTION_LINES: ReadonlyArray<DescriptionLine> = [
  {
    emoji: '👨‍💻',
    text: '<code>/dev/random</code> software engineer',
  },
  {
    emoji: '🔌',
    text: 'Connecting technology & RealLife™',
  },
  {
    emoji: '🎾',
    text: 'Padel regular player',
  },
]
export const DESCRIPTION = DESCRIPTION_LINES
  .map((descriptionLine) => descriptionLine.text)
  // Strip HTML tags
  .map((lineText) => lineText.replace(/(<([^>]+)>)/gi, ''))
  .concat(['Get to know me better here'])
  .join('. ')

export interface DescriptionLine {
  emoji: string;
  text: string;
}

export const DOMAIN_NAME = `${NICKNAME}.com`;
// No trailing slash plz! (so it can be added easily if needed)
export const URL = `https://v2.${DOMAIN_NAME}`;

// Given URL now is v2.davidlj95.com temporarily
// This is instead as canonical production URL for author
export const AUTHOR_URL = `https://${DOMAIN_NAME}`;

export const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'author': {
    '@type': 'Person',
    'name': REALNAME,
    'url': AUTHOR_URL,
  },
  'name': SITENAME,
  'headline': DESCRIPTION,
  'url': URL,
}
