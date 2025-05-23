import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { MockProvider } from 'ng-mocks'
import { firstValueFrom, of } from 'rxjs'
import { RESUME_CONFIG_SERVICE } from '../resume-config.service'
import { makeExperience } from './__tests__/make-experience'
import { Experience } from './experience'
import {
  COMPACT_HIGHLIGHTS_LENGTH,
  COMPACT_HIGHLIGHTS_YEARS_OLD,
  COMPACT_TECHS_LENGTH,
  COMPACT_TECHS_YEARS_OLD,
  EXPERIENCE_SERVICE,
} from './experience.service'
import { GET_JSON_RESUME_EXPERIENCES } from './get-json-resume-experiences'

describe('ExperienceService', () => {
  it('should return experiences from JSON resume', async () => {
    const experiences = [
      makeExperience({ summary: 'exp 1' }),
      makeExperience({ summary: 'exp 2' }),
    ]

    const sut = makeSut({ jsonResumeExperiences: experiences })

    expect(await firstValueFrom(sut.getAll())).toEqual(experiences)
  })

  it('should return no highlights for older experiences when compact mode is enabled', async () => {
    const now = new Date()
    const someYearsAgo = new Date(
      now.getFullYear() - COMPACT_HIGHLIGHTS_YEARS_OLD,
      0,
      1,
    )
    const experience = makeExperience({
      dateRange: { start: someYearsAgo, end: someYearsAgo },
    })

    const sut = makeSut({
      jsonResumeExperiences: [experience],
      isCompact: true,
    })
    const { highlights } = (await firstValueFrom(sut.getAll()))[0]

    expect(highlights).toEqual([])
  })

  it('should slice highlights for recent experiences when compact mode is enabled', async () => {
    const now = new Date()
    const experience = makeExperience({
      highlights: [...Array(COMPACT_HIGHLIGHTS_LENGTH + 1).keys()].map(
        toString,
      ),
      dateRange: { start: now },
    })

    const sut = makeSut({
      jsonResumeExperiences: [experience],
      isCompact: true,
    })
    const { highlights } = (await firstValueFrom(sut.getAll()))[0]

    expect(highlights).toEqual(highlights.slice(0, COMPACT_HIGHLIGHTS_LENGTH))
  })

  it('should remove technologies for older experiences when compact mode is enabled', async () => {
    const now = new Date()
    const someYearsAgo = new Date(
      now.getFullYear() - COMPACT_TECHS_YEARS_OLD,
      0,
      1,
    )
    const experience = makeExperience({
      technologies: ['tech-1'],
      dateRange: { start: someYearsAgo, end: someYearsAgo },
    })

    const sut = makeSut({
      jsonResumeExperiences: [experience],
      isCompact: true,
    })
    const { technologies } = (await firstValueFrom(sut.getAll()))[0]

    expect(technologies).toEqual([])
  })

  it('should slice technologies for recent experiences when compact mode is enabled', async () => {
    const now = new Date()
    const experience = makeExperience({
      technologies: [...Array(COMPACT_TECHS_LENGTH + 1).keys()].map(
        (i) => `tech-${i}`,
      ),
      dateRange: { start: now },
    })

    const sut = makeSut({
      jsonResumeExperiences: [experience],
      isCompact: true,
    })
    const { technologies } = (await firstValueFrom(sut.getAll()))[0]

    expect(technologies).toEqual(technologies.slice(0, COMPACT_TECHS_LENGTH))
  })
})

const makeSut = ({
  jsonResumeExperiences,
  isCompact,
}: {
  jsonResumeExperiences?: readonly Experience[]
  isCompact?: boolean
} = {}) =>
  serviceTestSetup(EXPERIENCE_SERVICE, {
    providers: [
      MockProvider(GET_JSON_RESUME_EXPERIENCES, () =>
        of(jsonResumeExperiences ?? []),
      ),
      MockProvider(RESUME_CONFIG_SERVICE, { compact$: of(isCompact ?? false) }),
    ],
  })
