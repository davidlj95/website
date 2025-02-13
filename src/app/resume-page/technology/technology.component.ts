import { Component, computed, Inject, input } from '@angular/core'
import { TechnologyItem } from './technology-item'
import { SimpleIconComponent } from '@/common/simple-icon/simple-icon.component'
import {
  GET_TECHNOLOGY_FROM_SLUG,
  GetTechnologyFromSlug,
} from './get-technology-from-slug'
import { Technology } from './technology'

@Component({
  selector: 'app-technology',
  imports: [SimpleIconComponent],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss',
})
export class TechnologyComponent {
  readonly item = input.required<TechnologyItem>()
  protected readonly _tech = computed<Technology>(() =>
    this._getTechFromSlug(this.item().slug),
  )

  constructor(
    @Inject(GET_TECHNOLOGY_FROM_SLUG)
    private readonly _getTechFromSlug: GetTechnologyFromSlug,
  ) {}
}
