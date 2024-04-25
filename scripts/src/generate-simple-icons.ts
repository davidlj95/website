import * as RESUME_JSON from '../../assets/resume.json'
import * as icons from 'simple-icons'
import { SimpleIcon } from 'simple-icons'
import { getRepositoryRootDir, isMain, Log, objectToJson } from './utils.mjs'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

async function generateSimpleIcons() {
  Log.info('Generating simple icons exports')
  const neededIcons = await findNeededIcons(RESUME_JSON.projects)
  await Promise.all(
    [createDisplayNameAndColorsFile, createIconFiles].map((f) =>
      f(neededIcons),
    ),
  )
}

async function findNeededIcons(projects: typeof RESUME_JSON.projects) {
  if (projects.length > 0) {
    Log.info('Found %d projects', projects.length)
  } else {
    Log.info('No projects found on JSON Resume')
    process.exit()
  }

  const technologies = projects.flatMap((project) => project.technologies ?? [])
  if (technologies.length > 0) {
    Log.info('Found %d technology items specified', technologies.length)
  } else {
    Log.info('No technology items specified')
    process.exit()
  }

  const technologyIds = [
    ...new Set(technologies.map((technology) => technology.id)),
  ]
  Log.item('Where %d are unique technology IDs', technologyIds.length)

  const allIcons = Object.values(icons)
  Log.info('Loaded %d simple icons', allIcons.length)

  const neededIcons = allIcons.filter((icon) =>
    technologyIds.includes(icon.slug),
  )
  Log.info('%d icons match technology IDs', neededIcons.length)
  return neededIcons
}

async function createDisplayNameAndColorsFile(
  neededIcons: ReadonlyArray<SimpleIcon>,
) {
  const filepath = await getTechFilepathFromGitignoreOrThrow(
    'color',
    'display name and color entries',
  )
  Log.info('Writing display name and colors file')
  Log.item(filepath)
  const displayNameAndColorsJson = neededIcons.map(({ slug, title, hex }) => [
    slug,
    title,
    hex,
  ])
  return writeFile(filepath, objectToJson(displayNameAndColorsJson))
}

async function createIconFiles(neededIcons: ReadonlyArray<SimpleIcon>) {
  Log.info('Writing icon files')
  Log.item(SIMPLE_ICONS_DIR)
  await Promise.all(
    neededIcons.map((icon) =>
      writeFile(join(SIMPLE_ICONS_DIR, `${icon.slug}.svg`), icon.svg),
    ),
  )
}

const TECH_DIR = join(
  getRepositoryRootDir(),
  'src',
  'app',
  'resume-page',
  'technology',
)
const TECH_DIR_GITIGNORE = join(TECH_DIR, '.gitignore')

const SIMPLE_ICONS_DIR = join(
  getRepositoryRootDir(),
  'src',
  'assets',
  'simple-icons',
)

const getTechFilepathFromGitignoreOrThrow = async (
  pattern: string,
  fileDescription: string,
) => {
  const filename = (await readFile(TECH_DIR_GITIGNORE, 'utf8'))
    .split('\n')
    .find((line) => line.includes(pattern))
  if (!filename) {
    throw new Error(`${fileDescription} filename not found`)
  }
  return join(TECH_DIR, filename)
}

if (isMain(import.meta.url)) {
  await generateSimpleIcons()
}
