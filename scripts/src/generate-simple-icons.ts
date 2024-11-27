import JSON_RESUME from '@/data/resume.json' with { type: 'json' }
import * as icons from 'simple-icons'
import { SimpleIcon } from 'simple-icons'
import { mkdir, writeFile } from 'fs/promises'
import { join, resolve } from 'path'
import { objectToJson } from './utils/object-to-json'
import { isMain } from './utils/is-main'
import { Log } from './utils/log'
import { getAndCreateGeneratedDataDir } from './utils/get-and-create-generated-data-dir'

async function generateSimpleIcons() {
  Log.info('Generating simple icons exports')
  const neededIcons = findNeededIcons(JSON_RESUME.projects)
  await Promise.all(
    [createDisplayNameAndColorsFile, createIconFiles].map((f) =>
      f(neededIcons),
    ),
  )
}

function findNeededIcons(
  projects: typeof JSON_RESUME.projects,
): readonly SimpleIcon[] {
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

  const technologySlugs = [
    ...new Set(technologies.map((technology) => technology.slug)),
  ]
  Log.item('Where %d are unique technology slugs', technologySlugs.length)

  const allIcons = Object.values(icons) as readonly SimpleIcon[]
  Log.info('Loaded %d simple icons', allIcons.length)

  const neededIcons = allIcons.filter((icon) =>
    technologySlugs.includes(icon.slug),
  )
  Log.info('%d icons match technology slugs', neededIcons.length)
  return neededIcons
}

async function createDisplayNameAndColorsFile(
  neededIcons: readonly SimpleIcon[],
) {
  const filepath = resolve(
    await getAndCreateGeneratedDataDir(),
    'simple-icons.json',
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

async function createIconFiles(neededIcons: readonly SimpleIcon[]) {
  Log.info('Writing icon files')
  const SIMPLE_ICONS_DIR = join(
    await getAndCreateGeneratedDataDir(),
    'simple-icons',
  )
  Log.item(SIMPLE_ICONS_DIR)
  await mkdir(SIMPLE_ICONS_DIR, { recursive: true })
  await Promise.all(
    neededIcons.map((icon) =>
      writeFile(join(SIMPLE_ICONS_DIR, `${icon.slug}.svg`), icon.svg),
    ),
  )
}

if (isMain(import.meta.url)) {
  await generateSimpleIcons()
}
