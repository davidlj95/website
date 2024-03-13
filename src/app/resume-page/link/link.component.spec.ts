import { LinkComponent } from './link.component'
import { By } from '@angular/platform-browser'
import { Component, Type } from '@angular/core'
import { testSetup } from '../../../test/helpers/component-test-setup'

describe('LinkComponent', () => {
  it('should create', () => {
    const [fixture, component] = testSetup(LinkComponent)
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  function testShouldContainContent(href: string | undefined) {
    it("should contain element's content", () => {
      const someText = 'some text here'
      const hostComponent = makeHostComponent(someText, href)
      const [fixture] = testSetup(hostComponent)
      fixture.detectChanges()

      expect(fixture.debugElement.nativeElement.textContent.trim()).toEqual(
        someText,
      )
    })
  }

  describe('when no href is given', () => {
    it('should not contain the anchor element', () => {
      const [fixture] = testSetup(LinkComponent)

      const anchorElement = fixture.debugElement.query(By.css('a'))
      expect(anchorElement).toBeFalsy()
    })

    testShouldContainContent(undefined)
  })

  describe('when href is given', () => {
    const href = 'https://example.org'

    it('should contain the anchor element with given href attribute', () => {
      const [fixture, component] = testSetup(LinkComponent)
      component.href = href
      fixture.detectChanges()

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
    template: `<app-link [href]="href">${textContent}</app-link>`,
    standalone: true,
    imports: [LinkComponent],
  })
  class TestHostComponent {
    public readonly href = href
  }
  return TestHostComponent
}
