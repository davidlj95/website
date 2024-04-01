import { ComponentFixture } from '@angular/core/testing'

import { TextContentComponent } from './text-content.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'

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

    expect(fixture.debugElement.nativeElement.textContent.trim()).toEqual(
      component.text,
    )
  })
})
