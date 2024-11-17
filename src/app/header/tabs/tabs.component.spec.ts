import { TabsComponent } from './tabs.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { Component, DebugElement } from '@angular/core'
import { TabComponent } from '../tab/tab.component'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { ToolbarButtonComponent } from '../toolbar-button/toolbar-button.component'
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

    const tabElements = fixture.debugElement.queryAll(byComponent(TabComponent))
    tabElements.forEach((tabElement, index) => {
      const shouldBeSelected = index === selectedIndex
      expect(getComponentInstance(tabElement, TabComponent).selected)
        .withContext(
          `tab ${index} is ${shouldBeSelected ? 'selected' : 'not selected'}`,
        )
        .toBe(shouldBeSelected)
    })
  })

  const findToolbarIcons = (debugElement: DebugElement) =>
    debugElement.queryAll(byComponent(ToolbarButtonComponent))

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
  opts: { tabs?: ReadonlyArray<string>; selectedIndex?: number } = {},
) => {
  @Component({
    template: `
      <app-tabs [selectedIndex]="selectedIndex">
        @for (tab of tabs; track $index) {
          <app-tab>
            <span [style.width.px]="${TAB_WIDTH_PX}">
              {{ tab }}
            </span></app-tab
          >
        }
      </app-tabs>
    `,
    standalone: true,
    imports: [TabsComponent, TabComponent],
  })
  class HostComponent {
    public tabs = opts.tabs ?? []
    public selectedIndex = opts.selectedIndex
  }

  return HostComponent
}
