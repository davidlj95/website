import {
  afterNextRender,
  afterRender,
  AfterRenderPhase,
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
} from '../../material-symbols'
import { TabComponent } from '../tab/tab.component'

@Component({
  selector: 'app-tabs',
  standalone: true,
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
  protected _previousButtonDisabled = signal(true)
  protected _nextButtonDisabled = signal(true)
  public _intersectionObserver!: IntersectionObserver

  // Selected management
  private _currentTabs: ReadonlyArray<TabComponent> = []
  private _indexToSelect?: number
  private _selectedIndex?: number
  @Input({ transform: numberAttribute }) set selectedIndex(index: number) {
    this._indexToSelect = index
  }
  /// Scroll to selected
  private _indexToScrollTo?: number

  constructor(
    private elRef: ElementRef,
    private cdRef: ChangeDetectorRef,
  ) {
    afterNextRender(
      () => {
        this._intersectionObserver = new IntersectionObserver(
          this._onIntersectChange.bind(this),
          { root: this.elRef.nativeElement, threshold: [0.8] },
        )
      },
      { phase: AfterRenderPhase.Read },
    )
    afterRender(
      () => {
        this._updateSelectedIfNeeded()
        this._scrollToTabIfNeeded()
      },
      { phase: AfterRenderPhase.Read },
    )
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
    this.cdRef.markForCheck()
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
    this._currentTabs = tabs
    if (!this._intersectionObserver || tabs.length === 0) {
      return
    }
    this._intersectionObserver.disconnect()
    ;[this._firstTab, this._lastTab] = [tabs.at(0)!.elRef, tabs.at(-1)!.elRef]
    this._intersectionObserver.observe(this._firstTab.nativeElement)
    this._intersectionObserver.observe(this._lastTab.nativeElement)
  }

  private _onIntersectChange(
    entries: ReadonlyArray<IntersectionObserverEntry>,
  ) {
    const [firstTabIntersecting, lastTabIntersecting] =
      areFirstLastTabIntersecting([this._firstTab!, this._lastTab!], entries)
    firstTabIntersecting !== undefined &&
      this._previousButtonDisabled.set(firstTabIntersecting)
    lastTabIntersecting !== undefined &&
      this._nextButtonDisabled.set(lastTabIntersecting)
  }

  protected _scrollABit(scrollDirection: ScrollDirection) {
    const tabListContainer = this._tabList()?.nativeElement
    /* istanbul ignore next */
    if (!tabListContainer) {
      if (isDevMode) {
        console.log('TabsComponent: Missing tab list container element')
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

type ScrollDirection = typeof DIRECTION_PREVIOUS | typeof DIRECTION_NEXT
const DIRECTION_PREVIOUS = -1
const DIRECTION_NEXT = 1

const areFirstLastTabIntersecting = (
  [firstTab, lastTab]: [ElementRef<Element>, ElementRef<Element>],
  entries: ReadonlyArray<IntersectionObserverEntry>,
): [boolean | undefined, boolean | undefined] => [
  findEntryByTarget(entries, firstTab.nativeElement)?.isIntersecting,
  findEntryByTarget(entries, lastTab.nativeElement)?.isIntersecting,
]

const findEntryByTarget = (
  entries: ReadonlyArray<IntersectionObserverEntry>,
  target: Element,
) => entries.find((entry) => entry.target === target)
