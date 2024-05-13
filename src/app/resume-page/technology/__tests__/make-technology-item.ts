import { TechnologyItem } from '../technology-item'

export const makeTechnologyItem = (
  overrides: Partial<TechnologyItem> = {},
): TechnologyItem => ({
  slug: overrides.slug ?? 'dummy slug',
  version: overrides.version,
})
