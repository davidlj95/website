import {
  EMPLOYEE_TAG,
  FREELANCE_TAG,
  TAG_TO_ATTRIBUTE,
  tagsToAttributes,
} from './attribute'

describe('Attribute', () => {
  describe('tagsToAttributes', () => {
    const sut = tagsToAttributes

    it('should map tags to attributes', () => {
      const tags = [FREELANCE_TAG, EMPLOYEE_TAG]

      const attributes = sut(tags)

      expect(attributes).toEqual([
        TAG_TO_ATTRIBUTE[FREELANCE_TAG],
        TAG_TO_ATTRIBUTE[EMPLOYEE_TAG],
      ])
    })

    it('should not map unknown tags', () => {
      const tags = ['unknown-tag']

      const attributes = sut(tags)

      expect(attributes.length).toBe(0)
    })
  })
})
