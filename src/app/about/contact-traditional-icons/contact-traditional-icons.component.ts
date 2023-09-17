import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-traditional-icons',
  templateUrl: './contact-traditional-icons.component.html',
  styleUrls: ['./contact-traditional-icons.component.scss']
})
export class ContactTraditionalIconsComponent {
  public items: ReadonlyArray<{name: string, icon: string, url: URL}> = [
    {name: 'Email', icon: '\ue158', url: new URL('mailto:mail@davidlj95.com')},
    {name: 'Phone', icon: '\ue0b0', url: new URL('tel:+34 644 449 360')},
    {name: 'Location', icon: '\ue55c', url: new URL('https://meet.barcelona')},
  ]

}
