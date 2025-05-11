import { InjectionToken } from '@angular/core'
import RESUME_JSON from '@/data/resume.json'

/** @knipIgnore **/
export const BACKEND_TAG = 'backend'
/** @knipIgnore **/
export const FRONTEND_TAG = 'frontend'
/** @knipIgnore **/
export const INFRA_TAG = 'infra'
/** @knipIgnore **/
export const LANGUAGE_TAG = 'language'
/** @knipIgnore **/
export const TEST_TAG = 'testing'
/** @knipIgnore **/
export const EDITOR_TAG = 'editor'
/** @knipIgnore **/
export const CLOUD_TAG = 'cloud'
/** @knipIgnore **/
export const PLATFORM_TAG = 'platform'
/** @knipIgnore **/
export const FRAMEWORK_TAG = 'framework'
/** @knipIgnore **/
export const VCS_TAG = 'vcs'
/** @knipIgnore **/
export const CRYPTO_TAG = 'crypto'
/** @knipIgnore **/
export const COMMS_TAG = 'comms'
/** @knipIgnore **/
export const SECURITY_TAG = 'security'
/** @knipIgnore **/
export const MOBILE_TAG = 'mobile'
/** @knipIgnore **/
export const CICD_TAG = 'cicd'
/** @knipIgnore **/
export const PRODUCTIVITY_TAG = 'productivity'
/** @knipIgnore **/
export const DATA_FORMAT_TAG = 'data-format'
/** @knipIgnore **/
export const DATABASE_TAG = 'database'
/** @knipIgnore **/
export const RUNTIME_TAG = 'runtime'
/** @knipIgnore **/
export const DOCS_TAG = 'docs'
/** @knipIgnore **/
export const PAYMENTS_TAG = 'payments'
/** @knipIgnore **/
export const MONITORING_TAG = 'monitoring'
/** @knipIgnore **/
export const QUEUING_TAG = 'queuing'
/** @knipIgnore **/
export const DATA_TAG = 'data'
/** @knipIgnore **/
export const PACKAGING_TAG = 'packaging'
/** @knipIgnore **/
export const PACKAGE_MANAGEMENT = 'package-mgmt'

export const TECH_TAGS = [
  BACKEND_TAG,
  FRONTEND_TAG,
  INFRA_TAG,
  LANGUAGE_TAG,
  TEST_TAG,
  EDITOR_TAG,
  CLOUD_TAG,
  PLATFORM_TAG,
  FRAMEWORK_TAG,
  VCS_TAG,
  CRYPTO_TAG,
  COMMS_TAG,
  SECURITY_TAG,
  MOBILE_TAG,
  CICD_TAG,
  PRODUCTIVITY_TAG,
  DATA_FORMAT_TAG,
  DATABASE_TAG,
  RUNTIME_TAG,
  DOCS_TAG,
  PAYMENTS_TAG,
  MONITORING_TAG,
  QUEUING_TAG,
  DATA_TAG,
  PACKAGING_TAG,
  PACKAGE_MANAGEMENT,
] as const

export type TechTag = (typeof TECH_TAGS)[number]

const TECH_TAG_NAMES: Record<TechTag, string> = {
  [BACKEND_TAG]: 'Backend',
  [FRONTEND_TAG]: 'Frontend',
  [INFRA_TAG]: 'Infrastructure',
  [LANGUAGE_TAG]: 'Languages',
  [TEST_TAG]: 'Testing',
  [EDITOR_TAG]: 'Editors',
  [CLOUD_TAG]: 'Cloud',
  [PLATFORM_TAG]: 'Platforms',
  [FRAMEWORK_TAG]: 'Frameworks',
  [VCS_TAG]: 'Version Control',
  [CRYPTO_TAG]: 'Blockchain',
  [COMMS_TAG]: 'Communications',
  [SECURITY_TAG]: 'Security',
  [MOBILE_TAG]: 'Mobile',
  [CICD_TAG]: 'CI/CD',
  [PRODUCTIVITY_TAG]: 'Productivity',
  [DATA_FORMAT_TAG]: 'Data format',
  [DATABASE_TAG]: 'Database',
  [RUNTIME_TAG]: 'Runtime',
  [DOCS_TAG]: 'Docs',
  [PAYMENTS_TAG]: 'Payments',
  [MONITORING_TAG]: 'Monitoring',
  [QUEUING_TAG]: 'Queuing',
  [DATA_TAG]: 'Data',
  [PACKAGING_TAG]: 'Packaging',
  [PACKAGE_MANAGEMENT]: 'Package management',
}

