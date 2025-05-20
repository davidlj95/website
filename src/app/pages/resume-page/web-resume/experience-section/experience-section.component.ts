import { Component, inject } from '@angular/core'
import { ExperienceComponent } from './experience/experience.component'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '@/common/card-grid/card-grid.component'
import { EXPERIENCE_SERVICE } from '../../data/experience/experience-service'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section[appExperience]',
  templateUrl: './experience-section.component.html',
  imports: [SectionTitleComponent, CardGridComponent, ExperienceComponent],
})
export class ExperienceSectionComponent {
  protected readonly _experiences = toSignal(
    inject(EXPERIENCE_SERVICE).getAll(),
  )
}
