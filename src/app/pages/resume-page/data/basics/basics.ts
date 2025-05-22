export interface Basics {
  readonly profile: Profile
  readonly contacts: readonly Contact[]
  readonly socials: readonly Social[]
}

interface Profile {
  readonly name: string
  readonly label: string
  readonly image: string
  readonly summary: string
}

export interface Contact {
  readonly label: string
  readonly icon: string
  readonly text: string
  readonly url: URL
}

export type Social = Contact
