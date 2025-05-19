import { inject, InjectionToken } from '@angular/core'
import resume from '@/data/resume.json'
import { Education } from '../data/education'
import { ADAPT_JSON_RESUME_EDUCATION } from '../data/adapt-json-resume-education'

export type GetEducationItems = () => readonly Education[]
export const GET_EDUCATION_ITEMS = new InjectionToken<GetEducationItems>(
  /* istanbul ignore next */
  isDevMode ? 'GetEducationItems' : 'GEI',
  {
    factory: () => {
      const educations = inject(JSON_RESUME_EDUCATIONS)
      const adapter = inject(ADAPT_JSON_RESUME_EDUCATION)
      return () => educations.map((education) => adapter(education))
    },
  },
)

/** @visibleForTesting */
export const JSON_RESUME_EDUCATIONS = new InjectionToken<JsonResumeEducations>(
  /* istanbul ignore next */
  isDevMode ? 'JSON Resume educations' : 'JREs',
  {
    factory: () => resume.education,
  },
)
/** @visibleForTesting */
export type JsonResumeEducations = typeof resume.education
