import { Component, Input } from '@angular/core'
import { EducationItem } from './education-item'
import { SocialLeaderboard } from '../../../material-symbols'
import { SlugGeneratorService } from '@common/slug-generator.service'
import { ChippedContent } from '../../chipped-content/chipped-content'
import { EducationItemScoreComponent } from './education-item-score/education-item-score.component'
import { firstValueFrom } from 'rxjs'
import { EducationItemCoursesComponent } from './education-item-courses/education-item-courses.component'
import { ChippedContentComponent } from '../../chipped-content/chipped-content.component'
import { AttributeComponent } from '../../attribute/attribute.component'
import { NgIf } from '@angular/common'
import { CardHeaderAttributesComponent } from '../../card/card-header/card-header-attributes/card-header-attributes.component'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { CardHeaderDetailComponent } from '../../card/card-header/card-header-detail/card-header-detail.component'
import { CardHeaderSubtitleComponent } from '../../card/card-header/card-header-subtitle/card-header-subtitle.component'
import { CardHeaderTitleComponent } from '../../card/card-header/card-header-title/card-header-title.component'
import { CardHeaderTextsComponent } from '../../card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderImageComponent } from '../../card/card-header/card-header-image/card-header-image.component'
import { TestIdDirective } from '@common/test-id.directive'
import { LinkComponent } from '../../link/link.component'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { CardComponent } from '../../card/card.component'

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.scss'],
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    LinkComponent,
    TestIdDirective,
    CardHeaderImageComponent,
    CardHeaderTextsComponent,
    CardHeaderTitleComponent,
    CardHeaderSubtitleComponent,
    CardHeaderDetailComponent,
    DateRangeComponent,
    CardHeaderAttributesComponent,
    NgIf,
    AttributeComponent,
    ChippedContentComponent,
  ],
})
export class EducationItemComponent {
  @Input({ required: true }) public item!: EducationItem

  protected readonly MaterialSymbol = {
    SocialLeaderboard,
  }
  protected readonly Attribute = Attribute

  constructor(private slugGenerator: SlugGeneratorService) {}

  public get contents() {
    const contents = []
    if (this.item.score) {
      contents.push(
        new ChippedContent({
          id: ContentId.Score,
          displayName: 'Score',
          component: EducationItemScoreComponent,
          setupComponent: (component) => {
            component.score = this.item.score
          },
          waitForAnimationEnd: async (component) => {
            await firstValueFrom(component.enterAndLeaveAnimationDone)
          },
        }),
      )
    }
    if (this.item.courses) {
      contents.push(
        new ChippedContent({
          id: ContentId.Courses,
          displayName: 'Courses',
          component: EducationItemCoursesComponent,
          setupComponent: (component) => {
            component.courses = this.item.courses
          },
          waitForAnimationEnd: async (component) => {
            await firstValueFrom(component.enterAndLeaveAnimationDone)
          },
        }),
      )
    }
    return contents
  }

  public get institutionDisplayName() {
    if (
      this.item.institution.name.length > 15 &&
      this.item.institution.shortName
    ) {
      return this.item.institution.shortName
    }
    return this.item.institution.name
  }

  private get itemIdPrefix() {
    // TODO: this can fall short if we repeat something in the same institution!
    return this.slugGenerator.generate(this.item.institution.name, {
      prefix: 'edu-',
    })
  }

  public getAttributeId(attribute: Attribute) {
    return `${this.itemIdPrefix}-${attribute}`
  }
}

export enum Attribute {
  CumLaude = 'cum-laude',
}

export enum ContentId {
  Score = 'score',
  Courses = 'courses',
}
