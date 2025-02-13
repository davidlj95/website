import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExperienceItemTechComponent } from './experience-item-tech.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { TechnologyComponent } from '../../../technology/technology.component'
import { makeTechnologyItem } from '../../../technology/__tests__/make-technology-item'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'
import { By } from '@angular/platform-browser'
import { MockComponents } from 'ng-mocks'
import { ContentChipListComponent } from '../../../content-chip-list/content-chip-list.component'
import { ContentChipComponent } from '../../../content-chip/content-chip.component'

describe('ExperienceItemTechComponent', () => {
  let component: ExperienceItemTechComponent
  let fixture: ComponentFixture<ExperienceItemTechComponent>
  const DUMMY_TECHNOLOGIES = [
    makeTechnologyItem(),
    makeTechnologyItem(),
    makeTechnologyItem(),
  ]
  const DUMMY_PROJECT_NAMES = ['Project A', 'Project B', 'Project C']

  beforeEach(() => {
    TestBed.overrideComponent(ExperienceItemTechComponent, {
      set: {
        imports: [
          MockComponents(TechnologyComponent),
          ContentChipListComponent,
          ContentChipComponent,
        ],
      },
    })
    ;[fixture, component] = componentTestSetup(ExperienceItemTechComponent)
    setFixtureInputsAndDetectChanges(fixture, {
      technologies: DUMMY_TECHNOLOGIES,
      projectNames: DUMMY_PROJECT_NAMES,
    })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display all techs', () => {
    const techElements = fixture.debugElement.queryAll(
      By.directive(TechnologyComponent),
    )

    expect(techElements.length).toEqual(DUMMY_TECHNOLOGIES.length)
  })

  it('should display all project names', () => {
    expect(textContent(fixture.debugElement)).toContain(
      'Project A, Project B, and Project C',
    )
  })
})
