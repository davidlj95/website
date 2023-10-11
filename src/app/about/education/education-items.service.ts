import { Inject, Injectable, InjectionToken } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { JsonResumeEducationItemAdapterService } from './json-resume-education-item-adapter.service'
import { EducationItem } from './education-item/education-item'

@Injectable({
  providedIn: 'root',
})
export class EducationItemsService {
  constructor(
    @Inject(JSON_RESUME_EDUCATION)
    private jsonResumeEducation: JsonResumeEducation,
    private educationItemAdapter: JsonResumeEducationItemAdapterService,
  ) {}

  getEducationItems(): ReadonlyArray<EducationItem> {
    return this.jsonResumeEducation.map((educationItem) =>
      this.educationItemAdapter.adapt(educationItem),
    )
  }
}
export const JSON_RESUME_EDUCATION = new InjectionToken<JsonResumeEducation>(
  'JSON Resume education section',
  {
    factory: () => resume.education,
  },
)
export type JsonResumeEducation = typeof resume.education
