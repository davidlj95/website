import { ComponentFixture } from '@angular/core/testing'

import { TechnologyComponent } from './technology.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { By } from '@angular/platform-browser'
import { MockComponent, MockProvider } from 'ng-mocks'
import { SimpleIconComponent } from '@/common/simple-icon/simple-icon.component'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'
import {
  GET_TECHNOLOGY_FROM_SLUG,
  GetTechnologyFromSlug,
} from './get-technology-from-slug'
import { makeTech } from './__tests__/make-tech'

describe('TechnologyComponent', () => {
  let component: TechnologyComponent
  let fixture: ComponentFixture<TechnologyComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should lookup and render title', () => {
    const title = 'dummy title'
    const tech = 'tech'
    const getTechnologyFromSlug = jasmine
      .createSpy<GetTechnologyFromSlug>()
      .and.returnValue(makeTech({ title }))
    ;[fixture, component] = makeSut({
      getTechnologyFromSlug,
      tech,
    })

    expect(textContent(fixture.debugElement)).toEqual(title)
    expect(getTechnologyFromSlug).toHaveBeenCalledOnceWith(tech)
  })

  const ICON_ELEMENT_SELECTOR = By.css('app-simple-icon')
  describe('when icon is available', () => {
    beforeEach(() => {
      const getTechnologyFromSlug = jasmine
        .createSpy<GetTechnologyFromSlug>()
        .and.returnValue(makeTech({ hasIcon: true }))
      ;[fixture, component] = makeSut({
        getTechnologyFromSlug,
      })
    })

    it('should display icon', () => {
      expect(fixture.debugElement.query(ICON_ELEMENT_SELECTOR)).not.toBeNull()
    })
  })

  describe('when icon is not available', () => {
    beforeEach(() => {
      const getTechnologyIconFromSlug = jasmine
        .createSpy<GetTechnologyFromSlug>()
        .and.returnValue(makeTech({ hasIcon: false }))
      ;[fixture, component] = makeSut({
        getTechnologyFromSlug: getTechnologyIconFromSlug,
      })
    })

    it('should not display icon', () => {
      expect(fixture.debugElement.query(ICON_ELEMENT_SELECTOR)).toBeNull()
    })
  })
})

function makeSut(
  opts: {
    getTechnologyFromSlug?: GetTechnologyFromSlug
    tech?: string
  } = {},
) {
  const [fixture, component] = componentTestSetup(TechnologyComponent, {
    imports: [MockComponent(SimpleIconComponent)],
    providers: [
      MockProvider(
        GET_TECHNOLOGY_FROM_SLUG,
        opts.getTechnologyFromSlug ??
          // eslint-disable-next-line jasmine/no-unsafe-spy
          jasmine
            .createSpy('getTechnologyFromSlug')
            .and.returnValue(makeTech()),
      ),
    ],
  })
  setFixtureInputsAndDetectChanges(fixture, {
    tech: opts.tech ?? 'tech',
  })
  return [fixture, component] as const
}
