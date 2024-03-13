import { CardHeaderTitleComponent } from './card-header-title.component'
import { testSetup } from '../../../../../test/helpers/component-test-setup'

describe('CardHeaderTitleComponent', () => {
  it('should create', () => {
    const [fixture, component] = testSetup(CardHeaderTitleComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  //ensureProjectsContent(CardHeaderTitleComponent)
})
