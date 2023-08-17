import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { DESCRIPTION_LINES, NICKNAME, REALNAME } from "../metadata";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public realname = REALNAME;
  public nickname = NICKNAME;
  public descriptionLines: ReadonlyArray<SafeHtml> = DESCRIPTION_LINES
    .map((descriptionLine) =>
      this.sanitizer.bypassSecurityTrustHtml(`${descriptionLine.emoji} ${descriptionLine.text}`),
    );

  constructor(private sanitizer: DomSanitizer) {
  }
}
