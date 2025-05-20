import { ContentPageComponent } from './content-page.component'
import { shouldProjectContent } from '@/test/helpers/component-testers'
import { componentTestSetup } from '@/test/helpers/component-test-setup'

describe('ContentPageComponent', () => {
  it('should create', () => {
    const [fixture, component] = componentTestSetup(ContentPageComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  shouldProjectContent(ContentPageComponent)
})
