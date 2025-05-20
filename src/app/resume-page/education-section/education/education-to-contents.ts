import { Education } from '../../data/education'
import { ChippedContent } from '../../chipped-content/chipped-content'
import { EducationCoursesComponent } from './education-courses/education-courses.component'
import { isNotUndefined } from '@/common/is-not-undefined'
import { TextContentComponent } from '../../chipped-content/text-content/text-content.component'

export const educationToContents = (
  education: Education,
): readonly ChippedContent[] =>
  [
    education.score
      ? new ChippedContent({
          displayName: 'Score',
          component: TextContentComponent,
          inputs: {
            text: education.score,
          },
        })
      : undefined,
    education.courses.length > 0
      ? new ChippedContent({
          displayName: 'Courses',
          component: EducationCoursesComponent,
          inputs: {
            courses: education.courses,
          },
        })
      : undefined,
  ].filter(isNotUndefined)
