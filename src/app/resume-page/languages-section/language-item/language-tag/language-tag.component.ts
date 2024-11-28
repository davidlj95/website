import { Component, computed, input } from '@angular/core'

@Component({
  selector: 'app-language-tag',
  imports: [],
  templateUrl: './language-tag.component.html',
  styleUrl: './language-tag.component.scss',
})
export class LanguageTagComponent {
  readonly tag = input.required<string>()
  protected readonly _url = computed(() => getUrlForIso6391Tag(this.tag()))
}

const getUrlForIso6391Tag = (tag: string): string => {
  const apiUrl = new URL(
    'https://www.loc.gov/standards/iso639-2/php/langcodes_name.php',
  )
  apiUrl.searchParams.set('iso_639_1', tag)
  return apiUrl.toString()
}
