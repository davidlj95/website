import { Inject, Injectable, InjectionToken } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { JsonResumeExperienceItemAdapterService } from './json-resume-experience-item-adapter.service'
import { ExperienceItem } from './experience-item/experience-item'

@Injectable({
  providedIn: 'root',
})
export class ExperienceItemsService {
  constructor(
    @Inject(JSON_RESUME_WORK) private jsonResumeWork: JsonResumeWork,
    private experienceItemAdapter: JsonResumeExperienceItemAdapterService,
  ) {}

  getExperienceItems(): ReadonlyArray<ExperienceItem> {
    return this.jsonResumeWork.map((workItem) =>
      this.experienceItemAdapter.adapt(workItem),
    )
  }
}
export const JSON_RESUME_WORK = new InjectionToken<JsonResumeWork>(
  'JSON Resume work section',
  {
    factory: () => resume.work,
  },
)

export type JsonResumeWork = typeof resume.work
