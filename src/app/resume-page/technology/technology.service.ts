import { Injectable } from '@angular/core'
import SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES from './simple-icons-display-name-and-color-entries.json'
import { CUSTOM_DISPLAY_NAME_ENTRIES } from './custom-display-name-entries'

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  public getDisplayName(slug: string): string | undefined {
    return DISPLAY_NAME_BY_SLUG.get(slug)
  }
}

const DISPLAY_NAME_BY_SLUG = new Map<string, string>(
  [
    ...SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES,
    ...CUSTOM_DISPLAY_NAME_ENTRIES,
  ].map(([slug, displayName]) => [slug, displayName] as const),
)
