import { Component, Inject } from '@angular/core';
import { faGithub, faLinkedinIn, faStackOverflow, faTwitter, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { METADATA } from '../../common/injection-tokens';
import { Metadata } from '../../metadata';

@Component({
  selector: 'app-contact-social-icons',
  templateUrl: './contact-social-icons.component.html',
  styleUrls: ['./contact-social-icons.component.scss']
})
export class ContactSocialIconsComponent {
  public items: ReadonlyArray<{icon: IconDefinition, url: URL}> = [
    {
      icon: faGithub,
      url: new URL(`https://github.com/${this.metadata.nickname}`),
    },
    {
      icon: faLinkedinIn,
      url: new URL(`https://www.linkedin.com/in/${this.metadata.nickname}`),
    },
    {
      icon: faStackOverflow,
      url: new URL(`https://stackoverflow.com/users/3263250/${this.metadata.nickname}`),
    },
    {
      icon: faTwitter,
      url: new URL(`https://twitter.com/${this.metadata.nickname}`),
    },
  ]

  constructor(
    @Inject(METADATA) private metadata: Metadata,
  ) {
  }
}
