import { ToolbarDividerComponent } from './toolbar-divider.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'

describe('ToolbarDividerComponent', () => {
  it('should create', () => {
    const [fixture, component] = componentTestSetup(ToolbarDividerComponent)
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })
})
