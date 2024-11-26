import { ComponentFixture } from '@angular/core/testing'

import { TextContentComponent } from './text-content.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { textContent } from '@/test/helpers/text-content'

describe('TextContentComponent', () => {
  let component: TextContentComponent
  let fixture: ComponentFixture<TextContentComponent>

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(TextContentComponent)
  })

  it('should create', () => {
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should render text', () => {
    component.text = 'dummy text'
    fixture.detectChanges()

    expect(textContent(fixture.debugElement)).toEqual(component.text)
  })
})
