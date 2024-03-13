import { CardHeaderDetailComponent } from './card-header-detail.component'
import { componentTestSetup } from '../../../../../test/helpers/component-test-setup'
import { shouldProjectContent } from '../../../../../test/helpers/component-testers'

describe('CardHeaderDetailComponent', () => {
  it('should create', () => {
    const [fixture, component] = componentTestSetup(CardHeaderDetailComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  shouldProjectContent(CardHeaderDetailComponent)
})
