import { Injectable } from '@angular/core'
import SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES from './simple-icons-display-name-and-color-entries.json'
import { TechnologyIcon } from './technology-item'
import { DomSanitizer } from '@angular/platform-browser'
import { CUSTOM_DISPLAY_NAME_AND_COLOR_ENTRIES } from './custom-display-name-and-color-entries'

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  constructor(private readonly _domSanitizer: DomSanitizer) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getIcon(id: string): TechnologyIcon | null {
    //const icon = ICONS_BY_SLUG.get(id)
    //if (icon) {
    //  return {
    //    svg: this._domSanitizer.bypassSecurityTrustHtml(icon.svg),
    //    color: `#${icon.hex}`,
    //  }
    //}
    return null
  }

  public getDisplayName(slug: string): string | null {
    return DISPLAY_NAME_BY_SLUG.get(slug) ?? null
  }
}

const ALL_DISPLAY_NAME_AND_COLOR_ENTRIES = [
  ...SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES,
  ...CUSTOM_DISPLAY_NAME_AND_COLOR_ENTRIES,
]
//const ICONS_BY_SLUG = ALL_ICONS.reduce((map, icon) => {
//  map.set(icon.slug, icon)
//  return map
//}, new Map<string, ReducedSimpleIcon>())

const DISPLAY_NAME_BY_SLUG = new Map<string, string>(
  ALL_DISPLAY_NAME_AND_COLOR_ENTRIES.map(
    ([slug, title]) => [slug, title] as const,
  ),
)
