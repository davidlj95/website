import { Component, Input } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-card-header-image',
  templateUrl: './card-header-image.component.html',
  styleUrls: ['./card-header-image.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage],
})
export class CardHeaderImageComponent {
  @Input({ required: true }) src!: string
  @Input({ required: true }) alt!: string
}