export const getTechTagName = (tag: TechTag): string => TECH_TAG_NAMES[tag]

/** @visibleForTesting **/
export const TECHS_TAGS: Record<string, readonly TechTag[]> = {
  amazonapigateway: [BACKEND_TAG, INFRA_TAG, CLOUD_TAG],
  amazoncognito: [BACKEND_TAG, INFRA_TAG, CLOUD_TAG, SECURITY_TAG],
  amazonec2: [INFRA_TAG, CLOUD_TAG],
  amazonecs: [INFRA_TAG, CLOUD_TAG],
  amazoneks: [INFRA_TAG, CLOUD_TAG],
  amazonelasticache: [INFRA_TAG, CLOUD_TAG, BACKEND_TAG],
  amazoniam: [INFRA_TAG, CLOUD_TAG, SECURITY_TAG],
  amazonrds: [BACKEND_TAG, CLOUD_TAG],
  amazons3: [INFRA_TAG, CLOUD_TAG, BACKEND_TAG],
  anaconda: [PACKAGE_MANAGEMENT, DATA_TAG],
  android: [FRONTEND_TAG, PLATFORM_TAG, MOBILE_TAG],
  androidstudio: [FRONTEND_TAG, EDITOR_TAG, MOBILE_TAG],
  angular: [FRONTEND_TAG, FRAMEWORK_TAG],
  apachecordova: [FRONTEND_TAG, FRAMEWORK_TAG, MOBILE_TAG],
  apachejmeter: [BACKEND_TAG, TEST_TAG],
  awselasticloadbalancing: [INFRA_TAG, CLOUD_TAG],
  awssecretsmanager: [BACKEND_TAG, INFRA_TAG, CLOUD_TAG, SECURITY_TAG],
  bitbucket: [VCS_TAG],
  bitcoin: [BACKEND_TAG, CRYPTO_TAG, SECURITY_TAG],
  blockcerts: [BACKEND_TAG, FRONTEND_TAG, CRYPTO_TAG, SECURITY_TAG],
  bluetooth: [FRONTEND_TAG, COMMS_TAG, MOBILE_TAG],
  css: [FRONTEND_TAG, LANGUAGE_TAG],
  cypress: [FRONTEND_TAG, TEST_TAG],
  datadog: [BACKEND_TAG, INFRA_TAG, CLOUD_TAG, MONITORING_TAG],
  docker: [INFRA_TAG, PACKAGING_TAG],
  ethereum: [BACKEND_TAG, FRONTEND_TAG, CRYPTO_TAG],
  express: [BACKEND_TAG, FRAMEWORK_TAG],
  flask: [BACKEND_TAG, FRAMEWORK_TAG],
  flutter: [FRONTEND_TAG, FRAMEWORK_TAG, MOBILE_TAG],
  git: [VCS_TAG],
  github: [VCS_TAG],
  githubactions: [INFRA_TAG, CICD_TAG],
  gitlab: [VCS_TAG],
  gitlabcicd: [INFRA_TAG, CICD_TAG],
  gitlabpages: [INFRA_TAG, FRONTEND_TAG, CLOUD_TAG],
  googleworkspace: [PRODUCTIVITY_TAG],
  gradle: [PACKAGE_MANAGEMENT, PACKAGING_TAG],
  graphite: [],
  helm: [INFRA_TAG],
  heroku: [INFRA_TAG, CLOUD_TAG],
  html: [FRONTEND_TAG, LANGUAGE_TAG],
  http: [BACKEND_TAG, FRONTEND_TAG, COMMS_TAG],
  httprest: [BACKEND_TAG, FRONTEND_TAG, COMMS_TAG],
  ios: [FRONTEND_TAG, PLATFORM_TAG, MOBILE_TAG],
  jasmine: [FRONTEND_TAG, TEST_TAG],
  java: [BACKEND_TAG, FRONTEND_TAG, LANGUAGE_TAG, MOBILE_TAG],
  javascript: [BACKEND_TAG, FRONTEND_TAG, LANGUAGE_TAG],
  jest: [FRONTEND_TAG, TEST_TAG],
  jhipster: [BACKEND_TAG, FRONTEND_TAG, FRAMEWORK_TAG],
  jira: [PRODUCTIVITY_TAG],
  jquery: [FRONTEND_TAG, LANGUAGE_TAG],
  json: [FRONTEND_TAG, BACKEND_TAG, DATA_FORMAT_TAG],
  jsonld: [FRONTEND_TAG, BACKEND_TAG, DATA_FORMAT_TAG],
  jsonwebtokens: [FRONTEND_TAG, BACKEND_TAG, DATA_FORMAT_TAG, SECURITY_TAG],
  junit: [BACKEND_TAG, TEST_TAG],
  karmarunner: [FRONTEND_TAG, TEST_TAG],
  kotlin: [BACKEND_TAG, FRONTEND_TAG, LANGUAGE_TAG, MOBILE_TAG],
  kubernetes: [INFRA_TAG, CLOUD_TAG],
  linux: [INFRA_TAG, PLATFORM_TAG],
  liquibase: [BACKEND_TAG, DATABASE_TAG],
  mariadb: [BACKEND_TAG, DATABASE_TAG],
  microsoftword: [PRODUCTIVITY_TAG],
  mongodb: [BACKEND_TAG, DATABASE_TAG],
  mysql: [BACKEND_TAG, DATABASE_TAG],
  newrelic: [BACKEND_TAG, INFRA_TAG, CLOUD_TAG, MONITORING_TAG],
  nodedotjs: [BACKEND_TAG, FRONTEND_TAG, RUNTIME_TAG],
  notion: [PRODUCTIVITY_TAG],
  npm: [PACKAGE_MANAGEMENT, FRONTEND_TAG, BACKEND_TAG, PACKAGING_TAG],
  oauth2: [SECURITY_TAG, COMMS_TAG],
  openapiinitiative: [BACKEND_TAG, FRONTEND_TAG, COMMS_TAG],
  php: [BACKEND_TAG, FRONTEND_TAG, LANGUAGE_TAG],
  postgresql: [BACKEND_TAG, DATABASE_TAG],
  pwa: [FRONTEND_TAG, FRAMEWORK_TAG, MOBILE_TAG],
  pypi: [PACKAGE_MANAGEMENT],
  pyqt: [FRONTEND_TAG, FRAMEWORK_TAG],
  python: [BACKEND_TAG, FRONTEND_TAG, DATA_TAG, LANGUAGE_TAG],
  'python-unittest': [BACKEND_TAG, FRONTEND_TAG, TEST_TAG],
  readthedocs: [DOCS_TAG],
  redash: [DATABASE_TAG, DATA_TAG],
  redis: [BACKEND_TAG, DATABASE_TAG],
  redsys: [BACKEND_TAG, SECURITY_TAG],
  redux: [FRONTEND_TAG, FRAMEWORK_TAG],
  rollupdotjs: [FRONTEND_TAG, PACKAGING_TAG],
  rspec: [BACKEND_TAG, TEST_TAG],
  ruby: [BACKEND_TAG, LANGUAGE_TAG],
  rubymine: [BACKEND_TAG, EDITOR_TAG],
  rubyonrails: [BACKEND_TAG, FRAMEWORK_TAG],
  sentry: [BACKEND_TAG, INFRA_TAG, CLOUD_TAG, MONITORING_TAG],
  sidekiq: [BACKEND_TAG, QUEUING_TAG],
  slack: [PRODUCTIVITY_TAG],
  sphinx: [DOCS_TAG],
  springboot: [BACKEND_TAG, FRAMEWORK_TAG],
  sqlalchemy: [BACKEND_TAG, DATABASE_TAG],
  terraform: [INFRA_TAG],
  travisci: [INFRA_TAG, CICD_TAG],
  typescript: [BACKEND_TAG, FRONTEND_TAG, LANGUAGE_TAG],
  visualstudiocode: [BACKEND_TAG, FRONTEND_TAG, EDITOR_TAG],
  webcomponents: [FRONTEND_TAG, FRAMEWORK_TAG],
  webstorm: [BACKEND_TAG, FRONTEND_TAG, EDITOR_TAG],
  xcode: [FRONTEND_TAG, EDITOR_TAG, MOBILE_TAG],
  zenqms: [PRODUCTIVITY_TAG],
  zoom: [PRODUCTIVITY_TAG],
}

