import { ComponentFixture } from '@angular/core/testing'

import { ToolbarComponent } from './toolbar.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { shouldProjectContent } from '@/test/helpers/component-testers'

describe('ToolbarComponent', () => {
  let component: ToolbarComponent
  let fixture: ComponentFixture<ToolbarComponent>

  it('should create', () => {
    ;[fixture, component] = componentTestSetup(ToolbarComponent)
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  shouldProjectContent(ToolbarComponent)
})
