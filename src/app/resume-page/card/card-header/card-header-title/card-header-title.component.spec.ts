import { CardHeaderTitleComponent } from './card-header-title.component'
import { testSetup } from '../../../../../test/helpers/component-test-setup'
import { shouldProjectContent } from '../../../../../test/helpers/component-testers'

describe('CardHeaderTitleComponent', () => {
  it('should create', () => {
    const [fixture, component] = testSetup(CardHeaderTitleComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  shouldProjectContent(CardHeaderTitleComponent)
})
