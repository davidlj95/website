import { Component } from '@angular/core'
import { Call, Email, MyLocation } from '../../../material-symbols'
import { MATERIAL_SYMBOLS_CLASS } from '../../../common/material-symbols'

@Component({
  selector: 'app-contact-traditional-icons',
  templateUrl: './contact-traditional-icons.component.html',
  styleUrls: ['./contact-traditional-icons.component.scss'],
})
export class ContactTraditionalIconsComponent {
  protected readonly MATERIAL_SYMBOLS_CLASS = MATERIAL_SYMBOLS_CLASS
  public readonly items: ReadonlyArray<{
    name: string
    materialSymbol: string
    url: URL
  }> = [
    {
      name: 'Email',
      materialSymbol: Email,
      url: new URL('mailto:mail@davidlj95.com'),
    },
    {
      name: 'Phone',
      materialSymbol: Call,
      url: new URL('tel:+34 644 449 360'),
    },
    {
      name: 'Location',
      materialSymbol: MyLocation,
      url: new URL('https://meet.barcelona'),
    },
  ]
}
