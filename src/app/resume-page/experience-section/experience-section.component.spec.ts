import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ExperienceSectionComponent } from './experience-section.component'
import { ExperienceItemComponent } from './experience-item/experience-item.component'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { shouldContainComponent } from '@/test/helpers/component-testers'
import { ExperienceItemsService } from './experience-items.service'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { NgFor } from '@angular/common'
import { MockComponents } from 'ng-mocks'

describe('ExperienceSectionComponent', () => {
  let component: ExperienceSectionComponent
  let fixture: ComponentFixture<ExperienceSectionComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()
    expect(component).toBeTruthy()
  })

  it('should display all items', () => {
    ;[fixture, component] = makeSut()
    fixture.detectChanges()

    const experienceItemsService = TestBed.inject(ExperienceItemsService)
    const itemElements = fixture.debugElement.queryAll(
      byComponent(ExperienceItemComponent),
    )
    expect(itemElements.length).toBe(
      experienceItemsService.getExperienceItems().length,
    )
  })

  shouldContainComponent(() => makeSut()[0], SectionTitleComponent)
})

function makeSut() {
  return componentTestSetup(ExperienceSectionComponent, {
    imports: [
      ExperienceSectionComponent,
      NgFor,
      MockComponents(SectionTitleComponent, ExperienceItemComponent),
    ],
  })
}
