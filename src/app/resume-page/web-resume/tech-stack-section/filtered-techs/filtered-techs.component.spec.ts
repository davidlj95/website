import { ComponentFixture } from '@angular/core/testing'

import { FilteredTechsComponent } from './filtered-techs.component'
import { BACKEND_TAG } from '../tags'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockComponents } from 'ng-mocks'
import { ContentChipListComponent } from '@/common/content-chip-list/content-chip-list.component'
import { ContentChipComponent } from '@/common/content-chip/content-chip.component'
import { TechnologyComponent } from '../../../technology/technology.component'

describe('FilteredTechsComponent', () => {
  let component: FilteredTechsComponent
  let fixture: ComponentFixture<FilteredTechsComponent>

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(FilteredTechsComponent, {
      imports: [
        MockComponents(
          ContentChipListComponent,
          ContentChipComponent,
          TechnologyComponent,
        ),
      ],
    })
    fixture.componentRef.setInput('tag', BACKEND_TAG)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
