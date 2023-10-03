import { Component } from '@angular/core'
import { Position } from './position/position'
import resume from '../../../../assets/resume.json'

@Component({
  selector: 'app-professional-experience',
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.scss'],
})
export class ProfessionalExperienceComponent {
  public readonly positions: ReadonlyArray<Position> = resume.work.map(
    (work) =>
      new Position({
        imageUrl: new URL(work.image),
        company: work.company,
        companyWebsite: new URL(work.website),
        role: work.position,
        startDate: new Date(work.startDate),
        endDate: work.endDate ? new Date(work.endDate) : undefined,
        freelance: work.freelance,
        internship: work.internship,
        initialPositions: work.initialPositions,
        otherPositions: work.otherPositions,
      }),
  )
}
