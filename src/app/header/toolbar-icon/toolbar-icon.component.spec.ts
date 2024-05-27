import { ToolbarIconComponent } from './toolbar-icon.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MATERIAL_SYMBOLS_SELECTOR } from '@/test/helpers/material-symbols'
import { By } from '@angular/platform-browser'
import { ATTRIBUTE_ARIA_LABEL } from '@/test/helpers/aria'

describe('ToolbarIconComponent', () => {
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

  it('should set ARIA label', () => {
    const [fixture] = makeSut()
    fixture.detectChanges()

    const buttonElement = fixture.debugElement.query(By.css('button'))
    expect(buttonElement.attributes[ATTRIBUTE_ARIA_LABEL]).toBe(
      DUMMY_ARIA_LABEL,
    )
  })
})

const DUMMY_ICON = 'icon'
const DUMMY_ARIA_LABEL = 'label'
const makeSut = () => {
  const [fixture, component] = componentTestSetup(ToolbarIconComponent)
  component.icon = DUMMY_ICON
  component.ariaLabel = DUMMY_ARIA_LABEL
  return [fixture, component] as const
}
