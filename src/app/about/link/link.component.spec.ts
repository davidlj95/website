import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LinkComponent } from './link.component'
import { By } from '@angular/platform-browser'
import { Component, Type } from '@angular/core'

describe('LinkComponent', () => {
  it('should create', () => {
    const [fixture, component] = testSetup()
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  function testShouldContainContent(href: string | undefined) {
    it("should contain element's content", () => {
      const someText = 'some text here'
      const hostComponent = makeHostComponent(someText, href)
      const [fixture] = testSetupWithHostComponent(hostComponent)
      fixture.detectChanges()

      expect(fixture.debugElement.nativeElement.textContent.trim()).toEqual(
        someText,
      )
    })
  }

  describe('when no href is given', () => {
    it('should not contain the anchor element', () => {
      const [fixture] = testSetup()

      const anchorElement = fixture.debugElement.query(By.css('a'))
      expect(anchorElement).toBeFalsy()
    })

    testShouldContainContent(undefined)
  })

  describe('when href is given', () => {
    const href = 'https://example.org'

    it('should contain the anchor element with given href attribute', () => {
      const [fixture, component] = testSetup()
      component.href = href
      fixture.detectChanges()

      const anchorElement = fixture.debugElement.query(By.css('a'))
      expect(anchorElement).toBeTruthy()
    })

    testShouldContainContent(href)
  })
})

function testSetup(): [ComponentFixture<LinkComponent>, LinkComponent] {
  TestBed.configureTestingModule({
    declarations: [LinkComponent],
  })
  const fixture = TestBed.createComponent(LinkComponent)
  return [fixture, fixture.componentInstance]
}

function testSetupWithHostComponent<T>(
  hostComponent: Type<T>,
): [ComponentFixture<T>, T] {
  TestBed.configureTestingModule({
    declarations: [hostComponent, LinkComponent],
  })
  const fixture = TestBed.createComponent(hostComponent)
  return [fixture, fixture.componentInstance]
}

function makeHostComponent(
  textContent: string,
  href: string | undefined,
): Type<unknown> {
  @Component({
    template: `<app-link [href]="href">${textContent}</app-link>`,
  })
  class TestHostComponent {
    public readonly href = href
  }
  return TestHostComponent
}
