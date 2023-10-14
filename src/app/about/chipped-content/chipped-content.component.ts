import {
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { ChippedContent } from './chipped-content'
import { ChipComponent } from '../chip/chip.component'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'app-chipped-content',
  templateUrl: './chipped-content.component.html',
  styleUrls: ['./chipped-content.component.scss'],
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
  private isRenderingOnBrowser: boolean
  @Output() contentDisplayedChange = new EventEmitter<boolean>()

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isRenderingOnBrowser = isPlatformBrowser(platformId)
  }

  ngOnInit(): void {
    if (this.isRenderingOnBrowser) {
      return
    }
    this.contentHost.clear()
    for (const content of this.contents) {
      // Add chip for non JS version
      const chipComponentRef = this.contentHost.createComponent(ChipComponent)
      const chipComponentElement = chipComponentRef.location
        .nativeElement as HTMLElement
      chipComponentElement.classList.add('displayBlockIfNoScript')
      chipComponentElement.innerHTML = content.displayName
      // Add content
      const contentComponentRef = this.addContentToHost(content)
      this.hideContentElement(contentComponentRef.location)
      const contentComponentElement = contentComponentRef.location
        .nativeElement as HTMLElement
      contentComponentElement.classList.add('displayBlockIfNoScript')
    }
  }

  setSelectedContent(id: string) {
    // Tapping same chip hides content
    if (this.selectedContentId === id) {
      this.contentHost.clear()
      this.selectedContentId = undefined
      this.contentDisplayedChange.emit(false)
      return
    }
    this.selectedContentId = id
    this.contentHost.clear()
    const content = this.contents.find((content) => content.id === id)!
    this.addContentToHost(content)
    this.contentDisplayedChange.emit(true)
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
    return contentComponentRef
  }
}
