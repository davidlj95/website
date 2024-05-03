import { Injectable } from '@angular/core'
import SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES from './simple-icons-display-name-and-color-entries.json'
import { CUSTOM_DISPLAY_NAME_AND_COLOR_ENTRIES } from './custom-display-name-and-color-entries'
import { SimpleIcon } from '@/common/simple-icon/simple-icon'

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  public getIcon(slug: string): SimpleIcon | undefined {
    return SIMPLE_ICON_BY_SLUG.get(slug)
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

// noinspection JSUnusedLocalSymbols
const entryToIcon = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [slug, displayName, hex]: [string, string, string],
): [string, SimpleIcon] => [
  slug,
  {
    slug,
    hex,
  },
]

const SIMPLE_ICON_BY_SLUG = new Map<string, SimpleIcon>([
  ...SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES.map(
    ([slug, displayName, color]) => entryToIcon([slug, displayName, color]),
  ),
])
