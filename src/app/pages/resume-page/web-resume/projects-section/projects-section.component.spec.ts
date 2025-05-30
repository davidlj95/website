import { ComponentFixture } from '@angular/core/testing'

import { ProjectsSectionComponent } from './projects-section.component'
import { MockComponents, MockProvider } from 'ng-mocks'
import { SectionTitleComponent } from '../section-title/section-title.component'
import {
  PROJECT_SERVICE,
  ProjectService,
} from '../../data/projects/project-service'
import { ProjectComponent } from './project/project.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { makeProject } from '../../data/projects/__tests__/make-project'
import { CardGridComponent } from '@/common/card-grid/card-grid.component'
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
    const projectService = {
      getAll: jasmine
        .createSpy<ProjectService['getAll']>()
        .and.returnValues(of(projects)),
    } satisfies Partial<ProjectService>

    ;[fixture, component] = makeSut({ projectService })
    fixture.detectChanges()

    const projectElements = fixture.debugElement.queryAll(
      By.directive(ProjectComponent),
    )

    expect(projectElements.length).toEqual(projects.length)
  })
})

const makeSut = ({
  projectService,
}: { projectService?: Partial<ProjectService> } = {}) =>
  componentTestSetup(ProjectsSectionComponent, {
    imports: [
      ProjectsSectionComponent,
      CardGridComponent,
      MockComponents(SectionTitleComponent, ProjectComponent),
    ],
    providers: [
      projectService ? MockProvider(PROJECT_SERVICE, projectService) : [],
    ],
  })
