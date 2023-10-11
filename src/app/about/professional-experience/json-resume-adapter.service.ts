import { Inject, Injectable, InjectionToken } from '@angular/core'
import { Position } from './position/position'
import resume from '../../../../assets/resume.json'
import { JsonResumePositionAdapterService } from './json-resume-position-adapter.service'

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
    private positionAdapter: JsonResumePositionAdapterService,
  ) {}

  getPositions(): ReadonlyArray<Position> {
    return this.jsonResumeWork.map((position) =>
      this.positionAdapter.adapt(position),
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
