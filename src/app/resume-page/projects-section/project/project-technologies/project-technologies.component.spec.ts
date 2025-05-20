import { ComponentFixture } from '@angular/core/testing'

import { ProjectTechnologiesComponent } from './project-technologies.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { TechnologyComponent } from '../../../technology/technology.component'
import { ContentChipListComponent } from '../../../content-chip-list/content-chip-list.component'
import { MockComponents } from 'ng-mocks'
import { ContentChipComponent } from '../../../content-chip/content-chip.component'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'
import { By } from '@angular/platform-browser'

describe('ProjectTechnologiesComponent', () => {
  let component: ProjectTechnologiesComponent
  let fixture: ComponentFixture<ProjectTechnologiesComponent>
  const technologies = ['foo-tech', 'bar-tech']

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(ProjectTechnologiesComponent, {
      imports: [
        MockComponents(
          TechnologyComponent,
          ContentChipListComponent,
          ContentChipComponent,
        ),
      ],
    })
    setFixtureInputsAndDetectChanges(fixture, { technologies })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display all technologies', () => {
    const itemElements = fixture.debugElement.queryAll(
      By.directive(TechnologyComponent),
    )

    expect(itemElements.length).toEqual(technologies.length)
  })
})
