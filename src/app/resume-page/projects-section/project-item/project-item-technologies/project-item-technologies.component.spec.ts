import { ComponentFixture } from '@angular/core/testing'

import { ProjectItemTechnologiesComponent } from './project-item-technologies.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { TechnologyComponent } from '../../../technology/technology.component'
import { makeTechnologyItem } from '../../../technology/__tests__/make-technology-item'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { ContentChipListComponent } from '../../../content-chip-list/content-chip-list.component'
import { MockComponents } from 'ng-mocks'
import { ContentChipComponent } from '../../../content-chip/content-chip.component'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('ProjectItemTechnologiesComponent', () => {
  let component: ProjectItemTechnologiesComponent
  let fixture: ComponentFixture<ProjectItemTechnologiesComponent>
  const DUMMY_ITEMS = [makeTechnologyItem(), makeTechnologyItem()]

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(
      ProjectItemTechnologiesComponent,
      {
        imports: [
          MockComponents(
            TechnologyComponent,
            ContentChipListComponent,
            ContentChipComponent,
          ),
        ],
      },
    )
    setFixtureInputsAndDetectChanges(fixture, { items: DUMMY_ITEMS })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display all technologies', () => {
    const itemElements = fixture.debugElement.queryAll(
      byComponent(TechnologyComponent),
    )

    expect(itemElements.length).toEqual(DUMMY_ITEMS.length)
  })
})
