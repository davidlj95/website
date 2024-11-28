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
import { textContent } from '@/test/helpers/text-content'
import { TechnologyItem } from './technology-item'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('TechnologyComponent', () => {
  let component: TechnologyComponent
  let fixture: ComponentFixture<TechnologyComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should lookup and render display name', () => {
    const displayName = 'dummy display name'
    const getTechnologyDisplayNameFromSlug = jasmine
      .createSpy<GetTechnologyDisplayNameFromSlug>()
      .and.returnValue(displayName)
    ;[fixture, component] = makeSut({
      getTechnologyDisplayNameFromSlug,
      item: DUMMY_ITEM,
    })

    expect(textContent(fixture.debugElement)).toEqual(displayName)
    expect(getTechnologyDisplayNameFromSlug).toHaveBeenCalledOnceWith(
      DUMMY_ITEM.slug,
    )
  })

  const ICON_ELEMENT_SELECTOR = By.css('.icon')
  describe('when icon is available', () => {
    beforeEach(() => {
      const getTechnologyIconFromSlug = jasmine
        .createSpy<GetTechnologyIconFromSlug>()
        .and.returnValue(DUMMY_ICON)
      ;[fixture, component] = makeSut({ getTechnologyIconFromSlug })
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
    })

    it('should not display icon', () => {
      expect(fixture.debugElement.query(ICON_ELEMENT_SELECTOR)).toBeNull()
    })
  })
})

const DUMMY_ITEM = makeTechnologyItem()
const DUMMY_ICON: SimpleIcon = {
  slug: DUMMY_ITEM.slug,
}
function makeSut(
  opts: {
    getTechnologyDisplayNameFromSlug?: GetTechnologyDisplayNameFromSlug
    getTechnologyIconFromSlug?: GetTechnologyIconFromSlug
    item?: TechnologyItem
  } = {},
) {
  const [fixture, component] = componentTestSetup(TechnologyComponent, {
    imports: [MockComponent(SimpleIconComponent)],
    providers: [
      MockProvider(
        GET_TECHNOLOGY_DISPLAY_NAME_FROM_SLUG,
        opts.getTechnologyDisplayNameFromSlug ??
          // eslint-disable-next-line jasmine/no-unsafe-spy
          jasmine.createSpy('getTechnologyDisplayNameFromSlug'),
      ),
      MockProvider(
        GET_TECHNOLOGY_ICON_FROM_SLUG,
        opts.getTechnologyIconFromSlug ??
          // eslint-disable-next-line jasmine/no-unsafe-spy
          jasmine.createSpy('getTechnologyIconFromSlug'),
      ),
    ],
  })
  setFixtureInputsAndDetectChanges(fixture, {
    item: opts.item ?? DUMMY_ITEM,
  })
  return [fixture, component] as const
}
