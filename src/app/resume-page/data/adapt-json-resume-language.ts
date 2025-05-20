import { Language } from './language'
import { InjectionToken } from '@angular/core'
import { JsonResumeLanguage } from '../json-resume/types'

/** @visibleForTesting */
export type AdaptJsonResumeLanguage = (language: JsonResumeLanguage) => Language
export const ADAPT_JSON_RESUME_LANGUAGE =
  new InjectionToken<AdaptJsonResumeLanguage>(
    /* istanbul ignore next */
    isDevMode ? 'AdaptJsonResumeLanguage' : 'AJRL',
    {
      // tag: ISO 639-1 2 char tag
      // https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
      factory:
        () =>
        ({ language, comment, fluency, tag }) => ({
          name: language,
          comment,
          fluency,
          tag,
        }),
    },
  )
