import { CardHeaderTitleComponent } from './card-header-title.component'
import { testSetup } from '../../../../../test/helpers/component-test-setup'
import { ensureProjectsContent } from '../../../../../test/helpers/component-testers'

describe('CardHeaderTitleComponent', () => {
  it('should create', () => {
    const [fixture, component] = testSetup(CardHeaderTitleComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  ensureProjectsContent(CardHeaderTitleComponent)
})