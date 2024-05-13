import { ComponentFixture } from '@angular/core/testing'

import { ProjectsSectionComponent } from './projects-section.component'
import { MockComponents, MockProvider } from 'ng-mocks'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { GET_PROJECT_ITEMS, GetProjectItems } from './get-project-items'
import { ProjectItemComponent } from './project-item/project-item.component'
import { NgFor } from '@angular/common'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { makeProjectItem } from './project-item/__tests__/make-project-item'
import { shouldContainComponent } from '@/test/helpers/component-testers'

describe('ProjectsSectionComponent', () => {
  let component: ProjectsSectionComponent
  let fixture: ComponentFixture<ProjectsSectionComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()
    expect(component).toBeTruthy()
  })

  it('should display all projects', () => {
    const projectItems = [makeProjectItem(), makeProjectItem()]
    const getProjectItems = jasmine
      .createSpy<GetProjectItems>()
      .and.returnValues(projectItems)

    ;[fixture, component] = makeSut({ getProjectItems })
    fixture.detectChanges()

    const projectItemElements = fixture.debugElement.queryAll(
      byComponent(ProjectItemComponent),
    )
    expect(projectItemElements.length).toEqual(projectItems.length)
  })

  shouldContainComponent(() => makeSut()[0], SectionTitleComponent)
})

const makeSut = (opts: { getProjectItems?: GetProjectItems } = {}) =>
  componentTestSetup(ProjectsSectionComponent, {
    imports: [
      ProjectsSectionComponent,
      NgFor,
      MockComponents(SectionTitleComponent, ProjectItemComponent),
    ],
    providers: [
      opts.getProjectItems
        ? MockProvider(GET_PROJECT_ITEMS, opts.getProjectItems)
        : [],
    ],
  })
