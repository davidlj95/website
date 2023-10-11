import { Component, Input } from '@angular/core'
import { EducationItem } from './education-item'

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.scss'],
})
export class EducationItemComponent {
  @Input({ required: true }) public item!: EducationItem
}
