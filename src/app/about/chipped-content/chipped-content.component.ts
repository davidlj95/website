import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { ChippedContent } from './chipped-content'
import { ChipComponent } from '../chip/chip.component'

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
  private contentElementRefsById!: Map<string, ElementRef>
  private HIDDEN_CLASS = 'hidden'

  public selectedContentId?: string
  @Output() contentDisplayedChange = new EventEmitter<boolean>()

  ngOnInit(): void {
    const viewContainerRef = this.contentHost
    this.contentElementRefsById = new Map<string, ElementRef>()
    viewContainerRef.clear()
    for (const content of this.contents) {
      // Add chip for non JS version
      const chipComponentRef = viewContainerRef.createComponent(ChipComponent)
      const chipComponentElement = chipComponentRef.location
        .nativeElement as HTMLElement
      chipComponentElement.classList.add('displayBlockIfNoScript')
      chipComponentElement.innerHTML = content.displayName
      // Add content
      const contentComponentRef = viewContainerRef.createComponent(
        content.component,
      )
      content.setupComponent(contentComponentRef.instance)
      this.hideContentElement(contentComponentRef.location)
      const contentComponentElement = contentComponentRef.location
        .nativeElement as HTMLElement
      contentComponentElement.classList.add('displayBlockIfNoScript')
      this.contentElementRefsById.set(content.id, contentComponentRef.location)
    }
  }

  setSelectedContent(id: string) {
    const contentElement = this.contentElementRefsById.get(id)!

    if (this.selectedContentId === id) {
      this.hideContentElement(contentElement)
      this.selectedContentId = undefined
      this.contentDisplayedChange.emit(false)
      return
    }

    if (this.selectedContentId) {
      const previousContentElement = this.contentElementRefsById.get(
        this.selectedContentId,
      )!
      this.hideContentElement(previousContentElement)
    } else {
      this.contentDisplayedChange.emit(true)
    }

    this.selectedContentId = id
    this.showContentElement(contentElement)
  }

  private hideContentElement(elementRef: ElementRef) {
    ;(elementRef.nativeElement as HTMLElement).classList.add(this.HIDDEN_CLASS)
  }
  private showContentElement(elementRef: ElementRef) {
    ;(elementRef.nativeElement as HTMLElement).classList.remove(
      this.HIDDEN_CLASS,
    )
  }
}
