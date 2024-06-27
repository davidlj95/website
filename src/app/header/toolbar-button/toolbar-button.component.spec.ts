import { ToolbarButtonComponent } from './toolbar-button.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MATERIAL_SYMBOLS_SELECTOR } from '@/test/helpers/material-symbols'

describe('ToolbarButtonComponent', () => {
  it('should create', () => {
    const [fixture, component] = makeSut()
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should contain icon', () => {
    const [fixture] = makeSut()
    fixture.detectChanges()

    const iconElement = fixture.debugElement.query(MATERIAL_SYMBOLS_SELECTOR)
    expect(iconElement.nativeElement.textContent.trim()).toBe(DUMMY_ICON)
  })
})

const DUMMY_ICON = 'icon'
const makeSut = () => {
  const [fixture, component] = componentTestSetup(ToolbarButtonComponent)
  component.icon = DUMMY_ICON
  return [fixture, component] as const
}
