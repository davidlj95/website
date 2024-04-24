import { Injectable } from '@angular/core'
import SIMPLE_ICONS_JSON from './simple-icons.json'
import { TechnologyIcon } from './technology-item'
import { DomSanitizer } from '@angular/platform-browser'
import { EXTRA_ICONS } from './extra-icons'

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
    //const icon = ICONS_BY_SLUG.get(slug)
    //if (icon) {
    //  return icon.title
    //}
    //const extraDisplayName = EXTRA_DISPLAY_NAMES.get(slug)
    //if (extraDisplayName) {
    //  return extraDisplayName
    //}
    //return null
    return DISPLAY_NAME_BY_SLUG.get(slug) ?? null
  }
}

const ALL_ICONS = [...Object.values(SIMPLE_ICONS_JSON), ...EXTRA_ICONS]
//const ICONS_BY_SLUG = ALL_ICONS.reduce((map, icon) => {
//  map.set(icon.slug, icon)
//  return map
//}, new Map<string, ReducedSimpleIcon>())

export const EXTRA_DISPLAY_NAMES: ReadonlyArray<[string, string]> = [
  ['http', 'HTTP'],
  ['httprest', 'RESTful'],
  ['googleworkspace', 'Google Workspace'],
  ['oauth2', 'OAuth 2.0'],
  ['junit', 'JUnit'],
  ['jsonld', 'JSON LD'],
  ['blockcerts', 'Blockcerts'],
  ['gitlabcicd', 'GitLab CI/CD'],
  ['gitlabpages', 'GitLab Pages'],
  ['webcomponents', 'Web Components'],
  ['unittest', "Python's `unittest`"],
  ['pyqt', 'PyQt'],
  ['java', 'Java'],
  ['html', 'HTML'],
  ['css', 'CSS'],
  ['zenqms', 'ZenQMS'],
]
const DISPLAY_NAME_BY_SLUG = new Map<string, string>([
  ...Object.values(ALL_ICONS).reduce<ReadonlyArray<[string, string]>>(
    (entries, icon) => [...entries, [icon.slug, icon.title]],
    [],
  ),
  ...EXTRA_DISPLAY_NAMES,
])
