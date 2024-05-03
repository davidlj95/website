import { Component, Input } from '@angular/core'
import { NgIf, NgOptimizedImage } from '@angular/common'
import { TechnologyItem } from './technology-item'
import { SimpleIconComponent } from '@/common/simple-icon/simple-icon.component'

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [NgIf, NgOptimizedImage, SimpleIconComponent],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss',
})
export class TechnologyComponent {
  @Input({ required: true }) item!: TechnologyItem
}
