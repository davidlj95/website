import { Component } from '@angular/core'
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common'
import { CardComponent } from '@/common/card/card.component'
import { CardHeaderImageComponent } from '@/common/card/card-header/card-header-image/card-header-image.component'
import { CardHeaderComponent } from '@/common/card/card-header/card-header.component'
import { CardHeaderTextsComponent } from '@/common/card/card-header/card-header-texts/card-header-texts.component'
import { ButtonComponent } from '@/common/button/button.component'
import { ContentPageComponent } from '@/common/content-page/content-page.component'

@Component({
  imports: [
    NgOptimizedImage,
    CardComponent,
    CardHeaderImageComponent,
    CardHeaderComponent,
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
