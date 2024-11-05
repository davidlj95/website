import { maybeLoadConsoleEasterEgg } from './maybe-load-console-easter-egg'
import { TestBed } from '@angular/core/testing'
import { DOCUMENT } from '@angular/common'
import { Component } from '@angular/core'
import { MockProvider } from 'ng-mocks'
import { IS_MOBILE } from '@/common/is-mobile'
import AngularJson from '../../angular.json'

describe('maybeLoadConsoleEasterEgg', () => {
  it('should asynchronously load the script when not using a mobile device', () => {
    makeSut({ isMobile: false })

    expect(getScripts().item(0).async).toBeTrue()
  })

  it('should not load the script when using a mobile device', () => {
    makeSut({ isMobile: true })

    expect(getScripts().length).toBe(0)
  })

  it('should use bundle name from angular.json', () => {
    const scripts =
      AngularJson.projects['@davidlj95/website'].architect.build.options.scripts
    const script = scripts.find((script) => script.bundleName === BUNDLE_NAME)

    expect(script).toBeTruthy()
  })
})

const BUNDLE_NAME = 'console-easter-egg'
const getScripts = () =>
  TestBed.inject(DOCUMENT).querySelectorAll<HTMLScriptElement>(
    `script[src="${BUNDLE_NAME}.js"]`,
  )

const makeSut = ({ isMobile }: { isMobile: boolean }) => {
  TestBed.configureTestingModule({
    providers: [MockProvider(IS_MOBILE, () => isMobile)],
  })

  // Clear scripts created by this or other test suites
  getScripts().forEach((script) => script.remove())

  @Component({ template: '' })
  class ExampleComponent {
    constructor() {
      maybeLoadConsoleEasterEgg()
    }
  }
  TestBed.createComponent(ExampleComponent)
}
