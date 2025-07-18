import { TabsComponent } from './tabs.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { Component, DebugElement } from '@angular/core'
import { TabComponent } from '../tab/tab.component'
import { ToolbarButtonComponent } from '@/common/toolbar-button/toolbar-button.component'
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@/data/material-symbols'
import { findByText } from '@/test/helpers/find-by-text'
import { By } from '@angular/platform-browser'
import { getComponentInstance } from '@/test/helpers/get-component-instance'

describe('TabsComponent', () => {
  beforeEach(() => {
    spyOn(console, 'log')
  })

  it('should create', () => {
    const [fixture, component] = makeSut()
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  const TAB_CONTAINER_SELECTOR = By.css('[role="tablist"]')
  it('should assign tab list ARIA role to tab group element', () => {
    const [fixture] = makeSut()
    fixture.detectChanges()

    expect(fixture.debugElement.query(TAB_CONTAINER_SELECTOR)).toBeTruthy()
  })

  it('should mark the given tab as selected and the rest as not selected', async () => {
    const selectedIndex = 1
    const hostComponent = makeHostComponent({
      tabs: ['tab 0', 'tab 1', 'tab 2'],
      selectedIndex,
    })

    const [fixture] = componentTestSetup(hostComponent)
    fixture.detectChanges()
    await fixture.whenStable()

    const tabElements = fixture.debugElement.queryAll(
      By.directive(TabComponent),
    )
    tabElements.forEach((tabElement, index) => {
      const shouldBeSelected = index === selectedIndex

      expect(getComponentInstance(tabElement, TabComponent).isSelected)
        .withContext(
          `tab ${index} is ${shouldBeSelected ? 'selected' : 'not selected'}`,
        )
        .toBe(shouldBeSelected)
    })
  })

  const findToolbarIcons = (debugElement: DebugElement) =>
    debugElement.queryAll(By.directive(ToolbarButtonComponent))

  it('should display left and right arrows', () => {
    const [fixture] = makeSut()
    fixture.detectChanges()

    expect(
      findByText(
        findToolbarIcons(fixture.debugElement),
        KeyboardDoubleArrowLeft,
      )!,
    ).toBeTruthy()

    expect(
      findByText(
        findToolbarIcons(fixture.debugElement),
        KeyboardDoubleArrowRight,
      )!,
    ).toBeTruthy()
  })
})

const makeSut = () => componentTestSetup(TabsComponent)

const TAB_WIDTH_PX = 100
const makeHostComponent = (
  opts: { tabs?: readonly string[]; selectedIndex?: number } = {},
) => {
  @Component({
    template: `
      <app-tabs [selectedIndex]="selectedIndex">
        @for (tab of tabs; track $index) {
          <a appTab [style.width.px]="_TAB_WIDTH_PX">{{ tab }}</a>
        }
      </app-tabs>
    `,
    imports: [TabsComponent, TabComponent],
  })
  class HostComponent {
    _TAB_WIDTH_PX = TAB_WIDTH_PX
    tabs = opts.tabs ?? []
    selectedIndex = opts.selectedIndex
  }

  return HostComponent
}
