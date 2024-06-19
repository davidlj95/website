import { TabsComponent } from './tabs.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { Component, DebugElement } from '@angular/core'
import { TabComponent } from '../tab/tab.component'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { ToolbarButtonComponent } from '../toolbar-button/toolbar-button.component'
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '../../material-symbols'
import { forcePxWidth } from '@/test/helpers/force-width'
import { findByText } from '@/test/helpers/find-by-text'
import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import {
  expectIsInViewport,
  expectIsNotInViewport,
} from '@/test/helpers/scroll'

describe('TabsComponent', () => {
  it('should create', () => {
    const [fixture, component] = makeSut()
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  const TAB_GROUP_SELECTOR = By.css('[role="tablist"]')
  it('should assign tab list ARIA role to tab group element', () => {
    const [fixture] = makeSut()
    fixture.detectChanges()

    expect(fixture.debugElement.query(TAB_GROUP_SELECTOR)).toBeTruthy()
  })

  const nthTabSelector = (nth: number) => By.css(`app-tab:nth-child(${nth})`)
  const FIRST_TAB_SELECTOR = By.css('app-tab:first-child')
  const LAST_TAB_SELECTOR = By.css('app-tab:last-child')
  const findToolbarIcons = (debugElement: DebugElement) =>
    debugElement.queryAll(byComponent(ToolbarButtonComponent))

  const findLeftArrow = (debugElement: DebugElement) =>
    findByText(findToolbarIcons(debugElement), KeyboardDoubleArrowLeft)!

  const findRightArrow = (debugElement: DebugElement) =>
    findByText(findToolbarIcons(debugElement), KeyboardDoubleArrowRight)!

  it('should display left and right arrows', () => {
    const [fixture] = makeSut()
    fixture.detectChanges()

    expect(findLeftArrow(fixture.debugElement)).toBeTruthy()
    expect(findRightArrow(fixture.debugElement)).toBeTruthy()
  })

  const itShouldDisableLeftArrow = (debugElementGetter: () => DebugElement) => {
    it('should disable left arrow', () => {
      expect(
        findLeftArrow(debugElementGetter()).nativeElement.disabled,
      ).toBeTrue()
    })
  }
  const itShouldEnableLeftArrow = (debugElementGetter: () => DebugElement) => {
    it('should enable left arrow', () => {
      expect(
        findLeftArrow(debugElementGetter()).nativeElement.disabled,
      ).toBeFalse()
    })
  }
  const itShouldDisableRightArrow = (
    debugElementGetter: () => DebugElement,
  ) => {
    it('should disable right arrow', () => {
      expect(
        findRightArrow(debugElementGetter()).nativeElement.disabled,
      ).toBeTrue()
    })
  }
  const itShouldEnableRightArrow = (debugElementGetter: () => DebugElement) => {
    it('should enable right arrow', () => {
      expect(
        findRightArrow(debugElementGetter()).nativeElement.disabled,
      ).toBeFalse()
    })
  }

  describe('when all tabs fit the screen', () => {
    let fixture: ComponentFixture<unknown>

    beforeEach(async () => {
      const hostComponent = makeHostComponent(['a'])
      ;[fixture] = componentTestSetup(hostComponent)
      forcePxWidth(
        fixture.debugElement.query(By.css('[role="tablist"]')),
        TAB_WIDTH_PX * 3,
      )
      fixture.detectChanges()

      await expectIsInViewport(
        fixture.debugElement.query(FIRST_TAB_SELECTOR).nativeElement,
      )
      await expectIsInViewport(
        fixture.debugElement.query(LAST_TAB_SELECTOR).nativeElement,
      )
      fixture.detectChanges()
    })

    itShouldDisableLeftArrow(() => fixture.debugElement)
    itShouldDisableRightArrow(() => fixture.debugElement)
  })

  const TAB_CONTAINER_PREDICATE = By.css('[role="tablist"]')
  describe('when not all tabs fit the screen', () => {
    let fixture: ComponentFixture<unknown>
    let tabContainer: DebugElement
    const VISIBLE_TABS = 3

    beforeEach(async () => {
      const hostComponent = makeHostComponent([
        'TAB #1',
        'TAB #2',
        'TAB #3',
        'TAB #4',
        'TAB #5',
        'TAB #6',
        'TAB #7',
        'TAB #8',
      ])
      ;[fixture] = componentTestSetup(hostComponent)
      tabContainer = fixture.debugElement.query(TAB_CONTAINER_PREDICATE)
      // Just 3 tabs fit
      //👇 -1 because if just a bit of next tab
      forcePxWidth(tabContainer, TAB_WIDTH_PX * VISIBLE_TABS - 1)
      fixture.detectChanges()
      await expectIsInViewport(
        fixture.debugElement.query(FIRST_TAB_SELECTOR).nativeElement,
        { viewport: tabContainer.nativeElement, context: 'initial first tab' },
      )
      await expectIsNotInViewport(
        fixture.debugElement.query(nthTabSelector(VISIBLE_TABS + 2))
          .nativeElement,
        { viewport: tabContainer.nativeElement, context: 'initial last tab' },
      )
      fixture.detectChanges()
    })

    describe('initially', () => {
      itShouldDisableLeftArrow(() => fixture.debugElement)
      itShouldEnableRightArrow(() => fixture.debugElement)
    })

    describe('when scrolling a bit', () => {
      beforeEach(async () => {
        ;(
          fixture.debugElement.query(nthTabSelector(VISIBLE_TABS + 3))
            .nativeElement as HTMLElement
        ).scrollIntoView()
        await expectIsNotInViewport(
          fixture.debugElement.query(FIRST_TAB_SELECTOR).nativeElement,
          { context: 'first tab', waitForChange: true },
        )
        await expectIsNotInViewport(
          fixture.debugElement.query(LAST_TAB_SELECTOR).nativeElement,
          { context: 'last tab' },
        )
        fixture.detectChanges()
      })

      itShouldEnableLeftArrow(() => fixture.debugElement)
      itShouldEnableRightArrow(() => fixture.debugElement)
    })

    describe('when scrolling until last tab', () => {
      beforeEach(async () => {
        ;(
          fixture.debugElement.query(LAST_TAB_SELECTOR)
            .nativeElement as HTMLElement
        ).scrollIntoView()
        await expectIsNotInViewport(
          fixture.debugElement.query(FIRST_TAB_SELECTOR).nativeElement,
          { context: 'first tab', waitForChange: true },
        )
        await expectIsInViewport(
          fixture.debugElement.query(LAST_TAB_SELECTOR).nativeElement,
          { context: 'last tab', waitForChange: true },
        )
        fixture.detectChanges()
      })

      itShouldEnableLeftArrow(() => fixture.debugElement)
      itShouldDisableRightArrow(() => fixture.debugElement)
    })
  })
})

const makeSut = () => componentTestSetup(TabsComponent)

const TAB_WIDTH_PX = 100
const makeHostComponent = (tabs: ReadonlyArray<string>) => {
  @Component({
    template: `
      <app-tabs>
        @for (tab of tabs; track $index) {
          <app-tab [style.width]="${TAB_WIDTH_PX} + 'px'">{{ tab }}</app-tab>
        }
      </app-tabs>
    `,
    standalone: true,
    imports: [TabsComponent, TabComponent],
  })
  class HostComponent {
    public tabs = tabs
  }

  return HostComponent
}
