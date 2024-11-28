import {
  afterNextRender,
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  ElementRef,
  input,
  OnDestroy,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core'
import { ToolbarButtonComponent } from '../toolbar-button/toolbar-button.component'
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@/data/material-symbols'
import { TabComponent } from '../tab/tab.component'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  imports: [ToolbarButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements OnDestroy {
  protected readonly MaterialSymbol = {
    KeyboardDoubleArrowLeft,
    KeyboardDoubleArrowRight,
  }

  // Selected management
  readonly selectedIndex = input<number>()
  private readonly _tabs = contentChildren(TabComponent, {
    descendants: false,
  })

  // Pagination
  private readonly _tabList =
    viewChild.required<ElementRef<HTMLElement>>('tabList')
  protected readonly _prevButtonDisabled = signal(true)
  protected readonly _nextButtonDisabled = signal(true)
  private _intersectionObserver?: IntersectionObserver

  constructor(elRef: ElementRef<Element>) {
    // 👇 If tabs change, observe new first and last tab elements.
    effect(() => this._resetIntersectionObserverTargets())
    // 👇 Listen to `selectedIndex` input and update selected tab
    effect(() => this._setSelectedTab())
    // 👇 Important to be `afterRenderEffect` so scroll is last thing that happens
    afterRenderEffect({
      read: () => this._scrollToSelectedTab(),
    })
    // 👇 Client-side only. Needs the tab elements to observe.
    afterNextRender({
      read: () => this._setupIntersectionObserver(elRef),
    })
  }

  // Selected management
  private _setSelectedTab(): void {
    if (this.selectedIndex() === undefined) {
      return
    }
    this._tabs().forEach(
      (tab, index) => (tab.isSelected = index === this.selectedIndex()),
    )
  }

  private _scrollToSelectedTab(): void {
    const selectedIndex = this.selectedIndex()
    if (selectedIndex === undefined) {
      return
    }
    this._tabs()
      .at(selectedIndex)
      ?.elRef.nativeElement.scrollIntoView({ behavior: 'smooth' })
  }

  // Pagination
  private _setupIntersectionObserver(elRef: ElementRef<Element>) {
    this._intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [firstTab, lastTab] = firstTabAndLastTabElements(this._tabs())
        const signalToUpdateByElement = new Map<
          Element | undefined,
          WritableSignal<boolean>
        >([
          [firstTab, this._prevButtonDisabled],
          [lastTab, this._nextButtonDisabled],
        ])
        entries.forEach((entry) => {
          signalToUpdateByElement.get(entry.target)?.set(entry.isIntersecting)
        })
      },
      {
        root: elRef.nativeElement,
        threshold: [0.8],
      },
    )
    this._resetIntersectionObserverTargets()
  }

  private _resetIntersectionObserverTargets(): void {
    const [firstTab, lastTab] = firstTabAndLastTabElements(this._tabs())
    this._intersectionObserver?.disconnect()
    if (firstTab) this._intersectionObserver?.observe(firstTab)
    if (lastTab) this._intersectionObserver?.observe(lastTab)
  }

  ngOnDestroy(): void {
    this._intersectionObserver?.disconnect()
  }

  protected _scrollABit(scrollDirection: -1 | 1) {
    const tabListContainer = this._tabList().nativeElement
    //👇 Amount to scroll extracted from MatTab
    //   https://github.com/angular/components/blob/18.0.5/src/material/tabs/paginated-tab-header.ts#L473-L488
    const tabListContainerLength = tabListContainer.offsetWidth
    const scrollAmount = tabListContainerLength / 3
    const newScrollPosition = Math.max(
      tabListContainer.scrollLeft + scrollAmount * scrollDirection,
      0,
    )
    tabListContainer.scrollTo({
      behavior: 'smooth',
      left: newScrollPosition,
    })
  }
}

const firstTabAndLastTabElements = (tabs: readonly TabComponent[]) =>
  [tabs.at(0)?.elRef.nativeElement, tabs.at(-1)?.elRef.nativeElement] as const
