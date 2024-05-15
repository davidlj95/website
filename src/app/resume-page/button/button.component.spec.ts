import { ComponentFixture } from '@angular/core/testing'

import { ButtonComponent } from './button.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { shouldProjectContent } from '@/test/helpers/component-testers'

describe('ButtonComponent', () => {
  let component: ButtonComponent
  let fixture: ComponentFixture<ButtonComponent>

  beforeEach(async () => {
    ;[fixture, component] = componentTestSetup(ButtonComponent)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  shouldProjectContent(ButtonComponent)
})
