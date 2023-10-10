import { Component } from '@angular/core'
import { Company, Position } from './position/position'
import resume from '../../../../assets/resume.json'
import { environment } from '../../../environments'

@Component({
  selector: 'app-professional-experience',
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.scss'],
})
export class ProfessionalExperienceComponent {
  public readonly positions: ReadonlyArray<Position> = resume.work.map(
    (work) =>
      new Position({
        company: new Company({
          name: work.company,
          website: new URL(work.website),
          image: new URL(
            `assets/companies/${work.company
              .toLowerCase()
              .replace(' ', '-')
              .replace('ó', 'o')}.png`,
            environment.canonicalUrl,
          ),
          formerlyKnownAs: work.formerlyKnownAs,
        }),
        role: work.position,
        startDate: new Date(work.startDate),
        endDate: work.endDate ? new Date(work.endDate) : undefined,
        freelance: work.freelance,
        internship: work.internship,
        previousRoles: work.previousRoles,
        otherRoles: work.otherRoles,
        summary: work.summary ?? '',
        highlights: work.highlights,
      }),
  )
}
