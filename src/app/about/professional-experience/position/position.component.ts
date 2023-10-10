import { Component, HostBinding, Input } from '@angular/core'
import { Position } from './position'
import { MATERIAL_SYMBOLS_CLASS } from '../../../common/material-symbols'
import {
  Badge,
  More,
  Resume,
  School,
  ToolsLadder,
  Work,
} from '../../../material-symbols'

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent {
  @Input({ required: true }) public position!: Position
  public readonly contentTypes: ReadonlyArray<ContentType> = [
    { id: ContentTypeId.Summary, displayName: 'Summary' },
    { id: ContentTypeId.Highlights, displayName: 'Highlights' },
  ]
  public activeContentType?: ContentType
  protected readonly MATERIAL_SYMBOLS_CLASS = MATERIAL_SYMBOLS_CLASS
  protected readonly MaterialSymbol = {
    Badge,
    Work,
    School,
    ToolsLadder,
    More,
    Resume,
  }

  public get chips(): ReadonlyArray<ContentType> {
    return this.contentTypes.filter((contentType) =>
      this.typeHasContent(contentType),
    )
  }

  @HostBinding('class.active')
  public get activeClass(): boolean {
    return !!this.activeContentType
  }

  onContentTypeClick(contentType: ContentType) {
    if (this.activeContentType === contentType) {
      this.activeContentType = undefined
      return
    }
    this.activeContentType = contentType
  }

  private typeHasContent(type: ContentType): boolean {
    switch (type.id) {
      case ContentTypeId.Summary:
        return !!this.position?.summary
      case ContentTypeId.Highlights:
        return !!this.position && this.position.highlights.length > 0
      default:
        return false
    }
  }

  protected readonly ContentTypeId = ContentTypeId
}

export enum ContentTypeId {
  Summary,
  TechStack,
  Highlights,
}

interface ContentType {
  id: ContentTypeId
  displayName: string
}
