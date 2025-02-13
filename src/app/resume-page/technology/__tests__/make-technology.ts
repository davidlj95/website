import { Technology } from '../technology'

export const makeTechnology = (
  overrides: Partial<Technology> = {},
): Technology => ({
  slug: 'dummy slug',
  title: 'dummy title',
  hasIcon: false,
  ...overrides,
})
