import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProjectsSectionComponent } from './projects-section.component'
import { MockComponents } from 'ng-mocks'
import { H2Component } from '../h2/h2.component'
import { byComponent } from '../../../test/helpers/component-query-predicates'
import { ProjectItemsService } from './project-items.service'
import { ProjectItemComponent } from './project-item/project-item.component'

describe('ProjectsSectionComponent', () => {
  let component: ProjectsSectionComponent
  let fixture: ComponentFixture<ProjectsSectionComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ProjectsSectionComponent,
        MockComponents(H2Component, ProjectItemComponent),
      ],
    })
    fixture = TestBed.createComponent(ProjectsSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display all projects', () => {
    const projectItemsService = TestBed.inject(ProjectItemsService)
    const projectItemElements = fixture.debugElement.queryAll(
      byComponent(ProjectItemComponent),
    )
    expect(projectItemElements.length).toEqual(projectItemsService.get().length)
  })
})
