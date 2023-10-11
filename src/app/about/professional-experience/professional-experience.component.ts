import { Component } from '@angular/core'
import { Position } from './position/position'
import { PositionsService } from './positions.service'

@Component({
  selector: 'app-professional-experience',
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.scss'],
})
export class ProfessionalExperienceComponent {
  protected positions: ReadonlyArray<Position>

  constructor(positionsService: PositionsService) {
    this.positions = positionsService.getPositions()
  }
}
