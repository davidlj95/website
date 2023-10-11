import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ProfessionalExperienceComponent } from './professional-experience.component'
import { MockComponents } from 'ng-mocks'
import { ExperienceItemComponent } from './experience-item/experience-item.component'
import { H2Component } from '../h2/h2.component'
import {
  ensureHasComponent,
  getComponentSelector,
} from '../../../test/helpers/component-testers'
import { By } from '@angular/platform-browser'
import { ExperienceItemsService } from './experience-items.service'

describe('ProfessionalExperienceComponent', () => {
  let component: ProfessionalExperienceComponent
  let fixture: ComponentFixture<ProfessionalExperienceComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfessionalExperienceComponent,
        MockComponents(H2Component, ExperienceItemComponent),
      ],
    })
    fixture = TestBed.createComponent(ProfessionalExperienceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display all items', () => {
    const experienceItemsService = TestBed.inject(ExperienceItemsService)
    const itemElements = fixture.debugElement.queryAll(
      By.css(getComponentSelector(ExperienceItemComponent)),
    )
    expect(itemElements.length).toBe(
      experienceItemsService.getExperienceItems().length,
    )
  })

  ensureHasComponent(() => fixture, H2Component)
})
