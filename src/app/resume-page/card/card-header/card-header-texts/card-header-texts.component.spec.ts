import { CardHeaderTextsComponent } from './card-header-texts.component'
import { testSetup } from '../../../../../test/helpers/component-test-setup'
import { shouldProjectContent } from '../../../../../test/helpers/component-testers'

describe('CardHeaderTextsComponent', () => {
  it('should create', () => {
    const [fixture, component] = testSetup(CardHeaderTextsComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  shouldProjectContent(CardHeaderTextsComponent)
})
