import { Language } from '../language'

export const makeLanguage = (overrides: Partial<Language> = {}): Language => ({
  name: 'Sealandic',
  fluency: 'Awesomic',
  tag: 'sa',
  ...overrides,
})
