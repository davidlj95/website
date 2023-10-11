import { Component } from '@angular/core'
import { JsonResumeAdapterService } from '../json-resume-adapter.service'
import { Position } from './position/position'

@Component({
  selector: 'app-professional-experience',
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.scss'],
})
export class ProfessionalExperienceComponent {
  protected positions: ReadonlyArray<Position>

  constructor(jsonResumeAdapter: JsonResumeAdapterService) {
    this.positions = jsonResumeAdapter.getPositions()
  }
}
