import { Contact } from '../basics-service'

export const makeContact = (overrides: Partial<Contact> = {}): Contact => ({
  label: 'contact',
  icon: 'CONTACT-ICON',
  text: 'contact text',
  url: new URL('https://example.com/contact'),
  ...overrides,
})
