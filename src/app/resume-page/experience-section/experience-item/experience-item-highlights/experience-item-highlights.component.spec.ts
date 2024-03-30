import { ComponentFixture } from '@angular/core/testing'

import { ExperienceItemHighlightsComponent } from './experience-item-highlights.component'
import { By } from '@angular/platform-browser'
import { componentTestSetup } from '@test/helpers/component-test-setup'

describe('ExperienceItemHighlightsComponent', () => {
  let component: ExperienceItemHighlightsComponent
  let fixture: ComponentFixture<ExperienceItemHighlightsComponent>
  const highlights = ['Sample highlight 1', 'Sample highlight 2']

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(
      ExperienceItemHighlightsComponent,
    )
    component.highlights = highlights
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display all highlights', () => {
    const listElements = fixture.debugElement.queryAll(By.css('li'))
    expect(listElements.length).toBe(highlights.length)
    listElements.forEach((listElement, index) => {
      expect(listElement.nativeElement.textContent.trim()).toEqual(
        highlights[index],
      )
    })
  })
})
