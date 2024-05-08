import { ComponentFixture } from '@angular/core/testing'

import { LightDarkToggleComponent } from './light-dark-toggle.component'
import { ColorSchemeService } from '../color-scheme.service'
import { By } from '@angular/platform-browser'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockProvider } from 'ng-mocks'

describe('LightDarkToggleComponent', () => {
  let component: LightDarkToggleComponent
  let fixture: ComponentFixture<LightDarkToggleComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()
    expect(component).toBeTruthy()
  })

  describe('when pressing scheme switcher icon', () => {
    it('should call light / dark scheme toggle', () => {
      const colorSchemeService = jasmine.createSpyObj<ColorSchemeService>([
        'toggleDarkLight',
      ])
      ;[fixture, component] = makeSut({ colorSchemeService })

      fixture.debugElement.query(By.css('button')).triggerEventHandler('click')

      expect(colorSchemeService.toggleDarkLight).toHaveBeenCalled()
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
