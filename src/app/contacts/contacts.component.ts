import { Component } from '@angular/core';
import { METADATA } from "../metadata";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  public items: ReadonlyArray<ContactItem> = [
    {
      key: "email",
      value: `mail@${METADATA.domainName}`,
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
