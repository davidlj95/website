import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-traditional-icons',
  templateUrl: './contact-traditional-icons.component.html',
  styleUrls: ['./contact-traditional-icons.component.scss']
})
export class ContactTraditionalIconsComponent {
  public items: ReadonlyArray<{icon: string, url: URL}> = [
    {icon: '\ue158', url: new URL('mailto:mail@davidlj95.com')},
    {icon: '\ue0b0', url: new URL('tel:+34 644 449 360')},
    {icon: '\ue55c', url: new URL('https://meet.barcelona')},
  ]

}
