import { ComponentFixture } from '@angular/core/testing'

import { ProjectsSectionComponent } from './projects-section.component'
import { MockComponents, MockProvider } from 'ng-mocks'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { PROJECT_SERVICE, ProjectService } from '../data/project-service'
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
    const projectService = jasmine
      .createSpy<ProjectService>()
      .and.returnValues(of(projects))

    ;[fixture, component] = makeSut({ projectService })
    fixture.detectChanges()

    const projectItemElements = fixture.debugElement.queryAll(
      By.directive(ProjectItemComponent),
    )

    expect(projectItemElements.length).toEqual(projects.length)
  })
})

const makeSut = ({
  projectService,
}: { projectService?: ProjectService } = {}) =>
  componentTestSetup(ProjectsSectionComponent, {
    imports: [
      ProjectsSectionComponent,
      CardGridComponent,
      MockComponents(SectionTitleComponent, ProjectItemComponent),
    ],
    providers: [
      projectService ? MockProvider(PROJECT_SERVICE, projectService) : [],
    ],
  })
