import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-card-header-image',
  templateUrl: './card-header-image.component.html',
  styleUrls: ['./card-header-image.component.scss'],
})
export class CardHeaderImageComponent {
  @Input({ required: true }) src!: string
  @Input({ required: true }) alt!: string
  @Input() href?: string
}
