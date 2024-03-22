import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProjectItemTechnologiesComponent } from './project-item-technologies.component'

describe('ProjectItemTechnologiesComponent', () => {
  let component: ProjectItemTechnologiesComponent
  let fixture: ComponentFixture<ProjectItemTechnologiesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectItemTechnologiesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ProjectItemTechnologiesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
