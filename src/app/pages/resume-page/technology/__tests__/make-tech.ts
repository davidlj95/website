import { Tech } from '@/data/techs'

export const makeTech = (overrides: Partial<Tech> = {}): Tech => ({
  slug: 'dummy slug',
  title: 'dummy title',
  hasIcon: false,
  hex: undefined,
  ...overrides,
})
