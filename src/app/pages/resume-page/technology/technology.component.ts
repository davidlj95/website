import { Component, computed, input, inject } from '@angular/core'
import { SimpleIconComponent } from '@/common/simple-icon/simple-icon.component'
import {
  GET_TECHNOLOGY_FROM_SLUG,
  GetTechnologyFromSlug,
} from './get-technology-from-slug'
import { Tech } from '@/data/techs'

@Component({
  selector: 'app-technology',
  imports: [SimpleIconComponent],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss',
})
export class TechnologyComponent {
  private readonly _getTechFromSlug = inject<GetTechnologyFromSlug>(
    GET_TECHNOLOGY_FROM_SLUG,
  )

  readonly tech = input.required<string>()
  protected readonly _viewModel = computed<Tech>(() =>
    this._getTechFromSlug(this.tech()),
  )
}
