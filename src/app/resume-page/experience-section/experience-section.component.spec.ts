import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ExperienceSectionComponent } from './experience-section.component'
import { MockComponents } from 'ng-mocks'
import { ExperienceItemComponent } from './experience-item/experience-item.component'
import { H2Component } from '../h2/h2.component'
import { ensureHasComponent } from '../../../test/helpers/component-testers'
import { ExperienceItemsService } from './experience-items.service'
import { byComponent } from '../../../test/helpers/component-query-predicates'

describe('ExperienceSectionComponent', () => {
  let component: ExperienceSectionComponent
  let fixture: ComponentFixture<ExperienceSectionComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExperienceSectionComponent,
        MockComponents(H2Component, ExperienceItemComponent),
      ],
    })
    fixture = TestBed.createComponent(ExperienceSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display all items', () => {
    const experienceItemsService = TestBed.inject(ExperienceItemsService)
    const itemElements = fixture.debugElement.queryAll(
      byComponent(ExperienceItemComponent),
    )
    expect(itemElements.length).toBe(
      experienceItemsService.getExperienceItems().length,
    )
  })

  ensureHasComponent(() => fixture, H2Component)
})