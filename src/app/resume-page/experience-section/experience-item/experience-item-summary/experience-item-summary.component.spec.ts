import { ComponentFixture } from '@angular/core/testing'

import { ExperienceItemSummaryComponent } from './experience-item-summary.component'
import { componentTestSetup } from '@test/helpers/component-test-setup'

describe('ExperienceItemSummaryComponent', () => {
  let component: ExperienceItemSummaryComponent
  let fixture: ComponentFixture<ExperienceItemSummaryComponent>
  const summary = 'sample summary that explains what you did in there'

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(ExperienceItemSummaryComponent)
    component.summary = summary
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should contain the summary', () => {
    expect(fixture.debugElement.nativeElement.textContent.trim()).toEqual(
      summary,
    )
  })
})
