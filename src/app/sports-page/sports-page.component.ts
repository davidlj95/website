import { Component } from '@angular/core'
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common'
import { CardComponent } from '../resume-page/card/card.component'
import { CardHeaderImageComponent } from '../resume-page/card/card-header/card-header-image/card-header-image.component'
import { CardHeaderComponent } from '../resume-page/card/card-header/card-header.component'
import { CardHeaderTitleComponent } from '../resume-page/card/card-header/card-header-title/card-header-title.component'
import { CardHeaderSubtitleComponent } from '../resume-page/card/card-header/card-header-subtitle/card-header-subtitle.component'
import { CardHeaderTextsComponent } from '../resume-page/card/card-header/card-header-texts/card-header-texts.component'
import { ButtonComponent } from '../resume-page/button/button.component'
import { ContentPageComponent } from '../content-page/content-page.component'

@Component({
  selector: 'app-sports-page',
  imports: [
    NgOptimizedImage,
    CardComponent,
    CardHeaderImageComponent,
    CardHeaderComponent,
    CardHeaderTitleComponent,
    CardHeaderSubtitleComponent,
    CardHeaderTextsComponent,
    ButtonComponent,
    NgTemplateOutlet,
    ContentPageComponent,
  ],
  templateUrl: './sports-page.component.html',
  styleUrl: './sports-page.component.scss',
})
export class SportsPageComponent {
  protected readonly _playtomicProfileUrl =
    'https://app.playtomic.io/profile/user/1463090'
}
