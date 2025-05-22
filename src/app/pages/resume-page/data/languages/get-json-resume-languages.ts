import { Language } from './language'
import { inject, InjectionToken } from '@angular/core'
import { map, Observable } from 'rxjs'
import { JsonResumeService } from '../json-resume/json-resume.service'

type GetJsonResumeLanguages = () => Observable<readonly Language[]>
export const GET_JSON_RESUME_LANGUAGES =
  new InjectionToken<GetJsonResumeLanguages>(
    /* istanbul ignore next */
    isDevMode ? 'GetJsonResumeLanguage' : 'GJRL',
    {
      // tag: ISO 639-1 2 char tag
      // https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
      factory: () => {
        const jsonResumeService = inject(JsonResumeService)
        return () =>
          jsonResumeService.getLanguages().pipe(
            map((languages) =>
              languages.map(({ language, comment, fluency, tag }) => ({
                name: language,
                comment,
                fluency,
                tag,
              })),
            ),
          )
      },
    },
  )
