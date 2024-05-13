import { LanguageItem } from '../language-item'

export const makeLanguageItem = (
  overrides: Partial<LanguageItem> = {},
): LanguageItem => ({
  name: overrides.name ?? 'Sealandic',
  fluency: overrides.fluency ?? 'Awesomic',
  comment: overrides.comment,
})
