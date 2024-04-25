import { Injectable } from '@angular/core'
import SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES from './simple-icons-display-name-and-color-entries.json'
import { TechnologyIcon } from './technology-item'
import { CUSTOM_DISPLAY_NAME_AND_COLOR_ENTRIES } from './custom-display-name-and-color-entries'
import { ASSETS_PATH } from '@/common/assets-dir'

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  public getIcon(slug: string): TechnologyIcon | undefined {
    return TECHNOLOGY_ICON_BY_SLUG.get(slug)
  }

  public getDisplayName(slug: string): string | undefined {
    return DISPLAY_NAME_BY_SLUG.get(slug)
  }
}

const ALL_DISPLAY_NAME_AND_COLOR_ENTRIES = [
  ...SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES,
  ...CUSTOM_DISPLAY_NAME_AND_COLOR_ENTRIES,
]

const DISPLAY_NAME_BY_SLUG = new Map<string, string>(
  ALL_DISPLAY_NAME_AND_COLOR_ENTRIES.map(
    ([slug, displayName]) => [slug, displayName] as const,
  ),
)
const SIMPLE_ICONS_ASSETS_DIR = `${ASSETS_PATH}/simple-icons`
const CUSTOM_ICONS_ASSETS_DIR = `${ASSETS_PATH}/custom-icons`
const SVG_EXT = '.svg'

const entryToIcon = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [slug, displayName, color]: [string, string, string],
  assetsDir: string,
): [string, TechnologyIcon] => [
  slug,
  {
    path: `${assetsDir}/${slug}${SVG_EXT}`,
    color: `#${color}`,
  },
]

const maybeEntryToIcon = (
  [slug, displayName, color]: [string, string, string | undefined],
  assetsDir: string,
): [string, TechnologyIcon] | undefined =>
  color !== undefined
    ? entryToIcon([slug, displayName, color], assetsDir)
    : undefined

const TECHNOLOGY_ICON_BY_SLUG = new Map<string, TechnologyIcon>([
  ...SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES.map(
    ([slug, displayName, color]) =>
      entryToIcon([slug, displayName, color], SIMPLE_ICONS_ASSETS_DIR),
  ),
  //...CUSTOM_DISPLAY_NAME_AND_COLOR_ENTRIES.map(([slug, displayName, color]) =>
  //  maybeEntryToIcon([slug, displayName, color], CUSTOM_ICONS_ASSETS_DIR),
  //).filter(isNotUndefined),
])
