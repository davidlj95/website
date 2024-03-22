import {
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { ChippedContent } from './chipped-content'
import { ChipComponent } from '../chip/chip.component'
import { NgClass, NgFor } from '@angular/common'
import { TestIdDirective } from '@common/test-id.directive'
import {
  DISPLAY_BLOCK_IF_NO_SCRIPT_CLASS,
  DISPLAY_NONE_IF_NO_SCRIPT_CLASS,
} from '@common/no-script'
import { PLATFORM_SERVICE, PlatformService } from '@common/platform.service'

@Component({
  selector: 'app-chipped-content',
  templateUrl: './chipped-content.component.html',
  styleUrls: ['./chipped-content.component.scss'],
  standalone: true,
  imports: [NgFor, ChipComponent, TestIdDirective, NgClass],
})
export class ChippedContentComponent implements OnInit {
  @Input({ required: true }) public contents!: ReadonlyArray<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ChippedContent<any, any>
  >
  @ViewChild('contentHost', { read: ViewContainerRef, static: true })
  public contentHost!: ViewContainerRef
  private HIDDEN_CLASS = 'hidden'
  public selectedContentId?: string
  private selectedContentComponent?: Type<unknown>
  @Output() contentDisplayedChange = new EventEmitter<boolean>()
  protected readonly DISPLAY_NONE_IF_NO_SCRIPT_CLASS =
    DISPLAY_NONE_IF_NO_SCRIPT_CLASS

  constructor(
    @Inject(PLATFORM_SERVICE)
    protected readonly _platformService: PlatformService,
  ) {}

  ngOnInit(): void {
    if (this._platformService.isBrowser) {
      if (this.contents.find((content) => content.id === 'tech')) {
        this.setSelectedContent('tech')
      }
      return
    }
    this.contentHost.clear()
    for (const content of this.contents) {
      // Add chip for non JS version
      const chipComponentRef = this.contentHost.createComponent(ChipComponent)
      const chipComponentElement = chipComponentRef.location
        .nativeElement as HTMLElement
      chipComponentElement.classList.add(DISPLAY_BLOCK_IF_NO_SCRIPT_CLASS)
      chipComponentElement.innerHTML = content.displayName
      // Add content
      const contentComponentRef = this.addContentToHost(content)
      this.hideContentElement(contentComponentRef.location)
      const contentComponentElement = contentComponentRef.location
        .nativeElement as HTMLElement
      contentComponentElement.classList.add(DISPLAY_BLOCK_IF_NO_SCRIPT_CLASS)
    }
  }

  async setSelectedContent(id: string) {
    const content = this.contents.find((content) => content.id === id)!
    this.contentHost.clear()

    // Tapping same chip hides content
    if (this.selectedContentId === id) {
      this.selectedContentId = undefined
      await content.waitForAnimationEnd(this.selectedContentComponent)
      this.contentDisplayedChange.emit(false)
      return
    }

    this.selectedContentId = id
    const componentRef = this.addContentToHost(content)
    this.contentDisplayedChange.emit(true)
    await content.waitForAnimationEnd(componentRef.instance)
    ;(componentRef.location.nativeElement as HTMLElement).scrollIntoView({
      block: 'nearest',
    })
  }

  private hideContentElement(elementRef: ElementRef) {
    ;(elementRef.nativeElement as HTMLElement).classList.add(this.HIDDEN_CLASS)
  }

  private addContentToHost<T, U>(
    content: ChippedContent<T, U>,
  ): ComponentRef<U> {
    const contentComponentRef = this.contentHost.createComponent(
      content.component,
    )
    content.setupComponent(contentComponentRef.instance)
    this.selectedContentComponent =
      contentComponentRef.instance as Type<unknown>
    return contentComponentRef
  }
}
