import { Inject, Injectable, InjectionToken } from '@angular/core'
import resume from '../../../../assets/resume.json'
import {
  ADAPT_JSON_RESUME_WORK,
  AdaptJsonResumeWork,
} from './adapt-json-resume-work'
import { ExperienceItem } from './experience-item/experience-item'

@Injectable({
  providedIn: 'root',
})
export class ExperienceItemsService {
  constructor(
    @Inject(JSON_RESUME_WORKS) private jsonResumeWorks: JsonResumeWorks,
    @Inject(ADAPT_JSON_RESUME_WORK)
    private adaptJsonResumeWork: AdaptJsonResumeWork,
  ) {}

  getExperienceItems(): ReadonlyArray<ExperienceItem> {
    return this.jsonResumeWorks.map((workItem) =>
      this.adaptJsonResumeWork(workItem),
    )
  }
}
export const JSON_RESUME_WORKS = new InjectionToken<JsonResumeWorks>(
  isDevMode ? 'JSON Resume works' : 'JRWs',
  {
    factory: () => resume.work,
  },
)

export type JsonResumeWorks = typeof resume.work
