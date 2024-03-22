import * as RESUME_JSON from '../../assets/resume.json'
import * as icons from 'simple-icons'
import { getRepositoryRootDir, isMain, Log } from './utils.mjs'
import { writeFile } from 'fs/promises'
import { join } from 'path'

async function generateSimpleIcons() {
  Log.info('Generating simple icons exports')
  const projects = RESUME_JSON.projects
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

  const iconsJson = neededIcons.map(({ title, slug, svg, hex }) => ({
    title,
    slug,
    svg,
    hex,
  }))

  await writeFile(SIMPLE_ICONS_FILE, JSON.stringify(iconsJson, null, 2))
  Log.info('Written simple icons file')
  Log.item("File: '%s'", SIMPLE_ICONS_FILE)
}

const SIMPLE_ICONS_FILE = join(
  getRepositoryRootDir(),
  'src',
  'app',
  'common',
  'simple-icons.json',
)

if (isMain(import.meta.url)) {
  await generateSimpleIcons()
}
