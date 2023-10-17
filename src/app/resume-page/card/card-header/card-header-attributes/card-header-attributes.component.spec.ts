import { CardHeaderAttributesComponent } from './card-header-attributes.component'
import { testSetup } from '../../../../../test/helpers/component-test-setup'
import { ensureProjectsContent } from '../../../../../test/helpers/component-testers'

describe('CardHeaderAttributesComponent', () => {
  it('should create', () => {
    const [fixture, component] = testSetup(CardHeaderAttributesComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  ensureProjectsContent(CardHeaderAttributesComponent)
})
