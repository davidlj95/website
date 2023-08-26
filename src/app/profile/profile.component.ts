import { Component, Inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { METADATA } from '../common/metadata-injection-token';
import { Metadata } from '../metadata';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public realName = this.metadata.realName;
  public nickname = this.metadata.nickname;
  public descriptionLines: ReadonlyArray<SafeHtml> = this.metadata.descriptionLines
    .map((descriptionLine) =>
      this.sanitizer.bypassSecurityTrustHtml(`${descriptionLine.emoji} ${descriptionLine.text}`),
    );

  constructor(
    @Inject(METADATA) private metadata: Metadata,
    private sanitizer: DomSanitizer,
  ) {
  }
}
