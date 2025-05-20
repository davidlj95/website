import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExperienceTechComponent } from './experience-tech.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { TechnologyComponent } from '../../../../technology/technology.component'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'
import { By } from '@angular/platform-browser'
import { MockComponents } from 'ng-mocks'
import { ContentChipListComponent } from '@/common/content-chip-list/content-chip-list.component'
import { ContentChipComponent } from '@/common/content-chip/content-chip.component'

describe('ExperienceTechComponent', () => {
  let component: ExperienceTechComponent
  let fixture: ComponentFixture<ExperienceTechComponent>
  const DUMMY_TECHNOLOGIES = ['tech-a', 'tech-b', 'tech-c']
  const DUMMY_PROJECT_NAMES = ['Project A', 'Project B', 'Project C']

  beforeEach(() => {
    TestBed.overrideComponent(ExperienceTechComponent, {
      set: {
        imports: [
          MockComponents(TechnologyComponent),
          ContentChipListComponent,
          ContentChipComponent,
        ],
      },
    })
    ;[fixture, component] = componentTestSetup(ExperienceTechComponent)
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
