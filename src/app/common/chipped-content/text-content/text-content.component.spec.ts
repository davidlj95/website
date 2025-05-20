import { ComponentFixture } from '@angular/core/testing'

import { TextContentComponent } from './text-content.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('TextContentComponent', () => {
  let component: TextContentComponent
  let fixture: ComponentFixture<TextContentComponent>
  const DUMMY_TEXT = 'dummy-text'

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(TextContentComponent)
    setFixtureInputsAndDetectChanges(fixture, { text: DUMMY_TEXT })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render text', () => {
    expect(textContent(fixture.debugElement)).toEqual(DUMMY_TEXT)
  })
})
