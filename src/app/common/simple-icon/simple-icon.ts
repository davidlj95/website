import { SimpleIcon as SimpleIconLib } from 'simple-icons'

export type SimpleIcon = Pick<SimpleIconLib, 'slug'> &
  Partial<Pick<SimpleIconLib, 'hex'>>
