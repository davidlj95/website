import { Component, Inject, InjectionToken } from '@angular/core'
import { Call, Email, MyLocation } from '../../../material-symbols'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'
import { NgFor } from '@angular/common'
import resume from '../../../../../assets/resume.json'

@Component({
  selector: 'app-profile-contact-traditional-icons',
  templateUrl: './profile-contact-traditional-icons.component.html',
  styleUrls: ['./profile-contact-traditional-icons.component.scss'],
  standalone: true,
  imports: [NgFor, MaterialSymbolDirective],
})
export class ProfileContactTraditionalIconsComponent {
  public readonly items: ReadonlyArray<{
    name: string
    materialSymbol: string
    url: URL
  }> = [
    {
      name: 'Email',
      materialSymbol: Email,
      url: new URL(`mailto:${this._resumeBasics.email}`),
    },
    {
      name: 'Phone',
      materialSymbol: Call,
      url: new URL(`tel:${this._resumeBasics.phone}`),
    },
    {
      name: 'Location',
      materialSymbol: MyLocation,
      url: getMapsSearchUrl(this._resumeBasics.location.city),
    },
  ]

  constructor(
    @Inject(JSON_RESUME_BASICS)
    private readonly _resumeBasics: JsonResumeBasics,
  ) {}
}

export const JSON_RESUME_BASICS = new InjectionToken<JsonResumeBasics>(
  'JSON Resume basics section',
  {
    factory: () => resume.basics,
  },
)
export type JsonResumeBasics = typeof resume.basics

const getMapsSearchUrl = (location: string): URL => {
  // https://developers.google.com/maps/documentation/urls/get-started#search-action
  const mapsSearchUrl = new URL('https://www.google.com/maps/search/?api=1')
  mapsSearchUrl.searchParams.set('query', location)
  return mapsSearchUrl
}
