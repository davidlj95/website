import { Component } from '@angular/core';
import {
  faFacebook,
  faGithub,
  faGitlab,
  faInstagram,
  faLinkedinIn,
  faStackOverflow,
  faTwitter,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { METADATA } from "../metadata";

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent {
  public items: ReadonlyArray<SocialNetworkItem> = [
    {
      name: 'GitHub',
      url: `https://github.com/${METADATA.nickname}`,
      icon: faGithub,
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/in/${METADATA.nickname}`,
      icon: faLinkedinIn,
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/${METADATA.nickname}`,
      icon: faTwitter,
    },
    {
      name: 'GitLab',
      url: `https://gitlab.com/${METADATA.nickname}/groups`,
      icon: faGitlab,
    },
    {
      name: 'Stack Overflow',
      icon: faStackOverflow,
      url: `https://stackoverflow.com/users/3263250/${METADATA.nickname}`,
    },
    {
      name: 'Instagram',
      icon: faInstagram,
      url: `https://www.instagram.com/${METADATA.nickname}`,
    },
    {
      name: 'Facebook',
      icon: faFacebook,
      url: `https://www.facebook.com/${METADATA.nickname}`,
    },
  ];
}

interface SocialNetworkItem {
  name: string;
  url: string;
  icon: IconDefinition,
}
