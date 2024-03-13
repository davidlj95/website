import { CardHeaderComponent } from './card-header.component'
import { testSetup } from '../../../../test/helpers/component-test-setup'
import { shouldProjectContent } from '../../../../test/helpers/component-testers'

describe('CardHeaderComponent', () => {
  it('should create', () => {
    const [fixture, component] = testSetup(CardHeaderComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  shouldProjectContent(CardHeaderComponent)
})