export const TECHS_BY_TAG = Object.fromEntries(
  TECH_TAGS.map(
    (tag) =>
      [
        tag,
        Object.entries(TECHS_TAGS)
          .filter(([, tags]) => tags.includes(tag))
          .map(([tech]) => tech),
      ] as const,
  ),
) as unknown as Record<TechTag, readonly string[]>

export const FIND_TECHS_BY_TAG = new InjectionToken<FindTechsByTag>(
  isDevMode ? 'findTechsByTag' : 'FTBT',
  {
    factory: () => findTechsByTag,
  },
)
/** @visibleForTesting **/
export type FindTechsByTag = typeof findTechsByTag
const findTechsByTag = (
  tag: TechTag,
  opts: { excludes?: readonly TechTag[]; includes?: readonly TechTag[] } = {},
) => {
  const techsWithTag = TECHS_BY_TAG[tag]
  const { includes, excludes } = opts
  const withIncludes = includes?.length
    ? techsWithTag.filter((tech) =>
        includes.some((tag) => TECHS_TAGS[tech].includes(tag)),
      )
    : techsWithTag
  const withoutExcludes = excludes?.length
    ? withIncludes.filter((tech) =>
        excludes.every((tag) => !TECHS_TAGS[tech].includes(tag)),
      )
    : withIncludes
  return [...withoutExcludes].sort(
    (a, b) => TECHS_RELEVANCE_SCORE[b] - TECHS_RELEVANCE_SCORE[a],
  )
}

