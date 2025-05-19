import { ComponentFixture } from '@angular/core/testing'

import { ExperienceHighlightsComponent } from './experience-highlights.component'
import { By } from '@angular/platform-browser'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('ExperienceHighlightsComponent', () => {
  let component: ExperienceHighlightsComponent
  let fixture: ComponentFixture<ExperienceHighlightsComponent>
  const DUMMY_HIGHLIGHTS = ['Sample highlight 1', 'Sample highlight 2']

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(ExperienceHighlightsComponent)
    setFixtureInputsAndDetectChanges(fixture, { highlights: DUMMY_HIGHLIGHTS })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display all highlights', () => {
    const listElements = fixture.debugElement.queryAll(By.css('li'))

    expect(listElements.length).toBe(DUMMY_HIGHLIGHTS.length)
    listElements.forEach((listElement, index) => {
      expect(textContent(listElement)).toEqual(DUMMY_HIGHLIGHTS[index])
    })
  })
})
