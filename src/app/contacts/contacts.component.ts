import { Component } from '@angular/core';
import { DOMAIN_NAME } from "../metadata";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  public items: ReadonlyArray<ContactItem> = [
    {
      key: "email",
      value: `mail@${DOMAIN_NAME}`,
      uriPrefix: "mailto:"
    },
    {
      key: "phone",
      value: "+34 644 449 360",
      uriPrefix: "tel:"
    },
  ]
}

interface ContactItem {
  key: string;
  value: string;
  uriPrefix: string;
}
