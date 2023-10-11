import { Component, Input } from '@angular/core'
import { EducationItem } from './education-item'
import { MATERIAL_SYMBOLS_CLASS } from '../../../common/material-symbols'
import { SocialLeaderboard } from '../../../material-symbols'
import { SlugGeneratorService } from '../../../common/slug-generator.service'

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.scss'],
})
export class EducationItemComponent {
  @Input({ required: true }) public item!: EducationItem

  protected readonly MATERIAL_SYMBOLS_CLASS = MATERIAL_SYMBOLS_CLASS
  protected readonly MaterialSymbol = {
    SocialLeaderboard,
  }

  constructor(private slugGenerator: SlugGeneratorService) {}

  public get cumLaudeAttributeTooltipId() {
    return this.itemId + 'cum-laude-tooltip'
  }

  private get itemId() {
    // TODO: this can fall short if we repeat something in the same institution!
    return this.slugGenerator.generate(this.item.institution.name, {
      prefix: 'edu-',
    })
  }
}
