import { InjectionToken } from '@angular/core'
import TECHS_JSON from '@/data/generated/techs.json'
import { Tech, TechsIndex } from '@/data/techs'

export type GetTechnologyFromSlug = (slug: string) => Tech
export const GET_TECHNOLOGY_FROM_SLUG =
  new InjectionToken<GetTechnologyFromSlug>(
    /* istanbul ignore next */
    isDevMode ? 'GetTechnologyFromSlug' : 'GTFS',
    { factory: () => (slug) => TECH_BY_SLUG.get(slug)! },
  )

const TECH_BY_SLUG = new Map<string, Tech>(
  (TECHS_JSON as unknown as TechsIndex).map(
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
