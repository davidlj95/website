import { TEST_ID_ATTRIBUTE, TestIdDirective } from './test-id.directive'
import { TestBed } from '@angular/core/testing'
import { Component, Type } from '@angular/core'
import { By } from '@angular/platform-browser'

describe('TestIdDirective', () => {
  it('should set the element test id attribute to the given id', () => {
    const elementTag = 'p'
    const testId = 'foobie'
    const component = makeComponentWithChildElementHavingTestIdDirectiveSetTo({
      elementTag,
      testId,
    })
    TestBed.configureTestingModule({})
    const fixture = TestBed.createComponent(component)
    fixture.detectChanges()

    const childElement = fixture.debugElement.query(By.css(elementTag))

    expect(childElement).toBeTruthy()
    expect(childElement.attributes[TEST_ID_ATTRIBUTE]).toEqual(testId)
  })
})

function makeComponentWithChildElementHavingTestIdDirectiveSetTo({
  elementTag,
  testId,
}: {
  elementTag: string
  testId: string
}): Type<unknown> {
  const template = `<${elementTag} [appTestId]="testId"></${elementTag}>`
  @Component({
    template,
    imports: [TestIdDirective],
  })
  class TestIdComponent {
    readonly testId = testId
  }
  return TestIdComponent
}
