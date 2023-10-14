import { Component, Input } from '@angular/core'
import { EducationItem } from './education-item'
import { SocialLeaderboard } from '../../../material-symbols'
import { SlugGeneratorService } from '../../../common/slug-generator.service'

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

  public getAttributeId(attribute: Attribute) {
    return `${this.itemIdPrefix}-${attribute}`
  }

  private get itemIdPrefix() {
    // TODO: this can fall short if we repeat something in the same institution!
    return this.slugGenerator.generate(this.item.institution.name, {
      prefix: 'edu-',
    })
  }
}

export enum Attribute {
  CumLaude = 'cum-laude',
}
