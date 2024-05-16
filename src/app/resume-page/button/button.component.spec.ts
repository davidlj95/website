import { ButtonComponent } from './button.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { shouldProjectContent } from '@/test/helpers/component-testers'

describe('ButtonComponent', () => {
  it('should create', () => {
    const [fixture, component] = componentTestSetup(ButtonComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  shouldProjectContent(ButtonComponent)
})
