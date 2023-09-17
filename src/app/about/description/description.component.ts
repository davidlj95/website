import { Component, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { METADATA } from '../../common/injection-tokens';
import { Metadata } from '../../metadata';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
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
