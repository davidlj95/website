import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ExperienceComponent } from './experience.component'
import { MockComponents } from 'ng-mocks'
import { ExperienceItemComponent } from './experience-item/experience-item.component'
import { H2Component } from '../h2/h2.component'
import {
  ensureHasComponent,
  getComponentSelector,
} from '../../../test/helpers/component-testers'
import { By } from '@angular/platform-browser'
import { ExperienceItemsService } from './experience-items.service'

describe('ExperienceComponent', () => {
  let component: ExperienceComponent
  let fixture: ComponentFixture<ExperienceComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExperienceComponent,
        MockComponents(H2Component, ExperienceItemComponent),
      ],
    })
    fixture = TestBed.createComponent(ExperienceComponent)
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
