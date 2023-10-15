import { Component, Input } from '@angular/core'
import { EducationItem } from './education-item'
import { SocialLeaderboard } from '../../../material-symbols'
import { SlugGeneratorService } from '../../../common/slug-generator.service'
import { ChippedContent } from '../../chipped-content/chipped-content'
import { EducationItemScoreComponent } from './education-item-score/education-item-score.component'
import { firstValueFrom } from 'rxjs'
import { EducationItemCoursesComponent } from './education-item-courses/education-item-courses.component'

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.scss'],
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
