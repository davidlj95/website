import { LinkComponent } from './link.component'
import { By } from '@angular/platform-browser'
import { Component, Type } from '@angular/core'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('LinkComponent', () => {
  it('should create', () => {
    const [fixture, component] = componentTestSetup(LinkComponent)
    setFixtureInputsAndDetectChanges(fixture, { href: undefined })

    expect(component).toBeTruthy()
  })

  function testShouldContainContent(href: string | undefined) {
    it("should contain element's content", () => {
      const someText = 'some text here'
      const hostComponent = makeHostComponent(someText, href)
      const [fixture] = componentTestSetup(hostComponent)
      fixture.detectChanges()

      expect(textContent(fixture.debugElement)).toEqual(someText)
    })
  }

  describe('when no href is given', () => {
    it('should not contain the anchor element', () => {
      const [fixture] = componentTestSetup(LinkComponent)

      const anchorElement = fixture.debugElement.query(By.css('a'))

      expect(anchorElement).toBeFalsy()
    })

    testShouldContainContent(undefined)
  })

  describe('when href is given', () => {
    const href = 'https://example.org'

    it('should contain the anchor element with given href attribute', () => {
      const [fixture] = componentTestSetup(LinkComponent)
      setFixtureInputsAndDetectChanges(fixture, { href })

      const anchorElement = fixture.debugElement.query(By.css('a'))

      expect(anchorElement).toBeTruthy()
    })

    testShouldContainContent(href)
  })
})

function makeHostComponent(
  textContent: string,
  href: string | undefined,
): Type<unknown> {
  @Component({
    template: `<app-link [href]="href">{{ textContent }}</app-link>`,
    imports: [LinkComponent],
  })
  class TestHostComponent {
    textContent = textContent
    href = href
  }
  return TestHostComponent
}
