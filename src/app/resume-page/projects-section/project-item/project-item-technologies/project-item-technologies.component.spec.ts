import { ComponentFixture } from '@angular/core/testing'

import { ProjectItemTechnologiesComponent } from './project-item-technologies.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { Technology } from '../project-item'
import { MockProvider } from 'ng-mocks'
import { TechnologyService } from '../../../technology/technology.service'
import { TechnologyIcon } from '../../../technology/technology-item'

describe('ProjectItemTechnologiesComponent', () => {
  let component: ProjectItemTechnologiesComponent
  let fixture: ComponentFixture<ProjectItemTechnologiesComponent>
  const DUMMY_TECHNOLOGY: Technology = {
    id: 'technology',
    version: 'version',
  }

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should map technologies to items using service', () => {
    const DUMMY_ICON: TechnologyIcon = {
      path: 'path/to/file.svg',
      color: 'color',
    }
    const DUMMY_DISPLAY_NAME = 'dummy display name'
    const technologyService: Partial<TechnologyService> = {
      getIcon: jasmine.createSpy().and.returnValue(DUMMY_ICON),
      getDisplayName: jasmine.createSpy().and.returnValue(DUMMY_DISPLAY_NAME),
    }

    ;[fixture, component] = makeSut({ technologyService })

    component.technologies = [DUMMY_TECHNOLOGY]
    fixture.detectChanges()

    expect(component.items).toEqual([
      {
        slug: DUMMY_TECHNOLOGY.id,
        displayName: DUMMY_DISPLAY_NAME,
        icon: DUMMY_ICON,
        version: DUMMY_TECHNOLOGY.version,
      },
    ])
    expect(technologyService.getIcon).toHaveBeenCalledOnceWith(
      DUMMY_TECHNOLOGY.id,
    )
    expect(technologyService.getDisplayName).toHaveBeenCalledOnceWith(
      DUMMY_TECHNOLOGY.id,
    )
  })

  it('should map slug as default display name if not available', () => {
    const technologyService: Partial<TechnologyService> = {
      getDisplayName: jasmine.createSpy().and.returnValue(null),
    }

    ;[fixture, component] = makeSut({ technologyService })
    component.technologies = [DUMMY_TECHNOLOGY]
    fixture.detectChanges()

    expect(component.items[0].displayName).toEqual(DUMMY_TECHNOLOGY.id)
  })
})
function makeSut(
  opts: { technologyService?: Partial<TechnologyService> } = {},
) {
  return componentTestSetup(ProjectItemTechnologiesComponent, {
    providers: [MockProvider(TechnologyService, opts.technologyService)],
  })
}
