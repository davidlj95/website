import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EducationComponent } from './education.component'
import { MockComponents } from 'ng-mocks'
import { H2Component } from '../h2/h2.component'
import { EducationItemComponent } from './education-item/education-item.component'
import { EducationItemsService } from './education-items.service'
import { byComponent } from '../../../test/helpers/component-query-predicates'

describe('EducationComponent', () => {
  let component: EducationComponent
  let fixture: ComponentFixture<EducationComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EducationComponent,
        MockComponents(H2Component, EducationItemComponent),
      ],
    })
    fixture = TestBed.createComponent(EducationComponent)
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