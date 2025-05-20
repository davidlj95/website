import { Component, input } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-card-header-image',
  templateUrl: './card-header-image.component.html',
  styleUrls: ['./card-header-image.component.scss'],
  imports: [NgOptimizedImage],
})
export class CardHeaderImageComponent {
  readonly src = input.required<string>()
  readonly alt = input.required<string>()
}
