import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProfessionalExperienceComponent } from './professional-experience.component'
import { MockComponents } from 'ng-mocks'
import { PositionComponent } from './position/position.component'
import { H2Component } from '../h2/h2.component'
import { ensureHasComponent } from '../../../test/helpers/component-testers'

describe('ProfessionalExperienceComponent', () => {
  let component: ProfessionalExperienceComponent
  let fixture: ComponentFixture<ProfessionalExperienceComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfessionalExperienceComponent,
        MockComponents(H2Component, PositionComponent),
      ],
    })
    fixture = TestBed.createComponent(ProfessionalExperienceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  ensureHasComponent(() => fixture, H2Component)
})
