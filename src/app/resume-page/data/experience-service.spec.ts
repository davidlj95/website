import {
  ADAPT_JSON_RESUME_WORK,
  AdaptJsonResumeWork,
} from './adapt-json-resume-work'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { MockProvider } from 'ng-mocks'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { firstValueFrom, of } from 'rxjs'
import { Experience, EXPERIENCE_SERVICE } from './experience-service'
import { JsonResumeWork, JsonResumeWorkItem } from '../json-resume/types'

describe('ExperienceService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should return adapted items from JSON Resume', async () => {
    const work = [
      'item-1' as unknown as JsonResumeWorkItem,
      'item-2' as unknown as JsonResumeWorkItem,
    ]
    const expectedExperiences = work as unknown as readonly Experience[]

    const adaptJsonResumeWork = jasmine
      .createSpy<AdaptJsonResumeWork>()
      .and.returnValues(...expectedExperiences)

    const sut = makeSut({
      work,
      adaptJsonResumeWork,
    })

    const experiences = await firstValueFrom(sut.getAll())

    expect(experiences).toEqual(expectedExperiences)
    expect(adaptJsonResumeWork).toHaveBeenCalledTimes(work.length)
  })
})

const makeSut = ({
  work,
  adaptJsonResumeWork,
}: {
  work?: JsonResumeWork
  adaptJsonResumeWork?: AdaptJsonResumeWork
} = {}) =>
  serviceTestSetup(EXPERIENCE_SERVICE, {
    providers: [
      work
        ? MockProvider(JsonResumeService, {
            getWork: () => of(work),
          })
        : [],
      adaptJsonResumeWork
        ? MockProvider(ADAPT_JSON_RESUME_WORK, adaptJsonResumeWork)
        : [],
    ],
  })
