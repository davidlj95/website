import { InjectionToken } from '@angular/core'
import SIMPLE_ICONS_JSON from '@/data/generated/simple-icons.json'
import { Technology } from './technology'
import { SimpleIconsIndex } from '@/data/simple-icons'

export type GetTechnologyFromSlug = (slug: string) => Technology
export const GET_TECHNOLOGY_FROM_SLUG =
  new InjectionToken<GetTechnologyFromSlug>(
    /* istanbul ignore next */
    isDevMode ? 'GetTechnologyFromSlug' : 'GTFS',
    { factory: () => (slug) => TECH_BY_SLUG.get(slug)! },
  )

const TECH_BY_SLUG = new Map<string, Technology>(
  (SIMPLE_ICONS_JSON as unknown as SimpleIconsIndex).map(
    ([slug, title, hasIcon, hex]) =>
      [
        slug,
        {
          slug,
          title,
          hasIcon,
          hex: hex ?? undefined,
        },
      ] as const,
  ),
)
