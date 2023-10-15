import { Component } from '@angular/core'
import { Call, Email, MyLocation } from '../../../material-symbols'

@Component({
  selector: 'app-profile-contact-traditional-icons',
  templateUrl: './profile-contact-traditional-icons.component.html',
  styleUrls: ['./profile-contact-traditional-icons.component.scss'],
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
