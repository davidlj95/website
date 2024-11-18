import { SimpleIcon } from '@/common/simple-icon/simple-icon'
import { InjectionToken } from '@angular/core'
import SIMPLE_ICONS_JSON from '@/data/generated/simple-icons.json'

export type GetTechnologyIconFromSlug = (slug: string) => SimpleIcon | undefined
export const GET_TECHNOLOGY_ICON_FROM_SLUG =
  new InjectionToken<GetTechnologyIconFromSlug>(
    /* istanbul ignore next */
    isDevMode ? 'GetTechnologyIconFromSlug' : 'GTIFS',
    { factory: () => (slug) => SIMPLE_ICON_BY_SLUG.get(slug) },
  )

const SIMPLE_ICON_BY_SLUG = new Map<string, SimpleIcon>([
  ...SIMPLE_ICONS_JSON.map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([slug, displayName, hex]) =>
      [
        slug,
        {
          slug,
          hex,
        },
      ] as const,
  ),
])
