import { CardHeaderSubtitleComponent } from './card-header-subtitle.component'
import { testSetup } from '../../../../../test/helpers/component-test-setup'
import { shouldProjectContent } from '../../../../../test/helpers/component-testers'

describe('CardHeaderSubtitleComponent', () => {
  it('should create', () => {
    const [fixture, component] = testSetup(CardHeaderSubtitleComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  shouldProjectContent(CardHeaderSubtitleComponent)
})
