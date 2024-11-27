import { ComponentFixture } from '@angular/core/testing'

import { ExperienceItemTechComponent } from './experience-item-tech.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { TechnologyComponent } from '../../../technology/technology.component'
import { makeTechnologyItem } from '../../../technology/__tests__/make-technology-item'
import { textContent } from '@/test/helpers/text-content'

describe('ExperienceItemTechComponent', () => {
  let component: ExperienceItemTechComponent
  let fixture: ComponentFixture<ExperienceItemTechComponent>
  const technologies = [
    makeTechnologyItem(),
    makeTechnologyItem(),
    makeTechnologyItem(),
  ]
  const projectNames = ['Project A', 'Project B', 'Project C']

  beforeEach(() => {
    ;[fixture, component] = makeSut()

    component.technologies = technologies
    component.projectNames = projectNames

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display all techs', () => {
    const techElements = fixture.debugElement.queryAll(
      byComponent(TechnologyComponent),
    )

    expect(techElements.length).toEqual(technologies.length)
  })

  it('should display all project names', () => {
    expect(textContent(fixture.debugElement)).toContain(
      'Project A, Project B, and Project C',
    )
  })
})

const makeSut = () => componentTestSetup(ExperienceItemTechComponent)
