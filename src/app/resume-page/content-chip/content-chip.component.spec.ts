import { ComponentFixture } from '@angular/core/testing'

import { ContentChipComponent } from './content-chip.component'
import { componentTestSetup } from '@test/helpers/component-test-setup'
import { shouldProjectContent } from '@test/helpers/component-testers'

describe('ContentChipComponent', () => {
  let component: ContentChipComponent
  let fixture: ComponentFixture<ContentChipComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  shouldProjectContent(ContentChipComponent)
})

function makeSut() {
  return componentTestSetup(ContentChipComponent)
}
