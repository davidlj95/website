import { Injectable } from '@angular/core'
import { Technology } from '../projects-section/project-item/project-item'
import SIMPLE_ICONS_JSON from './simple-icons.json'
import { TechnologyItem } from './technology-item'
import { DomSanitizer } from '@angular/platform-browser'
import { ReducedSimpleIcon } from './reduced-simple-icon'
import { EXTRA_ICONS } from './extra-icons'

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  constructor(private readonly _domSanitizer: DomSanitizer) {}

  getTechnologyItem(technology: Technology): TechnologyItem {
    const reducedSimpleIcon = getSimpleIconByTechnologyId(technology.id)
    const baseTechnologyItem = { ...technology }
    if (reducedSimpleIcon) {
      return {
        ...baseTechnologyItem,
        displayName: reducedSimpleIcon.title,
        icon: {
          svg: this._domSanitizer.bypassSecurityTrustHtml(
            reducedSimpleIcon.svg,
          ),
          color: `#${reducedSimpleIcon.hex}`,
        },
      }
    }
    return {
      ...baseTechnologyItem,
      displayName:
        EXTRA_DISPLAY_NAMES.get(technology.id) ??
        technology.id.replace('-', ' '),
    }
  }
}

const ALL_ICONS = [...Object.values(SIMPLE_ICONS_JSON), ...EXTRA_ICONS]
const SIMPLE_ICONS_BY_SLUG = ALL_ICONS.reduce((map, icon) => {
  map.set(icon.slug, icon)
  return map
}, new Map<string, ReducedSimpleIcon>())

const getSimpleIconByTechnologyId = (
  technologyId: string,
): ReducedSimpleIcon | undefined => {
  return SIMPLE_ICONS_BY_SLUG.get(technologyId)
}

const EXTRA_DISPLAY_NAMES = new Map<string, string>([
  ['http', 'HTTP'],
  ['httprest', 'RESTful'],
])
