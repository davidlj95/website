import {
  afterNextRender,
  AfterRenderPhase,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  ElementRef,
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
    read: ElementRef<Element>,
  })
  private _tabList = viewChild<ElementRef<HTMLElement>>('tabList')
  private _firstTab?: ElementRef<HTMLElement>
  private _lastTab?: ElementRef<HTMLElement>
  protected _previousButtonDisabled = signal(true)
  protected _nextButtonDisabled = signal(true)
  public _intersectionObserver!: IntersectionObserver

  constructor(private elRef: ElementRef) {
    afterNextRender(
      () => {
        this._intersectionObserver = new IntersectionObserver(
          this._onIntersectChange.bind(this),
          { root: this.elRef.nativeElement, threshold: [0.8] },
        )
      },
      { phase: AfterRenderPhase.Read },
    )
    effect(this._onTabsChanged.bind(this))
  }

  ngOnDestroy(): void {
    this._intersectionObserver?.disconnect()
  }

  private _onTabsChanged() {
    const tabs = this._tabs()
    if (!this._intersectionObserver || tabs.length === 0) {
      return
    }
    this._intersectionObserver.disconnect()
    ;[this._firstTab, this._lastTab] = [tabs.at(0)!, tabs.at(-1)!]
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
