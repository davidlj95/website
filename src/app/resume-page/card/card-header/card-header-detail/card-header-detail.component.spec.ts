import { CardHeaderDetailComponent } from './card-header-detail.component'
import { testSetup } from '../../../../../test/helpers/component-test-setup'
import { ensureProjectsContent } from '../../../../../test/helpers/component-testers'

describe('CardHeaderDetailComponent', () => {
  it('should create', () => {
    const [fixture, component] = testSetup(CardHeaderDetailComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  ensureProjectsContent(CardHeaderDetailComponent)
})
