import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EducationSectionComponent } from './education-section.component'
import { EducationItemComponent } from './education-item/education-item.component'
import { EducationItemsService } from './education-items.service'
import { byComponent } from '@test/helpers/component-query-predicates'
import { MockComponents } from 'ng-mocks'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { NgForOf } from '@angular/common'

describe('EducationSectionComponent', () => {
  let component: EducationSectionComponent
  let fixture: ComponentFixture<EducationSectionComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EducationSectionComponent,
        NgForOf,
        MockComponents(SectionTitleComponent, EducationItemComponent),
      ],
    })
    fixture = TestBed.createComponent(EducationSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display all items', () => {
    const educationItemsService = TestBed.inject(EducationItemsService)
    const educationItemElements = fixture.debugElement.queryAll(
      byComponent(EducationItemComponent),
    )
    expect(educationItemElements.length).toBe(
      educationItemsService.getEducationItems().length,
    )
  })
})
