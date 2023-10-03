import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProfessionalExperienceComponent } from './professional-experience.component'
import { MockComponents } from 'ng-mocks'
import { PositionComponent } from './position/position.component'

describe('ProfessionalExperienceComponent', () => {
  let component: ProfessionalExperienceComponent
  let fixture: ComponentFixture<ProfessionalExperienceComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfessionalExperienceComponent,
        MockComponents(PositionComponent),
      ],
    })
    fixture = TestBed.createComponent(ProfessionalExperienceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
