import { ComponentFixture } from '@angular/core/testing'

import { ContentChipListComponent } from './content-chip-list.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { shouldProjectContent } from '@/test/helpers/component-testers'

describe('ContentChipListComponent', () => {
  let component: ContentChipListComponent
  let fixture: ComponentFixture<ContentChipListComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  shouldProjectContent(ContentChipListComponent)
})

function makeSut() {
  return componentTestSetup(ContentChipListComponent)
}
