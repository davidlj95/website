import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockComponents } from 'ng-mocks'
import { ensureHasComponents } from '../../test/helpers/component-testers'

import { AboutComponent } from './about.component'
import { JsonldMetadataComponent } from '../jsonld-metadata/jsonld-metadata.component'
import { PresentationComponent } from './presentation/presentation.component'
import { ExperienceComponent } from './experience/experience.component'
import { EducationComponent } from './education/education.component'

describe('AboutComponent', () => {
  let component: AboutComponent
  let fixture: ComponentFixture<AboutComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutComponent,
        MockComponents(
          JsonldMetadataComponent,
          PresentationComponent,
          ExperienceComponent,
          EducationComponent,
        ),
      ],
    })
    fixture = TestBed.createComponent(AboutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  ensureHasComponents(
    () => fixture,
    JsonldMetadataComponent,
    PresentationComponent,
    ExperienceComponent,
    EducationComponent,
  )
})
