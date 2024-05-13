import { ComponentFixture } from '@angular/core/testing'

import { TechnologyComponent } from './technology.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { TechnologyItem } from './technology-item'
import { By } from '@angular/platform-browser'
import { MockComponent, MockProvider } from 'ng-mocks'
import { SimpleIconComponent } from '@/common/simple-icon/simple-icon.component'
import {
  GET_TECHNOLOGY_ICON_FROM_SLUG,
  GetTechnologyIconFromSlug,
} from './get-technology-icon-from-slug'
import { SimpleIcon } from '@/common/simple-icon/simple-icon'

describe('TechnologyComponent', () => {
  let component: TechnologyComponent
  let fixture: ComponentFixture<TechnologyComponent>
  const DUMMY_TECHNOLOGY_ITEM = {
    slug: 'slug',
    displayName: 'displayName',
    version: 'version',
  } satisfies TechnologyItem
  const DUMMY_ICON: SimpleIcon = {
    slug: DUMMY_TECHNOLOGY_ITEM.slug,
  }

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should render display name', () => {
    ;[fixture, component] = makeSut()
    component.item = DUMMY_TECHNOLOGY_ITEM
    fixture.detectChanges()

    expect(fixture.debugElement.nativeElement.textContent.trim()).toContain(
      DUMMY_TECHNOLOGY_ITEM.displayName,
    )
  })

  it('should look for icon using collaborator', () => {
    const getTechnologyIconFromSlug = jasmine
      .createSpy<GetTechnologyIconFromSlug>()
      .and.returnValue(DUMMY_ICON)
    ;[fixture, component] = makeSut({ getTechnologyIconFromSlug })

    component.item = DUMMY_TECHNOLOGY_ITEM
    fixture.detectChanges()

    expect(getTechnologyIconFromSlug).toHaveBeenCalledOnceWith(
      DUMMY_TECHNOLOGY_ITEM.slug,
    )
  })

  const ICON_ELEMENT_SELECTOR = By.css('.icon')
  describe('when icon is available', () => {
    beforeEach(() => {
      const getTechnologyIconFromSlug = jasmine
        .createSpy<GetTechnologyIconFromSlug>()
        .and.returnValue(DUMMY_ICON)
      ;[fixture, component] = makeSut({ getTechnologyIconFromSlug })
      component.item = DUMMY_TECHNOLOGY_ITEM
      fixture.detectChanges()
    })

    it('should display icon', () => {
      expect(fixture.debugElement.query(ICON_ELEMENT_SELECTOR)).not.toBeNull()
    })
  })

  describe('when icon is not available', () => {
    beforeEach(() => {
      const getTechnologyIconFromSlug = jasmine
        .createSpy<GetTechnologyIconFromSlug>()
        .and.returnValue(undefined)
      ;[fixture, component] = makeSut({ getTechnologyIconFromSlug })
      component.item = DUMMY_TECHNOLOGY_ITEM
      fixture.detectChanges()
    })

    it('should not display icon', () => {
      expect(fixture.debugElement.query(ICON_ELEMENT_SELECTOR)).toBeNull()
    })
  })
})

function makeSut(
  opts: { getTechnologyIconFromSlug?: GetTechnologyIconFromSlug } = {},
) {
  return componentTestSetup(TechnologyComponent, {
    imports: [TechnologyComponent, MockComponent(SimpleIconComponent)],
    providers: [
      opts.getTechnologyIconFromSlug
        ? MockProvider(
            GET_TECHNOLOGY_ICON_FROM_SLUG,
            opts.getTechnologyIconFromSlug,
          )
        : [],
    ],
  })
}
