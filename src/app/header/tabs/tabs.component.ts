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

  private _tabs = contentChildren(TabComponent, {
    descendants: false,
  })

  // Pagination
  private _tabList = viewChild<ElementRef<HTMLElement>>('tabList')
  private _firstTab?: ElementRef<HTMLElement>
  private _lastTab?: ElementRef<HTMLElement>
  protected _prevButtonDisabled = signal(true)
  protected _nextButtonDisabled = signal(true)
  public _intersectionObserver!: IntersectionObserver

  // Selected management
  private _currentTabs: readonly TabComponent[] = []
  private _indexToSelect?: number
  private _selectedIndex?: number
  @Input({ transform: numberAttribute }) set selectedIndex(index: number) {
    this._indexToSelect = index
  }
  /// Scroll to selected
  private _indexToScrollTo?: number

  constructor(
    private _elRef: ElementRef,
    private _cdRef: ChangeDetectorRef,
  ) {
    afterNextRender({
      read: () => {
        this._setupIntersectionObserver()
      },
    })
    afterRender({
      read: () => {
        this._updateSelectedIfNeeded()
        this._scrollToTabIfNeeded()
      },
    })
    effect(this._onTabsChanged.bind(this))
  }

  private _updateSelectedIfNeeded(): void {
    if (
      this._indexToSelect === undefined ||
      isNaN(this._indexToSelect) ||
      this._currentTabs.length === 0 ||
      (this._selectedIndex !== undefined &&
        this._selectedIndex === this._indexToSelect)
    )
      return
    this._currentTabs.forEach(
      (tab, index) => (tab.selected = index === this._indexToSelect),
    )
    this._selectedIndex = this._indexToSelect
    this._indexToScrollTo = this._indexToSelect
    this._indexToSelect = undefined
    this._cdRef.markForCheck()
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

  ngOnDestroy(): void {
    this._intersectionObserver?.disconnect()
  }

  private _onTabsChanged() {
    const tabs = this._tabs()
    if (!this._intersectionObserver || tabs.length === 0) {
      if (isDevMode) {
        console.log(
          'TabsComponent: either intersection observer is not defined or no tabs present. Not updating tabs list',
          { tabs, intersectionObserver: this._intersectionObserver },
        )
      }
      return
    }
    this._currentTabs = tabs
    this._intersectionObserver.disconnect()
    ;[this._firstTab, this._lastTab] = [tabs.at(0)!.elRef, tabs.at(-1)!.elRef]
    this._intersectionObserver.observe(this._firstTab.nativeElement)
    this._intersectionObserver.observe(this._lastTab.nativeElement)
  }

  private _setupIntersectionObserver() {
    this._intersectionObserver = new IntersectionObserver(
      (entries) => {
        ;(
          [
            [this._firstTab!, this._prevButtonDisabled],
            [this._lastTab!, this._nextButtonDisabled],
          ] as const
        ).forEach(([tabElement, signalToUpdate]) => {
          const entry = entries.find(
            (entry) => entry.target === tabElement.nativeElement,
          )
          if (!entry) return
          signalToUpdate.set(entry.isIntersecting)
        })
      },
      {
        root: this._elRef.nativeElement,
        threshold: [INTERSECTION_THRESHOLD],
      },
    )
  }
  protected _scrollABit(scrollDirection: ScrollDirection) {
    const tabListContainer = this._tabList()?.nativeElement
    /* istanbul ignore next */
    if (!tabListContainer) {
      if (isDevMode) {
        console.log(
          'TabsComponent: Not scrolling. Reason: tab list container element is missing',
        )
      }
      return
    }
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

const INTERSECTION_THRESHOLD = 0.8

type ScrollDirection = -1 | 1
