import { ToolbarButtonComponent } from './toolbar-button.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('ToolbarButtonComponent', () => {
  it('should contain icon', () => {
    const [fixture] = makeSut()
    fixture.detectChanges()

    expect(textContent(fixture.debugElement)).toBe(DUMMY_ICON)
  })
})

const DUMMY_ICON = 'icon'
const makeSut = () => {
  const [fixture, component] = componentTestSetup(ToolbarButtonComponent)
  setFixtureInputsAndDetectChanges(fixture, { icon: DUMMY_ICON })
  return [fixture, component] as const
}
