import { inject, InjectionToken } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { ExperienceItem } from './experience-item/experience-item'
import { Organization } from '../organization'
import { DateRange } from '../date-range/date-range'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'

export type AdaptJsonResumeWork = (work: JsonResumeWork) => ExperienceItem
export const ADAPT_JSON_RESUME_WORK = new InjectionToken<AdaptJsonResumeWork>(
  isDevMode ? 'AdaptJsonResumeWork' : 'AJRW',
  {
    factory: () => {
      const relativizeUrl = inject(RELATIVIZE_PRODUCTION_URL)
      // 👇 JSON Resume Schema of "work"
      // https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json#L100-L149
      // Includes additional fields though
      return (work) =>
        new ExperienceItem({
          company: new Organization({
            name: work.name,
            imageSrc: relativizeUrl(new URL(work.image)),
            website: new URL(work.url),
          }),
          position: work.position,
          summary: work.summary,
          highlights: work.highlights,
          dateRange: new DateRange(
            new Date(work.startDate),
            !work.endDate ? undefined : new Date(work.endDate),
          ),
          freelance: work.freelance,
          internship: work.internship,
          promotions: work.promotions,
          morePositions: work.morePositions,
        })
    },
  },
)

export type JsonResumeWork = (typeof resume.work)[number]