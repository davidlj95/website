import JSON_RESUME from 'data/resume.json' with { type: 'json' }
import * as icons from 'simple-icons'
import { SimpleIcon } from 'simple-icons'
import { mkdir, writeFile } from 'fs/promises'
import { join, resolve } from 'path'
import { objectToJson } from './utils/object-to-json'
import { isMain } from './utils/is-main'
import { Log } from './utils/log'
import { getAndCreateGeneratedDataDir } from './utils/get-and-create-generated-data-dir'
import { EXTRA_TECH_TITLES } from './data/extra-tech-titles'
import { TechsIndex } from 'data/techs'

async function generateTechs() {
  Log.info('Generating techs exports')
  const usedTechnologies = findUsedTechs(JSON_RESUME.projects)
  await Promise.all([createIndex, createIcons].map((f) => f(usedTechnologies)))
}

interface TechWithIcon {
  slug: string
  title: string
  svg: string | undefined
  hex: string | undefined
}

function findUsedTechs(
  projects: typeof JSON_RESUME.projects,
): readonly TechWithIcon[] {
  if (projects.length > 0) {
    Log.info('Found %d projects', projects.length)
  } else {
    Log.info('No projects found on JSON Resume')
    process.exit()
  }

  const techItems = projects.flatMap((project) => project.technologies ?? [])
  if (techItems.length > 0) {
    Log.info('Found %d tech items specified', techItems.length)
  } else {
    Log.info('No tech items specified')
    process.exit()
  }

  const techSlugs = [...new Set(techItems.map((tech) => tech.slug))]
  Log.item('Where %d are unique tech slugs', techSlugs.length)

  const simpleIconBySlug = new Map<string, SimpleIcon>(
    (Object.values(icons) as readonly SimpleIcon[]).map((icon) => [
      icon.slug,
      icon,
    ]),
  )
  Log.info('Loaded %d simple icons', simpleIconBySlug.size)

  const extraTechTitles = new Map<string, string>(EXTRA_TECH_TITLES)
  Log.info('Loaded %d extra tech titles', extraTechTitles.size)

  return techSlugs.map<TechWithIcon>((slug) => {
    const simpleIcon = simpleIconBySlug.get(slug)
    const title = simpleIcon?.title ?? extraTechTitles.get(slug)
    if (!title) {
      Log.error(`'${slug}' tech has no icon neither title`)
      process.exit(1)
    }
    return {
      slug,
      title,
      svg: simpleIcon?.svg,
      hex: simpleIcon?.hex,
    }
  })
}

async function createIndex(icons: readonly TechWithIcon[]) {
  const filepath = resolve(await getAndCreateGeneratedDataDir(), 'techs.json')
  Log.info('Writing index file')
  Log.item(filepath)
  const indexJson = icons.map(({ slug, title, hex, svg }) => [
    slug,
    title,
    svg !== undefined,
    hex ?? null,
  ]) satisfies TechsIndex
  return writeFile(filepath, objectToJson(indexJson))
}

async function createIcons(icons: readonly TechWithIcon[]) {
  Log.info('Writing icon files')
  const ICONS_DIR = join(await getAndCreateGeneratedDataDir(), 'simple-icons')
  Log.item(ICONS_DIR)
  await mkdir(ICONS_DIR, { recursive: true })
  await Promise.all(
    icons.map((icon) => {
      if (icon.svg) {
        return writeFile(join(ICONS_DIR, `${icon.slug}.svg`), icon.svg)
      }
    }),
  )
}

if (isMain(import.meta.url)) {
  await generateTechs()
}
