import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { DESCRIPTION_LINES, NICKNAME, REAL_NAME } from "../metadata";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public realName = REAL_NAME;
  public nickname = NICKNAME;
  public descriptionLines: ReadonlyArray<SafeHtml> = DESCRIPTION_LINES
    .map((descriptionLine) =>
      this.sanitizer.bypassSecurityTrustHtml(`${descriptionLine.emoji} ${descriptionLine.text}`),
    );

  constructor(private sanitizer: DomSanitizer) {
  }
}
