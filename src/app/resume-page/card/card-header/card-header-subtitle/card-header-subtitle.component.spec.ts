import { CardHeaderSubtitleComponent } from './card-header-subtitle.component'
import { testSetup } from '../../../../../test/helpers/component-test-setup'

describe('CardHeaderSubtitleComponent', () => {
  it('should create', () => {
    const [fixture, component] = testSetup(CardHeaderSubtitleComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  //ensureProjectsContent(CardHeaderSubtitleComponent)
})
