import { ComponentFixture } from '@angular/core/testing'

import { ProjectsSectionComponent } from './projects-section.component'
import { MockComponents, MockProvider } from 'ng-mocks'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { GET_PROJECT_ITEMS, GetProjectItems } from '../data/get-project-items'
import { ProjectItemComponent } from './project-item/project-item.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { makeProject } from '../data/__tests__/make-project'
import { CardGridComponent } from '../card-grid/card-grid.component'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'

describe('ProjectsSectionComponent', () => {
  let component: ProjectsSectionComponent
  let fixture: ComponentFixture<ProjectsSectionComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should display all projects', () => {
    const projects = [makeProject(), makeProject()]
    const getProjectItems = jasmine
      .createSpy<GetProjectItems>()
      .and.returnValues(of(projects))

    ;[fixture, component] = makeSut({ getProjectItems })
    fixture.detectChanges()

    const projectItemElements = fixture.debugElement.queryAll(
      By.directive(ProjectItemComponent),
    )

    expect(projectItemElements.length).toEqual(projects.length)
  })
})

const makeSut = (opts: { getProjectItems?: GetProjectItems } = {}) =>
  componentTestSetup(ProjectsSectionComponent, {
    imports: [
      ProjectsSectionComponent,
      CardGridComponent,
      MockComponents(SectionTitleComponent, ProjectItemComponent),
    ],
    providers: [
      opts.getProjectItems
        ? MockProvider(GET_PROJECT_ITEMS, opts.getProjectItems)
        : [],
    ],
  })
