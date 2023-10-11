import { Inject, Injectable, InjectionToken } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { JsonResumePositionAdapterService } from './json-resume-position-adapter.service'
import { Position } from './position/position'

@Injectable({
  providedIn: 'root',
})
export class PositionsService {
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
