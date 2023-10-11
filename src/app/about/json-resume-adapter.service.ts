import { Inject, Injectable, InjectionToken } from '@angular/core'
import { Position } from './professional-experience/position/position'
import resume from '../../../assets/resume.json'
import { JsonResumePositionAdapterService } from './professional-experience/json-resume-position-adapter.service'
import { JsonResumeEducationItemAdapterService } from './education/json-resume-education-item-adapter.service'
import { EducationItem } from './education/education-item/education-item'

@Injectable({
  providedIn: 'root',
})
/**
 * Adapts a JSON Resume into our own app models
 *
 * @see https://jsonresume.org/
 */
export class JsonResumeAdapterService {
  constructor(
    @Inject(JSON_RESUME_WORK) private jsonResumeWork: JsonResumeWork,
    @Inject(JSON_RESUME_EDUCATION)
    private jsonResumeEducation: JsonResumeEducation,
    private positionAdapter: JsonResumePositionAdapterService,
    private educationItemAdapter: JsonResumeEducationItemAdapterService,
  ) {}

  getPositions(): ReadonlyArray<Position> {
    return this.jsonResumeWork.map((position) =>
      this.positionAdapter.adapt(position),
    )
  }

  getEducationItems(): ReadonlyArray<EducationItem> {
    return this.jsonResumeEducation.map((educationItem) =>
      this.educationItemAdapter.adapt(educationItem),
    )
  }
}
export const JSON_RESUME_WORK = new InjectionToken<JsonResumeWork>(
  'JSON Resume work section',
  {
    factory: () => resume.work,
  },
)
export const JSON_RESUME_EDUCATION = new InjectionToken<JsonResumeEducation>(
  'JSON Resume education section',
  {
    factory: () => resume.education,
  },
)
export type JsonResumeWork = typeof resume.work
export type JsonResumeEducation = typeof resume.education
