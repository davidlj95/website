import { ComponentFixture } from '@angular/core/testing'

import { ProjectItemTechnologiesComponent } from './project-item-technologies.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockComponent } from 'ng-mocks'
import { TechnologyComponent } from '../../../technology/technology.component'
import { makeTechnologyItem } from '../../../technology/__tests__/make-technology-item'
import { byComponent } from '@/test/helpers/component-query-predicates'

describe('ProjectItemTechnologiesComponent', () => {
  let component: ProjectItemTechnologiesComponent
  let fixture: ComponentFixture<ProjectItemTechnologiesComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should display all technologies', () => {
    const items = [makeTechnologyItem(), makeTechnologyItem()]
    ;[fixture, component] = makeSut()
    component.items = items
    fixture.detectChanges()

    const itemElements = fixture.debugElement.queryAll(
      byComponent(TechnologyComponent),
    )
    expect(itemElements.length).toEqual(items.length)
  })
})

function makeSut() {
  return componentTestSetup(ProjectItemTechnologiesComponent, {
    imports: [
      ProjectItemTechnologiesComponent,
      MockComponent(TechnologyComponent),
    ],
  })
}
