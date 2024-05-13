import { LanguageItem } from '../language-item'

export const makeLanguageItem = (
  overrides: Partial<LanguageItem> = {},
): LanguageItem => ({
  name: overrides.name ?? 'Sealandic',
  fluency: overrides.fluency ?? 'Awesomic',
  tag: overrides.tag ?? 'en',
  comment: overrides.comment,
})
