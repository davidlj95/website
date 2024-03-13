import { SectionTitleComponent } from './section-title.component'
import { componentTestSetup } from '../../../test/helpers/component-test-setup'

describe('SectionTitleComponent', () => {
  it('should create', () => {
    const [fixture, component] = componentTestSetup(SectionTitleComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })
})
