import { Component, Inject } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { METADATA } from '../common/injection-tokens';
import { Metadata } from '../metadata';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public realName = this.metadata.realName;
  public nickname = this.metadata.nickname;
  public descriptionLines = this.metadata.descriptionLines
    .map((descriptionLine) => ({
        ...descriptionLine,
        text: this.sanitizer.bypassSecurityTrustHtml(descriptionLine.text),
      }),
    );

  constructor(
    @Inject(METADATA) private metadata: Metadata,
    private sanitizer: DomSanitizer,
  ) {
  }
}
