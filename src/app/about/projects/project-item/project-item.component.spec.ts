import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProjectItemComponent } from './project-item.component'
import { MockComponents } from 'ng-mocks'
import { CardComponent } from '../../card/card.component'
import { CardHeaderImageComponent } from '../../card/card-header/card-header-image/card-header-image.component'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { SAMPLE_PROJECT_ITEM } from './fixtures'

describe('ProjectItemComponent', () => {
  let component: ProjectItemComponent
  let fixture: ComponentFixture<ProjectItemComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectItemComponent,
        MockComponents(
          CardComponent,
          CardHeaderComponent,
          CardHeaderImageComponent,
        ),
      ],
    })
    fixture = TestBed.createComponent(ProjectItemComponent)
    component = fixture.componentInstance
    component.item = SAMPLE_PROJECT_ITEM
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
