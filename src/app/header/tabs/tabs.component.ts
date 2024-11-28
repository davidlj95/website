import {
  afterNextRender,
  afterRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  contentChildren,
  effect,
  ElementRef,
  Input,
  numberAttribute,
  OnDestroy,
  signal,
  viewChild,
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
  private readonly _tabs = contentChildren(TabComponent, {
    descendants: false,
  })
  private _currentTabs: readonly TabComponent[] = []
  private _indexToSelect?: number
  private _selectedIndex?: number
  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input({ transform: numberAttribute }) set selectedIndex(index: number) {
    this._indexToSelect = index
  }
  /// Scroll to selected
  private _indexToScrollTo?: number

  // Pagination
  private readonly _tabList =
    viewChild.required<ElementRef<HTMLElement>>('tabList')
  private _firstTab?: ElementRef<HTMLElement>
  private _lastTab?: ElementRef<HTMLElement>
  protected readonly _prevButtonDisabled = signal(true)
  protected readonly _nextButtonDisabled = signal(true)
  private _intersectionObserver?: IntersectionObserver

  constructor(elRef: ElementRef<Element>, cdRef: ChangeDetectorRef) {
    effect(this._onTabsChanged.bind(this))
    afterRender({
      read: () => {
        this._updateSelectedIfNeeded(cdRef)
        this._scrollToTabIfNeeded()
      },
    })
    afterNextRender({
      read: () => {
        this._setupIntersectionObserver(elRef)
      },
    })
  }

  // Selected management
  private _onTabsChanged() {
    const tabs = this._tabs()
    this._currentTabs = tabs
    ;[this._firstTab, this._lastTab] = [tabs.at(0)?.elRef, tabs.at(-1)?.elRef]
    this._resetIntersectionObserverTargets()
  }

  private _updateSelectedIfNeeded(cdRef: ChangeDetectorRef): void {
    if (
      this._indexToSelect === undefined ||
      this._currentTabs.length === 0 ||
      this._selectedIndex === this._indexToSelect
    ) {
      return
    }
    this._currentTabs.forEach(
      (tab, index) => (tab.isSelected = index === this._indexToSelect),
    )
    this._selectedIndex = this._indexToSelect
    this._indexToScrollTo = this._indexToSelect
    this._indexToSelect = undefined
    cdRef.markForCheck()
  }

  private _scrollToTabIfNeeded(): void {
    if (
      this._indexToScrollTo === undefined ||
      this._indexToScrollTo < 0 ||
      this._indexToScrollTo >= this._currentTabs.length
    )
      return
    ;(
      this._currentTabs.at(this._indexToScrollTo)?.elRef
        .nativeElement as HTMLElement
    ).scrollIntoView({ behavior: 'smooth' })
    this._indexToScrollTo = undefined
  }

  // Pagination
  private _setupIntersectionObserver(elRef: ElementRef<Element>) {
    this._intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entryByTarget = new Map<Element, IntersectionObserverEntry>(
          entries.map((entry) => [entry.target, entry] as const),
        )
        ;(
          [
            [this._firstTab!, this._prevButtonDisabled],
            [this._lastTab!, this._nextButtonDisabled],
          ] as const
        ).forEach(([tabElement, signalToUpdate]) => {
          const entry = entryByTarget.get(tabElement.nativeElement)
          if (entry) {
            signalToUpdate.set(entry.isIntersecting)
          }
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
    if (this._intersectionObserver && this._firstTab && this._lastTab) {
      this._intersectionObserver.disconnect()
      this._intersectionObserver.observe(this._firstTab.nativeElement)
      this._intersectionObserver.observe(this._lastTab.nativeElement)
    }
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
