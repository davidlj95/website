import { Component } from '@angular/core';
import { Call, Email, MyLocation } from '../../material-symbols';

@Component({
  selector: 'app-contact-traditional-icons',
  templateUrl: './contact-traditional-icons.component.html',
  styleUrls: ['./contact-traditional-icons.component.scss']
})
export class ContactTraditionalIconsComponent {
  public items: ReadonlyArray<{name: string, icon: string, url: URL}> = [
    {name: 'Email', icon: Email, url: new URL('mailto:mail@davidlj95.com')},
    {name: 'Phone', icon: Call, url: new URL('tel:+34 644 449 360')},
    {name: 'Location', icon: MyLocation, url: new URL('https://meet.barcelona')},
  ]

}
