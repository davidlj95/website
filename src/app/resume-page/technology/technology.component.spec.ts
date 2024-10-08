import { ComponentFixture } from '@angular/core/testing'

import { TechnologyComponent } from './technology.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { By } from '@angular/platform-browser'
import { MockComponent, MockProvider } from 'ng-mocks'
import { SimpleIconComponent } from '@/common/simple-icon/simple-icon.component'
import {
  GET_TECHNOLOGY_ICON_FROM_SLUG,
  GetTechnologyIconFromSlug,
} from './get-technology-icon-from-slug'
import { SimpleIcon } from '@/common/simple-icon/simple-icon'
import {
  GET_TECHNOLOGY_DISPLAY_NAME_FROM_SLUG,
  GetTechnologyDisplayNameFromSlug,
} from './get-technology-display-name-from-slug'
import { makeTechnologyItem } from './__tests__/make-technology-item'

describe('TechnologyComponent', () => {
  let component: TechnologyComponent
  let fixture: ComponentFixture<TechnologyComponent>
  const DUMMY_TECHNOLOGY_ITEM = makeTechnologyItem()
  const DUMMY_ICON: SimpleIcon = {
    slug: DUMMY_TECHNOLOGY_ITEM.slug,
  }

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should lookup and render display name', () => {
    const displayName = 'dummy display name'
    const getTechnologyDisplayNameFromSlug = jasmine
      .createSpy<GetTechnologyDisplayNameFromSlug>()
      .and.returnValue(displayName)
    ;[fixture, component] = makeSut({ getTechnologyDisplayNameFromSlug })

    component.item = DUMMY_TECHNOLOGY_ITEM
    fixture.detectChanges()

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      displayName,
    )
    expect(getTechnologyDisplayNameFromSlug).toHaveBeenCalledOnceWith(
      DUMMY_TECHNOLOGY_ITEM.slug,
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
  opts: {
    getTechnologyDisplayNameFromSlug?: GetTechnologyDisplayNameFromSlug
    getTechnologyIconFromSlug?: GetTechnologyIconFromSlug
  } = {},
) {
  return componentTestSetup(TechnologyComponent, {
    imports: [TechnologyComponent, MockComponent(SimpleIconComponent)],
    providers: [
      opts.getTechnologyDisplayNameFromSlug
        ? MockProvider(
            GET_TECHNOLOGY_DISPLAY_NAME_FROM_SLUG,
            opts.getTechnologyDisplayNameFromSlug,
          )
        : [],
      opts.getTechnologyIconFromSlug
        ? MockProvider(
            GET_TECHNOLOGY_ICON_FROM_SLUG,
            opts.getTechnologyIconFromSlug,
          )
        : [],
    ],
  })
}
