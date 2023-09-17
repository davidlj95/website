/**
 * Metadata used around the app. Either in the Angular app or accessory files.
 *
 * ⚠️ Remember to run templates rendering script to update needed files if you alter any of those.
 */
const NICKNAME = 'davidlj95';
const REAL_NAME = 'David LJ';
// PoliceTranslator the earliest code found at 2023. But I started the project / did more things earlier!
const FIRST_JOB_START_DATE = new Date('2014-06-19')
const TIMESTAMP_DIFF = Date.now() - FIRST_JOB_START_DATE.getTime();
const YEARS_OF_EXPERIENCE = Math.abs(
  // Oh dear JavaScript, why you make things so difficult? https://stackoverflow.com/a/24181701/3263250
  new Date(TIMESTAMP_DIFF).getUTCFullYear() - 1970,
)
const DESCRIPTION_LINES: ReadonlyArray<DescriptionLine> = [
  {
    symbol: '\ue86f',
    text: 'Full stack software engineer',
  },
  {
    symbol: '\ue889',
    text: `${YEARS_OF_EXPERIENCE}+ years of experience`,
  },
  {
    symbol: '\ue5c3',
    text: 'Web apps & hybrid mobile apps',
  },
  {
    symbol: '\uf1b7',
    text: 'REST APIs backends',
  },
  {
    symbol: '\ue869',
    text: 'CI/CD, DevOps, Cloud',
  },
]

export interface DescriptionLine {
  symbol: string;
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
