import { CardHeaderAttributesComponent } from './card-header-attributes.component'
import { componentTestSetup } from '@test/helpers/component-test-setup'
import { shouldProjectContent } from '@test/helpers/component-testers'

describe('CardHeaderAttributesComponent', () => {
  it('should create', () => {
    const [fixture, component] = componentTestSetup(
      CardHeaderAttributesComponent,
    )
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  shouldProjectContent(CardHeaderAttributesComponent)
})
