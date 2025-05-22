import { ComponentFixture } from '@angular/core/testing'

import { PlainResumeComponent } from './plain-resume.component'
import { MockComponents, MockDirectives, MockPipes } from 'ng-mocks'
import { NgIconComponent } from '@ng-icons/core'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { LinkComponent } from '../link/link.component'
import { DateRangeComponent } from '../date-range/date-range.component'
import { ContentPageComponent } from '@/common/content-page/content-page.component'
import { MdLinksPipe } from '../md-links.pipe'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'
import { TechnologyComponent } from '../technology/technology.component'

describe('PlainResumeComponent', () => {
  let component: PlainResumeComponent
  let fixture: ComponentFixture<PlainResumeComponent>

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(PlainResumeComponent, {
      imports: [
        MockComponents(
          LinkComponent,
          DateRangeComponent,
          ContentPageComponent,
          NgIconComponent,
          TechnologyComponent,
        ),
        MockDirectives(MaterialSymbolDirective),
        MockPipes(MdLinksPipe),
      ],
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
