import { TestBed } from '@angular/core/testing'

import resume from '../../../../assets/resume.json'
import {
  JsonResumeProjectItem,
  JsonResumeProjectItemAdapterService,
} from './json-resume-project-item-adapter.service'

describe('JsonResumeProjectItemAdapterService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  describe('#adapt', () => {
    it('should map name', () => {
      const name = 'Super cool project'
      const item = makeSut().adapt(makeJsonResumeProjectItem({ name }))
      expect(item.name).toEqual(name)
    })

    it('should map description', () => {
      const description = 'Does magic things'
      const item = makeSut().adapt(makeJsonResumeProjectItem({ description }))
      expect(item.description).toEqual(description)
    })

    it('should map start date', () => {
      const startDate = '2022-12-31'
      const item = makeSut().adapt(makeJsonResumeProjectItem({ startDate }))
      expect(item.dateRange.start).toEqual(new Date(startDate))
    })

    describe('when end date exists', () => {
      it('should map end date', () => {
        const endDate = '2023-12-31'
        const item = makeSut().adapt(makeJsonResumeProjectItem({ endDate }))
        expect(item.dateRange.end).toEqual(new Date(endDate))
      })
    })

    describe('when end date does not exist', () => {
      it('should map no end date', () => {
        const endDate = undefined
        const item = makeSut().adapt(makeJsonResumeProjectItem({ endDate }))
        expect(item.dateRange.end).toBeUndefined()
      })
    })

    describe('when website exists', () => {
      it('should map website', () => {
        const url = 'https://example.org/website'
        const item = makeSut().adapt(makeJsonResumeProjectItem({ url }))
        expect(item.website).toEqual(new URL(url))
      })
    })

    describe('when website does not exist', () => {
      it('should map no website', () => {
        const url = undefined
        const item = makeSut().adapt(makeJsonResumeProjectItem({ url }))
        expect(item.website).toBeUndefined()
      })
    })

    it('should map roles', () => {
      const roles = ['Role A', 'Role B']
      const item = makeSut().adapt(makeJsonResumeProjectItem({ roles }))
      expect(item.roles).toEqual(roles)
    })
  })
})

function makeSut(): JsonResumeProjectItemAdapterService {
  TestBed.configureTestingModule({})
  return TestBed.inject(JsonResumeProjectItemAdapterService)
}

function makeJsonResumeProjectItem(
  overrides: Partial<JsonResumeProjectItem> = {},
): JsonResumeProjectItem {
  const sampleJsonResumeProjectItem = resume.projects[0]
  return {
    ...sampleJsonResumeProjectItem,
    ...overrides,
  }
}
