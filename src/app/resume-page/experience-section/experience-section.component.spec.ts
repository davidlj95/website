import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ExperienceSectionComponent } from './experience-section.component'
import { MockComponents } from 'ng-mocks'
import { ExperienceItemComponent } from './experience-item/experience-item.component'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { shouldContainComponent } from '@test/helpers/component-testers'
import { ExperienceItemsService } from './experience-items.service'
import { byComponent } from '@test/helpers/component-query-predicates'
import { NgFor } from '@angular/common'

describe('ExperienceSectionComponent', () => {
  let component: ExperienceSectionComponent
  let fixture: ComponentFixture<ExperienceSectionComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ExperienceSectionComponent,
        NgFor,
        MockComponents(SectionTitleComponent, ExperienceItemComponent),
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

  shouldContainComponent(() => fixture, SectionTitleComponent)
})
