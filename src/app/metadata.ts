/**
 * Metadata used around the app. Either in the Angular app or accessory files.
 *
 * ⚠️ Remember to run templates rendering script to update needed files if you alter any of those.
 */
const NICKNAME = 'davidlj95';
const REAL_NAME = 'David LJ';
const DESCRIPTION_LINES: ReadonlyArray<DescriptionLine> = [
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

export interface DescriptionLine {
  emoji: string;
  text: string;
}

const DOMAIN_NAME = `${NICKNAME}.com`;

export const METADATA = {
  nickname: NICKNAME,
  realName: REAL_NAME,
  siteName: `${REAL_NAME} 🔗 @${NICKNAME}`,
  descriptionLines: DESCRIPTION_LINES,
  description: DESCRIPTION_LINES
    .map((descriptionLine) => descriptionLine.text)
    // Strip HTML tags
    .map((lineText) => lineText.replace(/(<([^>]+)>)/gi, ''))
    .concat(['Get to know me better here'])
    .join('. '),
  domainName: DOMAIN_NAME,
  authorUrl: new URL(`https://${DOMAIN_NAME}`),
  // Chosen dark theme background color z0 level (theming.scss)
  themeColor: '#202023',
}

export type Metadata = typeof METADATA;
