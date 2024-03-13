import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EducationItemScoreComponent } from './education-item-score.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('EducationItemScoreComponent', () => {
  let component: EducationItemScoreComponent
  let fixture: ComponentFixture<EducationItemScoreComponent>
  const score = 'Very well, I studied a lot'

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [NoopAnimationsModule] })
    fixture = TestBed.createComponent(EducationItemScoreComponent)
    component = fixture.componentInstance
    component.score = score
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display score', () => {
    expect(fixture.debugElement.nativeElement.textContent.trim()).toEqual(score)
  })
})
