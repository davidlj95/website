import { Social } from '../basics-service'

export const makeSocial = (overrides: Partial<Social> = {}): Social => ({
  label: 'social',
  icon: 'SOCIAL-ICON',
  text: 'social text',
  url: new URL('https://example.com/social'),
  ...overrides,
})
