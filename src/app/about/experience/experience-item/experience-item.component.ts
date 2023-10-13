import {
  Component,
  HostBinding,
  Inject,
  Input,
  PLATFORM_ID,
} from '@angular/core'
import { ExperienceItem } from './experience-item'
import { MATERIAL_SYMBOLS_CLASS } from '../../../common/material-symbols'
import {
  Badge,
  More,
  School,
  ToolsLadder,
  Work,
} from '../../../material-symbols'
import { SlugGeneratorService } from '../../../common/slug-generator.service'
import {
  animate,
  AUTO_STYLE,
  style,
  transition,
  trigger,
} from '@angular/animations'
import {
  STANDARD_DURATION_MS,
  TIMING_FUNCTION,
} from '../../../common/animations'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.scss'],
  animations: [
    trigger('contentActive', [
      transition(':enter', [
        style({ height: '0', visibility: 'hidden' }),
        animate(
          `${STANDARD_DURATION_MS}ms ${TIMING_FUNCTION}`,
          style({ height: AUTO_STYLE, visibility: AUTO_STYLE }),
        ),
      ]),
      transition(':leave', [
        style({ height: AUTO_STYLE, visibility: AUTO_STYLE }),
        animate(
          `${STANDARD_DURATION_MS}ms ${TIMING_FUNCTION}`,
          style({ height: '0', visibility: 'hidden' }),
        ),
      ]),
    ]),
  ],
})
export class ExperienceItemComponent {
  @Input({ required: true }) public item!: ExperienceItem
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
  }
  protected readonly Attribute = Attribute
  protected readonly ContentTypeId = ContentTypeId
  protected readonly isRenderingOnBrowser

  constructor(
    private slugGenerator: SlugGeneratorService,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isRenderingOnBrowser = isPlatformBrowser(platformId)
  }

  public get availableContentTypes(): ReadonlyArray<ContentType> {
    return this.contentTypes.filter((contentType) =>
      this.typeHasContent(contentType),
    )
  }

  @HostBinding('class.active')
  public get activeClass(): boolean {
    return !!this.activeContentType
  }

  public getAttributeId(attributeName: string) {
    return `${this.itemId}${attributeName}`
  }

  private get itemId() {
    return this.slugGenerator.generate(this.item.company.name, {
      prefix: 'exp-pos-',
    })
  }

  onContentTypeSelected(contentType: ContentType) {
    if (this.activeContentType === contentType) {
      this.activeContentType = undefined
      return
    }
    this.activeContentType = contentType
  }

  protected typeHasContent(type: ContentType): boolean {
    switch (type.id) {
      case ContentTypeId.Summary:
        return !!this.item?.summary
      case ContentTypeId.Highlights:
        return !!this.item && this.item.highlights.length > 0
      default:
        return false
    }
  }

  protected readonly SUMMARY_CONTENT_TYPE = SUMMARY_CONTENT_TYPE
  protected readonly HIGHLIGHT_CONTENT_TYPE = HIGHLIGHT_CONTENT_TYPE
}

export enum ContentTypeId {
  Summary = 'summary',
  Highlights = 'highlights',
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
export enum Attribute {
  Freelance = 'freelance',
  Employee = 'employee',
  Internship = 'internship',
  MorePositions = 'more-positions',
  Promotions = 'promotions',
}
