import { provideIcons } from '@ng-icons/core'
import {
  faBrandGithub,
  faBrandLinkedinIn,
  faBrandStackOverflow,
  faBrandXTwitter,
} from '@ng-icons/font-awesome/brands'

type NgIcons = Parameters<typeof provideIcons>[0]
export const socialNgIconsByName = new Map<string, NgIcons>([
  ['github', { faBrandGithub }],
  ['linkedin', { faBrandLinkedinIn }],
  ['stackoverflow', { faBrandStackOverflow }],
  ['x', { faBrandXTwitter }],
])
export const socialNgIcons: NgIcons = [
  ...socialNgIconsByName.values(),
].reduce<NgIcons>((acc, curr) => ({ ...acc, ...curr }), {})
