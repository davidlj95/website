import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-language-tag',
  imports: [],
  templateUrl: './language-tag.component.html',
  styleUrl: './language-tag.component.scss',
})
export class LanguageTagComponent {
  @Input({ required: true }) public set tag(tag: string) {
    this._tag = tag
    this._url = getUrlForIso6391Tag(tag)
  }
  protected _tag!: string
  protected _url!: string
}

const getUrlForIso6391Tag = (tag: string): string => {
  const apiUrl = new URL(
    'https://www.loc.gov/standards/iso639-2/php/langcodes_name.php',
  )
  apiUrl.searchParams.set('iso_639_1', tag)
  return apiUrl.toString()
}
