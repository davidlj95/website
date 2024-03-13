import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExperienceItemHighlightsComponent } from './experience-item-highlights.component'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('ExperienceItemHighlightsComponent', () => {
  let component: ExperienceItemHighlightsComponent
  let fixture: ComponentFixture<ExperienceItemHighlightsComponent>
  const highlights = ['Sample highlight 1', 'Sample highlight 2']

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ExperienceItemHighlightsComponent],
    })
    fixture = TestBed.createComponent(ExperienceItemHighlightsComponent)
    component = fixture.componentInstance
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

  it('should emit animation done event when animation finishes', () => {
    let eventEmitted = false
    component.enterAndLeaveAnimationDone.subscribe(() => {
      eventEmitted = true
    })
    fixture.debugElement.triggerEventHandler('@enterAndLeave.done')
    expect(eventEmitted).toBeTrue()
  })
})
