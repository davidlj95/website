import { LanguageItem } from './language-item/language-item'
import resume from '@/data/resume.json'
import { InjectionToken } from '@angular/core'

export type AdaptJsonResumeLanguage = (
  language: JsonResumeLanguage,
) => LanguageItem
export const ADAPT_JSON_RESUME_LANGUAGE =
  new InjectionToken<AdaptJsonResumeLanguage>(
    /* istanbul ignore next */
    isDevMode ? 'AdaptJsonResumeLanguage' : 'AJRL',
    {
      // tag: ISO 639-1 2 char tag
      // https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
      factory: () => (language) => ({
        name: language.language,
        comment: language.comment,
        fluency: language.fluency,
        tag: language.tag,
      }),
    },
  )
export type JsonResumeLanguage = (typeof resume.languages)[number]
