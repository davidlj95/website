import { LanguageItem } from './language-item/language-item'
import { inject, InjectionToken } from '@angular/core'
import resume from '@/data/resume.json'
import { ADAPT_JSON_RESUME_LANGUAGE } from './adapt-json-resume-language'

export type GetLanguageItems = () => readonly LanguageItem[]
export const GET_LANGUAGE_ITEMS = new InjectionToken<GetLanguageItems>(
  /* istanbul ignore next */
  isDevMode ? 'GetLanguageItems' : 'GLI',
  {
    factory: () => {
      const languages = inject(JSON_RESUME_LANGUAGES)
      const adapter = inject(ADAPT_JSON_RESUME_LANGUAGE)
      return () => languages.map((language) => adapter(language))
    },
  },
)

/** @visibleForTesting */
export const JSON_RESUME_LANGUAGES = new InjectionToken<JsonResumeLanguages>(
  /* istanbul ignore next */
  isDevMode ? 'JSON Resume languages' : 'JRLs',
  { factory: () => resume.languages },
)

/** @visibleForTesting */
export type JsonResumeLanguages = typeof resume.languages
