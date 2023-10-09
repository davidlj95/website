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
    { id: ContentTypeId.TechStack, displayName: 'Tech' },
    { id: ContentTypeId.Highlights, displayName: 'Highlights' },
  ]
  public readonly chips: ReadonlyArray<ContentType> = this.contentTypes.filter(
    (contentType) => this.getContentFromType(contentType) !== null,
  )
  public activeContent?: Content
  protected readonly MATERIAL_SYMBOLS_CLASS = MATERIAL_SYMBOLS_CLASS
  protected readonly MaterialSymbol = {
    Badge,
    Work,
    School,
    ToolsLadder,
    More,
    Resume,
  }

  @HostBinding('class.active')
  public get activeClass(): boolean {
    return !!this.activeContent
  }

  onContentTypeClick(contentType: ContentType) {
    if (this.activeContent?.type === contentType) {
      this.activeContent = undefined
      return
    }
    this.activeContent = {
      type: contentType,
      value: this.getContentFromType(contentType) ?? '',
    }
  }

  private getContentFromType(type: ContentType): string | null {
    if (type.id === ContentTypeId.Summary) {
      return this.position?.summary
    }
    return null
  }
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

interface Content {
  type: ContentType
  value: string
}
