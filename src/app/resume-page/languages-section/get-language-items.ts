import { LanguageItem } from './language-item/language-item'
import { inject, InjectionToken } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { ADAPT_JSON_RESUME_LANGUAGE } from './adapt-json-resume-language'

export type GetLanguageItems = () => ReadonlyArray<LanguageItem>
export const GET_LANGUAGE_ITEMS = new InjectionToken<GetLanguageItems>(
  isDevMode ? 'GetLanguageItems' : 'GLI',
  {
    factory: () => {
      const languages = inject(JSON_RESUME_LANGUAGES)
      const adapter = inject(ADAPT_JSON_RESUME_LANGUAGE)
      return () => languages.map((language) => adapter(language))
    },
  },
)

export const JSON_RESUME_LANGUAGES = new InjectionToken<JsonResumeLanguages>(
  isDevMode ? 'JSON Resume languages' : 'JRLs',
  { factory: () => resume.languages },
)
export type JsonResumeLanguages = typeof resume.languages
