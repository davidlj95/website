import { Component } from '@angular/core'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { FilteredTechsComponent } from './filtered-techs/filtered-techs.component'
import { BACKEND_TAG, FRONTEND_TAG, INFRA_TAG } from './tags'
import { TechTagsSelectorComponent } from './tech-tags-selector/tech-tags-selector.component'

@Component({
  selector: 'app-tech-stack-section',
  imports: [
    SectionTitleComponent,
    FilteredTechsComponent,
    TechTagsSelectorComponent,
  ],
  templateUrl: './tech-stack-section.component.html',
  styleUrl: './tech-stack-section.component.scss',
})
export class TechStackSectionComponent {
  protected readonly _backendTag = BACKEND_TAG
  protected readonly _frontendTag = FRONTEND_TAG
  protected readonly _infraTag = INFRA_TAG
}
