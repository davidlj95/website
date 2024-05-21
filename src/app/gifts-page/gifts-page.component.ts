import { Component } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import { ContentPageComponent } from '../content-page/content-page.component'

@Component({
  selector: 'app-gifts-page',
  standalone: true,
  imports: [NgOptimizedImage, ContentPageComponent],
  templateUrl: './gifts-page.component.html',
})
export class GiftsPageComponent {}
