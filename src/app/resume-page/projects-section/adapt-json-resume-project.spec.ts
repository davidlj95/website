import resume from '../../../../assets/resume.json'
import {
  ADAPT_JSON_RESUME_PROJECT,
  AdaptJsonResumeProject,
  InvalidStackValueError,
  JsonResumeProject,
} from './adapt-json-resume-project'
import { MockProvider } from 'ng-mocks'
import { Stack } from './project-item/project-item'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import {
  RELATIVIZE_PRODUCTION_URL,
  RelativizeProductionUrl,
} from '@/common/relativize-production-url'

describe('AdaptJsonResumeProject', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should map name', () => {
    const name = 'Super cool project'
    const item = makeSut()(makeJsonResumeProjectItem({ name }))
    expect(item.name).toEqual(name)
  })

  it('should map description', () => {
    const description = 'Does magic things'
    const item = makeSut()(makeJsonResumeProjectItem({ description }))
    expect(item.description).toEqual(description)
  })

  it('should map start date', () => {
    const startDate = '2022-12-31'
    const item = makeSut()(makeJsonResumeProjectItem({ startDate }))
    expect(item.dateRange.start).toEqual(new Date(startDate))
  })

  describe('when end date exists', () => {
    it('should map end date', () => {
      const endDate = '2023-12-31'
      const item = makeSut()(makeJsonResumeProjectItem({ endDate }))
      expect(item.dateRange.end).toEqual(new Date(endDate))
    })
  })

  describe('when end date does not exist', () => {
    it('should map no end date', () => {
      const endDate = undefined
      const item = makeSut()(makeJsonResumeProjectItem({ endDate }))
      expect(item.dateRange.end).toBeUndefined()
    })
  })

  describe('when website exists', () => {
    it('should map website', () => {
      const url = 'https://example.org/website'
      const item = makeSut()(makeJsonResumeProjectItem({ url }))
      expect(item.website).toEqual(new URL(url))
    })
  })

  describe('when website does not exist', () => {
    it('should map no website', () => {
      const url = undefined
      const item = makeSut()(makeJsonResumeProjectItem({ url }))
      expect(item.website).toBeUndefined()
    })
  })

  it('should map roles', () => {
    const roles = ['Role A', 'Role B']
    const item = makeSut()(makeJsonResumeProjectItem({ roles }))
    expect(item.roles).toEqual(roles)
  })

  describe('when image exists', () => {
    it('should relativize image URL', () => {
      const dummyImagePath = '/assets/projects/foo.png'
      const image = `https://example.com${dummyImagePath}`
      const relativizeProductionUrl = jasmine
        .createSpy<RelativizeProductionUrl>()
        .and.returnValue(dummyImagePath)
      const sut = makeSut({ relativizeProductionUrl })

      const item = sut(makeJsonResumeProjectItem({ image }))

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

      const item = sut(makeJsonResumeProjectItem({ image }))
      expect(relativizeProductionUrl).not.toHaveBeenCalled()
      expect(item.imageSrc).toBeUndefined()
    })
  })

  describe('when stack exists', () => {
    it('should map stack', () => {
      const stack = Stack.Full
      const item = makeSut()(makeJsonResumeProjectItem({ stack }))
      expect(item.stack).toEqual(stack)
    })
    it('should raise error if invalid', () => {
      const stack = 'kata-croquet'
      expect(() =>
        makeSut()(makeJsonResumeProjectItem({ stack })),
      ).toThrowError(InvalidStackValueError)
    })
  })

  describe('when stack does not exist', () => {
    it('should map no stack', () => {
      const stack = undefined
      const item = makeSut()(makeJsonResumeProjectItem({ stack }))
      expect(item.stack).toBeUndefined()
    })
  })

  it('should map technologies', () => {
    const jsonResumeTechnology: JsonResumeProject['technologies'][number] = {
      id: 'slug',
      version: 'version',
    }
    const technologies: JsonResumeProject['technologies'] = [
      jsonResumeTechnology,
    ]
    const item = makeSut()(makeJsonResumeProjectItem({ technologies }))
    expect(item.technologies).toEqual([
      { slug: jsonResumeTechnology.id, version: jsonResumeTechnology.version },
    ])
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

function makeJsonResumeProjectItem(
  overrides: Partial<JsonResumeProject> = {},
): JsonResumeProject {
  const sampleJsonResumeProjectItem = resume.projects[0]
  return {
    ...sampleJsonResumeProjectItem,
    ...overrides,
  } as JsonResumeProject
}
