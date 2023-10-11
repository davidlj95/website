import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProfessionalExperienceComponent } from './professional-experience.component'
import { MockComponents } from 'ng-mocks'
import { PositionComponent } from './position/position.component'
import { H2Component } from '../h2/h2.component'
import {
  ensureHasComponent,
  getComponentSelector,
} from '../../../test/helpers/component-testers'
import { By } from '@angular/platform-browser'
import { JsonResumeAdapterService } from '../json-resume-adapter.service'

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

  it('should display all positions', () => {
    const jsonResumeAdapter = TestBed.inject(JsonResumeAdapterService)
    const positionElements = fixture.debugElement.queryAll(
      By.css(getComponentSelector(PositionComponent)),
    )
    expect(positionElements.length).toBe(
      jsonResumeAdapter.getPositions().length,
    )
  })

  ensureHasComponent(() => fixture, H2Component)
})
