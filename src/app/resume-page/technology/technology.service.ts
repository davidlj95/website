import { Injectable } from '@angular/core'
import { Technology } from '../projects-section/project-item/project-item'
import SIMPLE_ICONS_JSON from '@common/simple-icons.json'
import { SimpleIcon } from 'simple-icons'
import { TechnologyItem } from './technology-item'
import { DomSanitizer } from '@angular/platform-browser'

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
      displayName: technology.id.replace('-', ' '),
    }
  }
}

type ReducedSimpleIcon = Pick<SimpleIcon, 'title' | 'slug' | 'svg' | 'hex'>
const SIMPLE_ICONS_BY_SLUG = Object.values(SIMPLE_ICONS_JSON).reduce(
  (map, icon) => {
    map.set(icon.slug, icon)
    return map
  },
  new Map<string, ReducedSimpleIcon>(),
)

const getSimpleIconByTechnologyId = (
  technologyId: string,
): ReducedSimpleIcon | undefined => {
  return SIMPLE_ICONS_BY_SLUG.get(technologyId)
}
