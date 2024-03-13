import { CardHeaderComponent } from './card-header.component'
import { testSetup } from '../../../../test/helpers/component-test-setup'
import { ensureProjectsContent } from '../../../../test/helpers/component-testers'

describe('CardHeaderComponent', () => {
  it('should create', () => {
    const [fixture, component] = testSetup(CardHeaderComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  ensureProjectsContent(CardHeaderComponent)
})
