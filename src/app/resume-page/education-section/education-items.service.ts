import { Inject, Injectable, InjectionToken } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { EducationItem } from './education-item/education-item'
import {
  ADAPT_JSON_RESUME_EDUCATION,
  AdaptJsonResumeEducation,
} from './adapt-json-resume-education'

@Injectable({
  providedIn: 'root',
})
export class EducationItemsService {
  constructor(
    @Inject(JSON_RESUME_EDUCATION)
    private jsonResumeEducation: JsonResumeEducation,
    @Inject(ADAPT_JSON_RESUME_EDUCATION)
    private adaptJsonResumeEducation: AdaptJsonResumeEducation,
  ) {}

  getEducationItems(): ReadonlyArray<EducationItem> {
    return this.jsonResumeEducation.map((educationItem) =>
      this.adaptJsonResumeEducation(educationItem),
    )
  }
}
export const JSON_RESUME_EDUCATION = new InjectionToken<JsonResumeEducation>(
  isDevMode ? 'JSON Resume education' : 'JREs',
  {
    factory: () => resume.education,
  },
)
export type JsonResumeEducation = typeof resume.education
