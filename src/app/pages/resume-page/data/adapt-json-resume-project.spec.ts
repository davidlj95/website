import {
  ADAPT_JSON_RESUME_PROJECT,
  AdaptJsonResumeProject,
  STACK_BACKEND_TAG,
} from './adapt-json-resume-project'
import { MockProvider } from 'ng-mocks'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import {
  RELATIVIZE_PRODUCTION_URL,
  RelativizeProductionUrl,
} from '@/common/relativize-production-url'
import { makeJsonResumeProject } from './__tests__/make-json-resume-project'
import { TAG_TO_ATTRIBUTE } from './attribute'

describe('AdaptJsonResumeProject', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should map name', () => {
    const name = 'Super cool project'
    const item = makeSut()(makeJsonResumeProject({ name }))

    expect(item.name).toEqual(name)
  })

  it('should map description', () => {
    const description = 'Does magic things'
    const item = makeSut()(makeJsonResumeProject({ description }))

    expect(item.description).toEqual(description)
  })

  it('should map start date', () => {
    const startDate = '2022-12-31'
    const item = makeSut()(makeJsonResumeProject({ startDate }))

    expect(item.dateRange.start).toEqual(new Date(startDate))
  })

  describe('when end date exists', () => {
    it('should map end date', () => {
      const endDate = '2023-12-31'
      const item = makeSut()(makeJsonResumeProject({ endDate }))

      expect(item.dateRange.end).toEqual(new Date(endDate))
    })
  })

  describe('when end date does not exist', () => {
    it('should map no end date', () => {
      const endDate = undefined
      const item = makeSut()(makeJsonResumeProject({ endDate }))

      expect(item.dateRange.end).toBeUndefined()
    })
  })

  describe('when website exists', () => {
    it('should map website', () => {
      const url = 'https://example.org/website'
      const item = makeSut()(makeJsonResumeProject({ url }))

      expect(item.website).toEqual(new URL(url))
    })
  })

  describe('when website does not exist', () => {
    it('should map no website', () => {
      const url = undefined
      const item = makeSut()(makeJsonResumeProject({ url }))

      expect(item.website).toBeUndefined()
    })
  })

  it('should map roles', () => {
    const roles = ['Role A', 'Role B']
    const item = makeSut()(makeJsonResumeProject({ roles }))

    expect(item.roles).toEqual(roles)
  })

  it('should map entity', () => {
    const entity = 'entity'
    const item = makeSut()(makeJsonResumeProject({ entity }))

    expect(item.entity).toEqual(entity)
  })

  describe('when image exists', () => {
    it('should relativize image URL', () => {
      const dummyImagePath = '/images/projects/foo.png'
      const image = `https://example.com${dummyImagePath}`
      const relativizeProductionUrl = jasmine
        .createSpy<RelativizeProductionUrl>()
        .and.returnValue(dummyImagePath)
      const sut = makeSut({ relativizeProductionUrl })

      const item = sut(makeJsonResumeProject({ image }))

      expect(relativizeProductionUrl).toHaveBeenCalledOnceWith(new URL(image))
      expect(item.imageSrc).toEqual(dummyImagePath)
    })
  })

  describe('when image does not exist', () => {
    it('should map no image', () => {
      const image = undefined
      const relativizeProductionUrl =
        jasmine.createSpy<RelativizeProductionUrl>()
      const sut = makeSut({ relativizeProductionUrl })

      const item = sut(makeJsonResumeProject({ image }))

      expect(relativizeProductionUrl).not.toHaveBeenCalled()
      expect(item.imageSrc).toBeUndefined()
    })
  })

  it('should map tags to attributes', () => {
    const tags = [STACK_BACKEND_TAG]

    const item = makeSut()(makeJsonResumeProject({ tags }))

    expect(item.attributes).toEqual([TAG_TO_ATTRIBUTE[tags[0]]])
  })

  it('should map technologies', () => {
    const technologies = ['foo-tech']
    const item = makeSut()(makeJsonResumeProject({ technologies }))

    expect(item.technologies).toEqual(technologies)
  })
})

const makeSut = (
  opts: { relativizeProductionUrl?: RelativizeProductionUrl } = {},
): AdaptJsonResumeProject =>
  serviceTestSetup(ADAPT_JSON_RESUME_PROJECT, {
    providers: [
      MockProvider(
        RELATIVIZE_PRODUCTION_URL,
        opts.relativizeProductionUrl ?? (() => '/fake/path'),
      ),
    ],
  })
