import { Component, Inject } from '@angular/core'
import { METADATA } from '@/common/injection-tokens'
import { Metadata } from '../../../metadata'
import { NgFor } from '@angular/common'
import {
  faBrandGithub,
  faBrandLinkedinIn,
  faBrandStackOverflow,
  faBrandTwitter,
} from '@ng-icons/font-awesome/brands'
import { NgIconComponent, provideIcons } from '@ng-icons/core'

@Component({
  selector: 'app-profile-contact-social-icons',
  templateUrl: './profile-contact-social-icons.component.html',
  styleUrls: ['./profile-contact-social-icons.component.scss'],
  standalone: true,
  imports: [NgFor, NgIconComponent],
  providers: [
    provideIcons({
      faBrandGithub,
      faBrandLinkedinIn,
      faBrandStackOverflow,
      faBrandTwitter,
    }),
  ],
})
export class ProfileContactSocialIconsComponent {
  public items: ReadonlyArray<{
    name: string
    icon: string
    url: URL
  }> = [
    {
      name: 'GitHub',
      icon: faBrandGithub,
      url: new URL(`https://github.com/${this.metadata.nickname}`),
    },
    {
      name: 'LinkedIn',
      icon: faBrandLinkedinIn,
      url: new URL(`https://www.linkedin.com/in/${this.metadata.nickname}`),
    },
    {
      name: 'StackOverflow',
      icon: faBrandStackOverflow,
      url: new URL(
        `https://stackoverflow.com/users/3263250/${this.metadata.nickname}`,
      ),
    },
    {
      name: 'Twitter',
      icon: faBrandTwitter,
      url: new URL(`https://twitter.com/${this.metadata.nickname}`),
    },
  ]

  constructor(@Inject(METADATA) private metadata: Metadata) {}
}
