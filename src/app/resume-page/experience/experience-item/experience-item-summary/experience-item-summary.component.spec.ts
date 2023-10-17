import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExperienceItemSummaryComponent } from './experience-item-summary.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('ExperienceItemSummaryComponent', () => {
  let component: ExperienceItemSummaryComponent
  let fixture: ComponentFixture<ExperienceItemSummaryComponent>
  const summary = 'sample summary that explains what you did in there'

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceItemSummaryComponent],
      imports: [NoopAnimationsModule],
    })
    fixture = TestBed.createComponent(ExperienceItemSummaryComponent)
    component = fixture.componentInstance
    component.summary = summary
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should contain the summary', () => {
    expect(fixture.debugElement.nativeElement.textContent.trim()).toEqual(
      summary,
    )
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
