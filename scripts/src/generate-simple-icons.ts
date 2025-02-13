import JSON_RESUME from 'data/resume.json' with { type: 'json' }
import * as icons from 'simple-icons'
import { SimpleIcon } from 'simple-icons'
import { mkdir, writeFile } from 'fs/promises'
import { join, resolve } from 'path'
import { objectToJson } from './utils/object-to-json'
import { isMain } from './utils/is-main'
import { Log } from './utils/log'
import { getAndCreateGeneratedDataDir } from './utils/get-and-create-generated-data-dir'
import { EXTRA_TECHS } from './data/extra-techs'
import { SimpleIconsIndex } from 'data/simple-icons'

async function generateSimpleIcons() {
  Log.info('Generating simple icons exports')
  const neededIcons = findNeededIcons(JSON_RESUME.projects)
  await Promise.all(
    [createIndexFile, createIconFiles].map((f) => f(neededIcons)),
  )
}

type Icon = Pick<SimpleIcon, 'slug' | 'title'> &
  Partial<Pick<SimpleIcon, 'hex' | 'svg'>>

function findNeededIcons(
  projects: typeof JSON_RESUME.projects,
): readonly Icon[] {
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

  const iconsBySlug = new Map<string, SimpleIcon>(
    (Object.values(icons) as readonly SimpleIcon[]).map((icon) => [
      icon.slug,
      icon,
    ]),
  )
  Log.info('Loaded %d simple icons', iconsBySlug.size)

  const extraTechs = new Map<string, string>(EXTRA_TECHS)
  Log.info('Loaded %d extra techs definitions', extraTechs.size)

  return technologySlugs.map<Icon>((slug) => {
    const icon = iconsBySlug.get(slug)
    if (icon) {
      return icon
    }
    const displayName = extraTechs.get(slug)
    if (displayName) {
      return {
        slug,
        title: displayName,
      }
    }
    Log.error(`'${slug}' tech has no icon neither display name`)
    process.exit(1)
  })
}

async function createIndexFile(icons: readonly Icon[]) {
  const filepath = resolve(
    await getAndCreateGeneratedDataDir(),
    'simple-icons.json',
  )
  Log.info('Writing index file')
  Log.item(filepath)
  const indexJson = icons.map(({ slug, title, hex, svg }) => [
    slug,
    title,
    svg !== undefined,
    hex ?? null,
  ]) satisfies SimpleIconsIndex
  return writeFile(filepath, objectToJson(indexJson))
}

async function createIconFiles(icons: readonly Icon[]) {
  Log.info('Writing icon files')
  const SIMPLE_ICONS_DIR = join(
    await getAndCreateGeneratedDataDir(),
    'simple-icons',
  )
  Log.item(SIMPLE_ICONS_DIR)
  await mkdir(SIMPLE_ICONS_DIR, { recursive: true })
  await Promise.all(
    icons.map((icon) => {
      if (icon.svg) {
        return writeFile(join(SIMPLE_ICONS_DIR, `${icon.slug}.svg`), icon.svg)
      }
    }),
  )
}

if (isMain(import.meta.url)) {
  await generateSimpleIcons()
}
