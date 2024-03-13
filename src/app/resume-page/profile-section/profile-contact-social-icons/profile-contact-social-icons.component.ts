import { Component, Inject } from '@angular/core'
import {
  faGithub,
  faLinkedinIn,
  faStackOverflow,
  faTwitter,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons'
import { METADATA } from '../../../common/injection-tokens'
import { Metadata } from '../../../metadata'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { NgFor } from '@angular/common'

@Component({
  selector: 'app-profile-contact-social-icons',
  templateUrl: './profile-contact-social-icons.component.html',
  styleUrls: ['./profile-contact-social-icons.component.scss'],
  standalone: true,
  imports: [NgFor, FaIconComponent],
})
export class ProfileContactSocialIconsComponent {
  public items: ReadonlyArray<{
    name: string
    icon: IconDefinition
    url: URL
  }> = [
    {
      name: 'GitHub',
      icon: faGithub,
      url: new URL(`https://github.com/${this.metadata.nickname}`),
    },
    {
      name: 'LinkedIn',
      icon: faLinkedinIn,
      url: new URL(`https://www.linkedin.com/in/${this.metadata.nickname}`),
    },
    {
      name: 'StackOverflow',
      icon: faStackOverflow,
      url: new URL(
        `https://stackoverflow.com/users/3263250/${this.metadata.nickname}`,
      ),
    },
    {
      name: 'Twitter',
      icon: faTwitter,
      url: new URL(`https://twitter.com/${this.metadata.nickname}`),
    },
  ]

  constructor(@Inject(METADATA) private metadata: Metadata) {}
}
