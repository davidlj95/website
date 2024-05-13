import { inject, InjectionToken } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { EducationItem } from './education-item/education-item'
import { ADAPT_JSON_RESUME_EDUCATION } from './adapt-json-resume-education'

export type GetEducationItems = () => ReadonlyArray<EducationItem>
export const GET_EDUCATION_ITEMS = new InjectionToken<GetEducationItems>(
  isDevMode ? 'GetEducationItems' : 'GEI',
  {
    factory: () => {
      const educations = inject(JSON_RESUME_EDUCATION)
      const adapter = inject(ADAPT_JSON_RESUME_EDUCATION)
      return () => educations.map((education) => adapter(education))
    },
  },
)

export const JSON_RESUME_EDUCATION = new InjectionToken<JsonResumeEducation>(
  isDevMode ? 'JSON Resume education' : 'JREs',
  {
    factory: () => resume.education,
  },
)
export type JsonResumeEducation = typeof resume.education
