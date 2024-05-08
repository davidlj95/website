import { TestBed } from '@angular/core/testing'
import {
  ColorSchemeService,
  Scheme,
} from '../../app/header/light-dark-toggle/color-scheme.service'

export const forceColorScheme = (scheme: Scheme) => {
  let colorSchemeService: ColorSchemeService | undefined
  beforeEach(() => {
    colorSchemeService = TestBed.inject(ColorSchemeService)
    colorSchemeService.setManual(scheme)
  })
  afterEach(() => {
    colorSchemeService?.setSystem()
  })
}
