import { Language } from './language'
import { inject, InjectionToken } from '@angular/core'
import { ADAPT_JSON_RESUME_LANGUAGE } from './adapt-json-resume-language'
import { map, Observable } from 'rxjs'
import { JsonResumeService } from '../json-resume/json-resume.service'

export interface LanguageService {
  getAll: () => Observable<readonly Language[]>
}
export const LANGUAGE_SERVICE = new InjectionToken<LanguageService>(
  /* istanbul ignore next */
  isDevMode ? 'LanguageService' : 'rLS',
  {
    factory: () => {
      const jsonResumeService = inject(JsonResumeService)
      const adapter = inject(ADAPT_JSON_RESUME_LANGUAGE)
      return {
        getAll: () =>
          jsonResumeService
            .getLanguages()
            .pipe(
              map((languages) =>
                languages.map((language) => adapter(language)),
              ),
            ),
      }
    },
  },
)
