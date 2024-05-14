import { TechnologyItem } from '../technology-item'

export const makeTechnologyItem = (
  overrides: Partial<TechnologyItem> = {},
): TechnologyItem => ({
  slug: 'dummy slug',
  ...overrides,
})
