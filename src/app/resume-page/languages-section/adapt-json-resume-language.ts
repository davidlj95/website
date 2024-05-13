import { LanguageItem } from './language-item/language-item'
import resume from '../../../../assets/resume.json'
import { InjectionToken } from '@angular/core'

export type AdaptJsonResumeLanguage = (
  language: JsonResumeLanguage,
) => LanguageItem
export const ADAPT_JSON_RESUME_LANGUAGE =
  new InjectionToken<AdaptJsonResumeLanguage>(
    isDevMode ? 'AdaptJsonResumeLanguage' : 'AJRL',
    {
      factory: () => (language) => ({
        name: language.language,
        comment: language.comment,
        fluency: language.fluency,
      }),
    },
  )
export type JsonResumeLanguage = (typeof resume.languages)[number]
