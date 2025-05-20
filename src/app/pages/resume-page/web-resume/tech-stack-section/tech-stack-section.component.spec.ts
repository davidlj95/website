import { ComponentFixture } from '@angular/core/testing'

import { TechStackSectionComponent } from './tech-stack-section.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { FilteredTechsComponent } from './filtered-techs/filtered-techs.component'
import { MockComponents } from 'ng-mocks'
import { TechTagsSelectorComponent } from './tech-tags-selector/tech-tags-selector.component'

describe('TechStackSectionComponent', () => {
  let component: TechStackSectionComponent
  let fixture: ComponentFixture<TechStackSectionComponent>

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(TechStackSectionComponent, {
      imports: [
        MockComponents(
          SectionTitleComponent,
          TechTagsSelectorComponent,
          FilteredTechsComponent,
        ),
      ],
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
