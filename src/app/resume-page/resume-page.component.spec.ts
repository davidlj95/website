import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockComponents } from 'ng-mocks'
import { ensureHasComponents } from '../../test/helpers/component-testers'

import { ResumePageComponent } from './resume-page.component'
import { JsonldMetadataComponent } from '../jsonld-metadata/jsonld-metadata.component'
import { ProfileComponent } from './profile/profile.component'
import { ExperienceComponent } from './experience/experience.component'
import { EducationComponent } from './education/education.component'
import { ProjectsComponent } from './projects/projects.component'

describe('ResumePageComponent', () => {
  let component: ResumePageComponent
  let fixture: ComponentFixture<ResumePageComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResumePageComponent,
        MockComponents(
          JsonldMetadataComponent,
          ProfileComponent,
          ExperienceComponent,
          EducationComponent,
          ProjectsComponent,
        ),
      ],
    })
    fixture = TestBed.createComponent(ResumePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  ensureHasComponents(
    () => fixture,
    JsonldMetadataComponent,
    ProfileComponent,
    ExperienceComponent,
    EducationComponent,
  )
})
