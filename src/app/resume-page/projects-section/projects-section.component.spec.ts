import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProjectsSectionComponent } from './projects-section.component'
import { MockComponents } from 'ng-mocks'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { byComponent } from '@test/helpers/component-query-predicates'
import { ProjectItemsService } from './project-items.service'
import { ProjectItemComponent } from './project-item/project-item.component'
import { NgFor } from '@angular/common'
import { componentTestSetup } from '@test/helpers/component-test-setup'

describe('ProjectsSectionComponent', () => {
  let component: ProjectsSectionComponent
  let fixture: ComponentFixture<ProjectsSectionComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()
    expect(component).toBeTruthy()
  })

  it('should display all projects', () => {
    ;[fixture, component] = makeSut()
    fixture.detectChanges()

    const projectItemsService = TestBed.inject(ProjectItemsService)
    const projectItemElements = fixture.debugElement.queryAll(
      byComponent(ProjectItemComponent),
    )
    expect(projectItemElements.length).toEqual(projectItemsService.get().length)
  })
})

function makeSut() {
  return componentTestSetup(ProjectsSectionComponent, {
    imports: [
      ProjectsSectionComponent,
      NgFor,
      MockComponents(SectionTitleComponent, ProjectItemComponent),
    ],
  })
}
