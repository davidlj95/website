export interface Tech {
  slug: string
  title: string
  hasIcon: boolean
  hex: string | undefined
}
export type TechsIndex = readonly [string, string, boolean, string | null][]
