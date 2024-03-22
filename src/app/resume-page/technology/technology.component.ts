import { Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'
import { TechnologyItem } from './technology-item'

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [NgIf],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss',
})
export class TechnologyComponent {
  @Input({ required: true }) public item!: TechnologyItem

  constructor() {}
}