const TECHS_RELEVANCE_SCORE: Record<string, number> = (() => {
  const projects = RESUME_JSON.projects.map<{
    start: number
    end: number
    techs: readonly string[]
  }>((project) => ({
    start: new Date(project.startDate).getTime(),
    end: new Date(project.endDate).getTime(),
    techs: project.technologies.map((tech) => tech.slug),
  }))
  const techsAndTimes = projects.flatMap<readonly [string, number, number]>(
    ({ techs, start, end }) => techs.map((tech) => [tech, start, end]),
  )
  const maxDuration = Math.max(
    ...projects.map((project) => project.end - project.start),
  )
  const [careerStart, careerEnd] = [
    Math.min(...projects.map((project) => project.start)),
    Math.max(...projects.map((project) => project.end)),
  ]
  const careerTimespan = careerEnd - careerStart
  const scoreByTech: Record<string, number> = {}
  for (const [tech, start, end] of techsAndTimes) {
    const durationScore = (end - start) / maxDuration
    const linearRecencyScore = (end - careerStart) / careerTimespan
    const growthRate = 3
    const expRecencyScore =
      (Math.E ** (linearRecencyScore * growthRate) - 1) /
      (Math.E ** growthRate - 1)
    const score = durationScore * expRecencyScore
    scoreByTech[tech] = (scoreByTech[tech] || 0) + score
  }
  return scoreByTech
})()
