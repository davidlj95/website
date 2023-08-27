import { Component, Inject } from '@angular/core';
import { METADATA } from '../common/metadata-injection-token';
import { Metadata } from '../metadata';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  public static readonly EMAIL_KEY = 'email';
  public static readonly EMAIL_LOCAL_PART = 'mail';
  public items: ReadonlyArray<ContactItem> = [
    {
      key: ContactsComponent.EMAIL_KEY,
      value: `${ContactsComponent.EMAIL_LOCAL_PART}@${this.metadata.domainName}`,
      uriPrefix: "mailto:"
    },
    {
      key: "phone",
      value: "+34 644 449 360",
      uriPrefix: "tel:"
    },
  ]

  constructor(
    @Inject(METADATA) private metadata: Metadata,
  ) {
  }
}

interface ContactItem {
  key: string;
  value: string;
  uriPrefix: string;
}
