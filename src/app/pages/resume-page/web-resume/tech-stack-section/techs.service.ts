import {
  TECHS_BY_TAG,
  TECHS_RELEVANCE_SCORE,
  TECHS_TAGS,
  TechTag,
} from './tags'
import { InjectionToken } from '@angular/core'

/** @visibleForTesting **/
export interface TechsService {
  findTechsByTag(
    tag: TechTag,
    opts?: { includes?: readonly TechTag[]; excludes?: readonly TechTag[] },
  ): readonly string[]
}
export const TECHS_SERVICE = new InjectionToken<TechsService>(
  ngDevMode ? 'TechsService' : 'TS',
  {
    factory: () => {
      return {
        findTechsByTag(
          tag: TechTag,
          {
            includes,
            excludes,
          }: {
            includes?: readonly TechTag[]
            excludes?: readonly TechTag[]
          } = {},
        ) {
          const techsWithTag = TECHS_BY_TAG[tag]
          const withIncludes = includes?.length
            ? techsWithTag.filter((tech) =>
                includes.some((tag) => TECHS_TAGS[tech].includes(tag)),
              )
            : techsWithTag
          const withoutExcludes = excludes?.length
            ? withIncludes.filter((tech) =>
                excludes.every((tag) => !TECHS_TAGS[tech].includes(tag)),
              )
            : withIncludes
          return [...withoutExcludes].sort(
            (a, b) => TECHS_RELEVANCE_SCORE[b] - TECHS_RELEVANCE_SCORE[a],
          )
        },
      }
    },
  },
)
