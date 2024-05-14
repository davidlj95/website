import { Component } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-gifts-page',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './gifts-page.component.html',
  styleUrl: './gifts-page.component.scss',
})
export class GiftsPageComponent {}
