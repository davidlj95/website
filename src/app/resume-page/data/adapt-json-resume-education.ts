import { inject, InjectionToken } from '@angular/core'
import resume from '@/data/resume.json'
import { Education } from './education'
import { DateRange } from './date-range'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'

/** @visibleForTesting */
export type AdaptJsonResumeEducation = (
  education: JsonResumeEducation,
) => Education
/** @visibleForTesting */
export type JsonResumeEducation = (typeof resume.education)[number]
export const ADAPT_JSON_RESUME_EDUCATION =
  new InjectionToken<AdaptJsonResumeEducation>(
    /* istanbul ignore next */
    isDevMode ? 'AdaptJsonResumeEducation' : 'AJRE',
    {
      factory: () => {
        const relativizeUrl = inject(RELATIVIZE_PRODUCTION_URL)
        // 👇 JSON Schema of "education"
        // https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json#L192-L237
        return (education) => ({
          institution: {
            name: education.institution,
            website: new URL(education.url),
            imageSrc: relativizeUrl(new URL(education.image)),
            shortName: education.shortName,
          },
          area: education.area,
          studyType: education.studyType,
          dateRange: new DateRange(
            new Date(education.startDate),
            !education.endDate ? undefined : new Date(education.endDate),
          ),
          score: education.score,
          courses: education.courses,
          isCumLaude: !!education.isCumLaude,
        })
      },
    },
  )
