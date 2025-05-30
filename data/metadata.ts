import {
  Api,
  Apps,
  Build,
  Cloud,
  Code,
  Database,
  DeployedCode,
  Dns,
  History,
  Login,
  Robot2,
  RocketLaunch,
  Security,
  Smartphone,
  Terminal,
  Web,
} from './material-symbols'

/**
 * Metadata used around the app. Either in the Angular app or accessory files.
 *
 * ⚠️ Remember to run templates rendering script to update needed files if you alter any of those.
 */
const NICKNAME = 'davidlj95'
const REAL_NAME = 'David LJ'
const TITLE = 'Senior software engineer'
// PoliceTranslator's was the earliest code I found at 2023.
// Though I started the project / did more things earlier!
const FIRST_JOB_START_DATE = new Date('2014-06-19')
const TIMESTAMP_DIFF = Date.now() - FIRST_JOB_START_DATE.getTime()
const YEARS_OF_EXPERIENCE = Math.abs(
  // Oh dear JavaScript, why you make things so difficult?
  // https://stackoverflow.com/a/24181701/3263250
  new Date(TIMESTAMP_DIFF).getUTCFullYear() - 1970,
)

export class DescriptionLine {
  readonly data?: DescriptionLineData
  readonly children: readonly DescriptionLine[]

  constructor(
    data?: DescriptionLineData,
    children?: readonly DescriptionLine[],
  ) {
    this.data = data
    this.children = children ?? []
  }

  static fromData(
    dataArg: ConstructorParameters<typeof DescriptionLineData>[0],
    children?: readonly DescriptionLine[],
  ) {
    return new this(new DescriptionLineData(dataArg), children)
  }
}

export class DescriptionLineData {
  readonly symbol: string
  readonly html: string
  readonly text: string

  constructor({
    symbol,
    html,
    text,
  }: {
    symbol: string
    html: string
    text?: string
  }) {
    this.symbol = symbol
    this.html = html
    this.text =
      text ??
      // Strip HTML tags
      html.replace(/(<([^>]+)>)/gi, '')
  }
}

const DESCRIPTION_LINES: readonly DescriptionLine[] = [
  DescriptionLine.fromData({
    symbol: Code,
    html: 'Full stack',
  }),
  DescriptionLine.fromData({
    symbol: RocketLaunch,
    html: 'From scratch to production',
  }),
  DescriptionLine.fromData(
    {
      symbol: History,
      html: `${YEARS_OF_EXPERIENCE}+ years \
<a href="https://manifesto.softwarecraftsmanship.org/">crafting</a>`,
    },
    [
      DescriptionLine.fromData(
        {
          symbol: Apps,
          html: 'Frontends',
        },
        [
          DescriptionLine.fromData({
            symbol: Smartphone,
            html: '<a href="https://www.linfo.org/cross-platform.html">Cross-platform</a> mobile apps',
          }),
          DescriptionLine.fromData({
            symbol: Web,
            html: 'Websites and web apps',
          }),
        ],
      ),
      DescriptionLine.fromData(
        {
          symbol: Dns,
          html: 'Backends',
        },
        [
          DescriptionLine.fromData({
            symbol: Api,
            html: `HTTP <a href="https://www.ibm.com/topics/rest-apis">REST APIs</a>`,
          }),
          DescriptionLine.fromData({
            symbol: Database,
            html: 'Relational databases',
          }),
          DescriptionLine.fromData({
            symbol: Login,
            html: `<a href="https://www.cloudflare.com/en-gb/learning/access-management/authn-vs-authz/">AuthNZ</a>: \
<a href="https://oauth.net/2/">OAuth 2</a> & <a href="https://www.okta.com/blog/2021/02/single-sign-on-sso/">SSO</a>`,
          }),
        ],
      ),
      DescriptionLine.fromData(
        {
          symbol: Build,
          html: 'Infrastructure and tooling',
        },
        [
          DescriptionLine.fromData({
            symbol: Robot2,
            html: '<a href="https://about.gitlab.com/topics/ci-cd/">CI/CD</a> pipelines',
          }),
          DescriptionLine.fromData({
            symbol: Terminal,
            html: 'Shell scripting',
          }),
          DescriptionLine.fromData({
            symbol: DeployedCode,
            html: '<a href="https://aws.amazon.com/what-is/containerization/">Containerization</a>',
          }),
          DescriptionLine.fromData({
            symbol: Cloud,
            html: `<a href="https://github.com/cncf/toc/blob/main/DEFINITION.md">Cloud native</a> \
<span class="sr-only">and</span><span aria-hidden="true">&</span> \
<a href="https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac" \
aria-label="Infrastructure as Code">IaC</a>`,
            text: `Cloud native and Infrastructure as Code (IaC)`,
          }),
        ],
      ),
    ],
  ),
  DescriptionLine.fromData({
    symbol: Security,
    html: `With <a href="https://www.cisa.gov/securebydesign#:~:text=What%20is%20Secure%20by%20Design%3F">security in mind</a>`,
  }),
]

const DOMAIN_NAME = `${NICKNAME}.com`

const getDescriptionFromTitleAndLines = (
  title: string,
  lines: readonly DescriptionLine[],
): string => {
  const formatter = new Intl.ListFormat('en')
  return [`${title}. `]
    .concat(
      lines.flatMap((line, index) => [
        line.data?.text.replace(/:$/, '') ?? '',
        line.children.length
          ? ' ' +
            formatter.format(
              line.children.map(
                (subLine) => subLine.data?.text.toLowerCase() ?? '',
              ),
            )
          : '',
        index != lines.length - 1 ? '. ' : '',
      ]),
    )
    .join('')
}
export const METADATA = {
  nickname: NICKNAME,
  realName: REAL_NAME,
  twitterUsername: `@${NICKNAME}`,
  title: TITLE,
  siteName: `${REAL_NAME} 🔗 @${NICKNAME}`,
  descriptionLines: DESCRIPTION_LINES,
  description: getDescriptionFromTitleAndLines(TITLE, DESCRIPTION_LINES).concat(
    '. Get to know me more here',
  ),
  domainName: DOMAIN_NAME,
  authorUrl: new URL(`https://${DOMAIN_NAME}`),
  // Chosen neutral15
  themeColor: '#282828',
}

export type Metadata = typeof METADATA
