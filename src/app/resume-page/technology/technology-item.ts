export interface TechnologyItem {
  readonly slug: string
  readonly displayName: string
  readonly icon?: TechnologyIcon
  readonly version?: string
}

export interface TechnologyIcon {
  readonly path: string
  readonly color: string
}
