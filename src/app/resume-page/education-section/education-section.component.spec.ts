import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EducationSectionComponent } from './education-section.component'
import { EducationItemComponent } from './education-item/education-item.component'
import { EducationItemsService } from './education-items.service'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { MockComponents } from 'ng-mocks'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { NgForOf } from '@angular/common'
import { componentTestSetup } from '@/test/helpers/component-test-setup'

describe('EducationSectionComponent', () => {
  let component: EducationSectionComponent
  let fixture: ComponentFixture<EducationSectionComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()
    expect(component).toBeTruthy()
  })

  it('should display all items', () => {
    ;[fixture, component] = makeSut()
    fixture.detectChanges()

    const educationItemsService = TestBed.inject(EducationItemsService)
    const educationItemElements = fixture.debugElement.queryAll(
      byComponent(EducationItemComponent),
    )
    expect(educationItemElements.length).toBe(
      educationItemsService.getEducationItems().length,
    )
  })
})

function makeSut() {
  return componentTestSetup(EducationSectionComponent, {
    imports: [
      EducationSectionComponent,
      NgForOf,
      MockComponents(SectionTitleComponent, EducationItemComponent),
    ],
  })
}
