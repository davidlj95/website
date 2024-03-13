import { CardHeaderDetailComponent } from './card-header-detail.component'
import { testSetup } from '../../../../../test/helpers/component-test-setup'

describe('CardHeaderDetailComponent', () => {
  it('should create', () => {
    const [fixture, component] = testSetup(CardHeaderDetailComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  //ensureProjectsContent(CardHeaderDetailComponent)
})
