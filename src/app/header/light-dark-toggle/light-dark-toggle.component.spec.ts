import { ComponentFixture } from '@angular/core/testing'

import { LightDarkToggleComponent } from './light-dark-toggle.component'
import { ColorSchemeService, Scheme } from './color-scheme.service'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockProvider } from 'ng-mocks'
import { forceColorScheme } from '@/test/helpers/color-scheme'
import { forceReducedMotion } from '@/test/helpers/motion'
import { DarkMode, LightMode } from '@/data/material-symbols'
import {
  expectIsInLayout,
  expectIsNotInLayout,
} from '@/test/helpers/visibility'
import { findMaterialSymbolByText } from '@/test/helpers/material-symbols'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { ToolbarButtonComponent } from '../toolbar-button/toolbar-button.component'

describe('LightDarkToggleComponent', () => {
  let component: LightDarkToggleComponent
  let fixture: ComponentFixture<LightDarkToggleComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  describe('when light scheme is set', () => {
    beforeEach(() => {
      ;[fixture, component] = makeSut()
      fixture.detectChanges()
    })

    forceColorScheme(Scheme.Light)
    forceReducedMotion()

    it('should not display light mode icon', () => {
      expectIsNotInLayout(
        findMaterialSymbolByText(fixture.debugElement, LightMode),
      )
    })

    it('should display dark mode icon', () => {
      expectIsInLayout(findMaterialSymbolByText(fixture.debugElement, DarkMode))
    })
  })

  describe('when dark scheme is set', () => {
    beforeEach(() => {
      ;[fixture, component] = makeSut()
      fixture.detectChanges()
    })

    forceColorScheme(Scheme.Dark)
    forceReducedMotion()

    it('should display light mode icon', () => {
      expectIsInLayout(
        findMaterialSymbolByText(fixture.debugElement, LightMode),
      )
    })

    it('should not display dark mode icon', () => {
      expectIsNotInLayout(
        findMaterialSymbolByText(fixture.debugElement, DarkMode),
      )
    })
  })

  describe('when pressing scheme switcher icon', () => {
    it('should call light / dark scheme toggle', () => {
      const colorSchemeService = jasmine.createSpyObj<ColorSchemeService>([
        'toggleDarkLight',
      ])
      ;[fixture, component] = makeSut({ colorSchemeService })

      fixture.debugElement
        .query(byComponent(ToolbarButtonComponent))
        .triggerEventHandler('click')

      expect(colorSchemeService.toggleDarkLight).toHaveBeenCalledWith()
    })
  })
})

const makeSut = (opts: { colorSchemeService?: ColorSchemeService } = {}) =>
  componentTestSetup(LightDarkToggleComponent, {
    providers: [
      opts.colorSchemeService
        ? MockProvider(ColorSchemeService, opts.colorSchemeService)
        : [],
    ],
  })
