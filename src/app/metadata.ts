import {
  Apps,
  Build, Cloud,
  Code,
  Database, DeployedCode,
  Dns,
  History,
  Login,
  Robot2,
  Smartphone,
  Terminal,
  Web,
} from './material-symbols';

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

class DescriptionLineImpl implements DescriptionLine {
  public symbol: string;
  public html: string;
  public text: string;

  constructor({symbol, html, text}: {
    symbol: string,
    html: string,
    text?: string
  }, public lines?: ReadonlyArray<DescriptionLine>) {
    this.symbol = symbol;
    this.html = html;
    this.text = text ??
      // Strip HTML tags
      html.replace(/(<([^>]+)>)/gi, '');
  }
}

const DESCRIPTION_LINES: ReadonlyArray<DescriptionLine> = [
  new DescriptionLineImpl({
      symbol: Code,
      html: 'Senior software engineer',
    },
  ),
  new DescriptionLineImpl({
      symbol: History,
      html: `${YEARS_OF_EXPERIENCE}+ years \
<a class="craft" href="https://manifesto.softwarecraftsmanship.org/">crafting</a>:`,
    }, [
      new DescriptionLineImpl({
          symbol: Apps,
          html: 'Frontends',
        },
        [
          new DescriptionLineImpl({
            symbol: Smartphone,
            html: '<a href="https://www.linfo.org/cross-platform.html">Cross-platform</a> mobile apps',
          }),
          new DescriptionLineImpl({
            symbol: Web,
            html: 'Websites and web apps',
          }),
        ],
      ),
      new DescriptionLineImpl({
        symbol: Dns,
        html: 'Backends',
      }, [
        new DescriptionLineImpl({
          symbol: Database,
          html: 'Relational databases',
        }),
        new DescriptionLineImpl({
          symbol: Login,
          html: `<a href="https://www.cloudflare.com/en-gb/learning/access-management/authn-vs-authz/">AuthNZ</a>: \
<a href="https://oauth.net/2/">OAuth 2</a> & <a href="https://www.okta.com/blog/2021/02/single-sign-on-sso/">SSO</a>`,
        }),
      ]),
      new DescriptionLineImpl({
        symbol: Build,
        html: 'Infrastructure & tooling',
      }, [
        new DescriptionLineImpl({
          symbol: Robot2,
          html: '<a href="https://about.gitlab.com/topics/ci-cd/">CI/CD</a> pipelines',
        }),
        new DescriptionLineImpl({
          symbol: Terminal,
          html: 'Shell scripting',
        }),
        new DescriptionLineImpl({
          symbol: DeployedCode,
          html: '<a href="https://aws.amazon.com/what-is/containerization/">Containerization</a>',
        }),
        new DescriptionLineImpl({
          symbol: Cloud,
          html: `<a href="https://github.com/cncf/toc/blob/main/DEFINITION.md">Cloud native</a> & \
<a href="https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac">IaC</a>`,
        }),
      ]),
    ],
  ),
]

export interface DescriptionLine {
  symbol: string;
  html: string;
  text: string,
  lines?: ReadonlyArray<DescriptionLine>;
}

const DOMAIN_NAME = `${NICKNAME}.com`;

const descriptionLinesToText = (lines: ReadonlyArray<DescriptionLine>): string => {
  let text = '';
  lines.forEach((line, index) => {
    text += line.text
    if (index != lines.length - 1) {
      text += '. '
    }
    if (line.lines && line.lines.length > 0) {
      const formatter = new Intl.ListFormat('en')
      text += ' ' + formatter.format(
        line.lines.map((subLine) => subLine.text.toLowerCase()),
      )
    }
  })
  return text
}
export const METADATA = {
  nickname: NICKNAME,
  realName: REAL_NAME,
  siteName: `${REAL_NAME} 🔗 @${NICKNAME}`,
  descriptionLines: DESCRIPTION_LINES,
  description: descriptionLinesToText(DESCRIPTION_LINES)
    .concat('. Get to know me more here'),
  domainName: DOMAIN_NAME,
  authorUrl: new URL(`https://${DOMAIN_NAME}`),
  // Chosen dark theme background color z0 level (theming.scss)
  themeColor: '#202023',
}

export type Metadata = typeof METADATA;
