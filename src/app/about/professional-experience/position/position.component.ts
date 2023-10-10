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
import { SlugGeneratorService } from '../../../common/slug-generator.service'

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent {
  @Input({ required: true }) public position!: Position
  public readonly contentTypes: ReadonlyArray<ContentType> = [
    SUMMARY_CONTENT_TYPE,
    HIGHLIGHT_CONTENT_TYPE,
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
  protected readonly ContentTypeId = ContentTypeId

  constructor(private slugGenerator: SlugGeneratorService) {}

  public get availableContentTypes(): ReadonlyArray<ContentType> {
    return this.contentTypes.filter((contentType) =>
      this.typeHasContent(contentType),
    )
  }

  @HostBinding('class.active')
  public get activeClass(): boolean {
    return !!this.activeContentType
  }

  public get freelanceAttributeTooltipId() {
    return this.positionId + '-freelance-tooltip'
  }

  public get internshipAttributeTooltipId() {
    return this.positionId + '-internship-tooltip'
  }

  public get otherRolesAttributeTooltipId() {
    return this.positionId + '-other-roles-tooltip'
  }

  public get promotionsAttributeTooltipId() {
    return this.positionId + '-promotions-tooltip'
  }

  private get positionId() {
    return this.slugGenerator.generate(this.position.company.name, {
      prefix: 'exp-pos-',
    })
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
}

export enum ContentTypeId {
  Summary,
  Highlights,
}

interface ContentType {
  id: ContentTypeId
  displayName: string
}

export const SUMMARY_CONTENT_TYPE: ContentType = {
  id: ContentTypeId.Summary,
  displayName: 'Summary',
}
export const HIGHLIGHT_CONTENT_TYPE: ContentType = {
  id: ContentTypeId.Highlights,
  displayName: 'Highlights',
}
