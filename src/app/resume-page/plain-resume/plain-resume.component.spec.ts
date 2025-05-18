import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PlainResumeComponent } from './plain-resume.component'

describe('PlainResumeComponent', () => {
  let component: PlainResumeComponent
  let fixture: ComponentFixture<PlainResumeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlainResumeComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PlainResumeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
