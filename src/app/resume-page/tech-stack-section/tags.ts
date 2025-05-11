import { InjectionToken } from '@angular/core'
import RESUME_JSON from '@/data/resume.json'

export interface TechTag {
  readonly char: TagChar
  readonly name: string
}

export const BACKEND_TAG: TechTag = {
  char: 'b',
  name: 'Backend',
}
export const FRONTEND_TAG: TechTag = {
  char: 'f',
  name: 'Frontend',
}
export const INFRA_TAG: TechTag = {
  char: 'i',
  name: 'Infrastructure',
}
export const LANGUAGE_TAG: TechTag = {
  char: 'l',
  name: 'Language',
}
export const TEST_TAG: TechTag = {
  char: 't',
  name: 'Testing',
}
export const EDITOR_TAG: TechTag = {
  char: 'e',
  name: 'Editor',
}
export const TAGS = [
  BACKEND_TAG,
  FRONTEND_TAG,
  INFRA_TAG,
  LANGUAGE_TAG,
  TEST_TAG,
  EDITOR_TAG,
]

const TAG_CHARS = ['b', 'f', 'i', 'l', 't', 'e', ''] as const
export type TagChar = (typeof TAG_CHARS)[number]
/** @visibleForTesting **/
export const TECHS_TAGS: Record<string, string> = {
  amazonapigateway: 'bi',
  amazoncognito: 'bi',
  amazonec2: 'i',
  amazonecs: 'i',
  amazoneks: 'i',
  amazonelasticache: 'bi',
  amazoniam: 'i',
  amazonrds: 'b',
  amazons3: 'bi',
  anaconda: '',
  android: 'f',
  androidstudio: 'f',
  angular: 'f',
  apachecordova: 'f',
  apachejmeter: 'b',
  awselasticloadbalancing: 'i',
  awssecretsmanager: 'bi',
  bitbucket: '',
  bitcoin: 'b',
  blockcerts: 'b',
  bluetooth: 'f',
  css: 'fl',
  cypress: 'ft',
  datadog: 'i',
  docker: 'i',
  ethereum: 'b',
  express: 'b',
  flask: 'b',
  flutter: 'f',
  git: '',
  github: '',
  githubactions: 'i',
  gitlab: '',
  gitlabcicd: 'i',
  gitlabpages: 'fi',
  googleworkspace: '',
  gradle: '',
  graphite: '',
  helm: 'i',
  heroku: 'i',
  html: 'fl',
  http: '',
  httprest: '',
  ios: 'f',
  jasmine: 'ft',
  java: 'bl',
  javascript: 'fl',
  jest: 't',
  jhipster: 'b',
  jira: '',
  jquery: 'f',
  json: '',
  jsonld: '',
  jsonwebtokens: '',
  junit: 'bt',
  karmarunner: 'ft',
  kotlin: 'bfl',
  kubernetes: 'i',
  linux: 'i',
  liquibase: 'b',
  mariadb: 'b',
  microsoftword: '',
  mongodb: 'b',
  mysql: 'b',
  newrelic: 'i',
  nodedotjs: 'b',
  notion: '',
  npm: '',
  oauth2: '',
  openapiinitiative: 'b',
  php: 'bfl',
  postgresql: 'b',
  pwa: 'f',
  pypi: '',
  pyqt: 'f',
  python: 'bfl',
  'python-unittest': 't',
  readthedocs: '',
  redash: '',
  redis: 'b',
  redsys: 'b',
  redux: 'f',
  rollupdotjs: 'f',
  rspec: 't',
  rubymine: '',
  rubyonrails: 'b',
  sentry: 'i',
  sidekiq: 'b',
  slack: '',
  sphinx: '',
  springboot: 'b',
  sqlalchemy: 'b',
  terraform: 'i',
  travisci: 'i',
  typescript: 'bfl',
  visualstudiocode: '',
  webcomponents: 'f',
  webstorm: '',
  xcode: 'f',
  zenqms: '',
  zoom: '',
}

const TECHS_BY_TAG_CHAR = Object.fromEntries(
  TAG_CHARS.map(
    (char) =>
      [
        char,
        Object.entries(TECHS_TAGS)
          .filter(([, tags]) => tags.includes(char))
          .map(([tech]) => tech),
      ] as const,
  ),
) as unknown as Record<TagChar, readonly string[]>
export const FIND_TECHS_BY_TAG = new InjectionToken<FindTechsByTag>(
  isDevMode ? 'findTechsByTag' : 'FTBT',
  {
    factory: () => findTechsByTag,
  },
)
/** @visibleForTesting **/
export type FindTechsByTag = typeof findTechsByTag
const findTechsByTag = (
  tagChar: TagChar,
  opts: { excludes?: readonly TagChar[]; includes?: readonly TagChar[] } = {},
) => {
  const techsWithTag = TECHS_BY_TAG_CHAR[tagChar]
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
