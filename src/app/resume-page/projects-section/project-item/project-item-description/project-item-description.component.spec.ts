import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProjectItemDescriptionComponent } from './project-item-description.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('ProjectItemDescriptionComponent', () => {
  let component: ProjectItemDescriptionComponent
  let fixture: ComponentFixture<ProjectItemDescriptionComponent>
  const description = 'Super cool features included'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    })
    fixture = TestBed.createComponent(ProjectItemDescriptionComponent)
    component = fixture.componentInstance
    component.description = description
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should contain the description', () => {
    expect(fixture.debugElement.nativeElement.textContent.trim()).toEqual(
      description,
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
