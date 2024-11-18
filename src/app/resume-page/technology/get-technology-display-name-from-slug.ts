import { InjectionToken } from '@angular/core'
import SIMPLE_ICONS_JSON from '@/data/generated/simple-icons.json'
import { CUSTOM_DISPLAY_NAME_ENTRIES } from './custom-display-name-entries'

export type GetTechnologyDisplayNameFromSlug = (slug: string) => string
export const GET_TECHNOLOGY_DISPLAY_NAME_FROM_SLUG =
  new InjectionToken<GetTechnologyDisplayNameFromSlug>(
    /* istanbul ignore next */
    isDevMode ? 'GetTechnologyDisplayNameFromSlug' : 'GTDNFS',
    { factory: () => (slug) => DISPLAY_NAME_BY_SLUG.get(slug) ?? slug },
  )

const DISPLAY_NAME_BY_SLUG = new Map<string, string>(
  [...SIMPLE_ICONS_JSON, ...CUSTOM_DISPLAY_NAME_ENTRIES].map(
    ([slug, displayName]) => [slug, displayName] as const,
  ),
)
