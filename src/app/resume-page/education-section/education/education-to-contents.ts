import { Education } from '../../data/education'
import { ChippedContent } from '../../chipped-content/chipped-content'
import { EducationCoursesComponent } from './education-courses/education-courses.component'
import { isNotUndefined } from '@/common/is-not-undefined'
import { TextContentComponent } from '../../chipped-content/text-content/text-content.component'

export const educationToContents: (
  item: Education,
) => readonly ChippedContent[] = (item) =>
  [
    item.score
      ? new ChippedContent({
          displayName: 'Score',
          component: TextContentComponent,
          inputs: {
            text: item.score,
          },
        })
      : undefined,
    item.courses.length > 0
      ? new ChippedContent({
          displayName: 'Courses',
          component: EducationCoursesComponent,
          inputs: {
            courses: item.courses,
          },
        })
      : undefined,
  ].filter(isNotUndefined)
