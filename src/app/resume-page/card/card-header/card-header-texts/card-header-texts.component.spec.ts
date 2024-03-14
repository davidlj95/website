import { CardHeaderTextsComponent } from './card-header-texts.component'
import { componentTestSetup } from '@test/helpers/component-test-setup'
import { shouldProjectContent } from '@test/helpers/component-testers'

describe('CardHeaderTextsComponent', () => {
  it('should create', () => {
    const [fixture, component] = componentTestSetup(CardHeaderTextsComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  shouldProjectContent(CardHeaderTextsComponent)
})
