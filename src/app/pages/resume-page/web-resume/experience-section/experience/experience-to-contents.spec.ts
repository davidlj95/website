import { TextContentComponent } from '@/common/chipped-content/text-content/text-content.component'
import { EXPERIENCE_TO_CONTENTS } from './experience-to-contents'
import { makeExperience } from '../../../data/__tests__/make-experience'
import { ExperienceHighlightsComponent } from './experience-highlights/experience-highlights.component'
import { Project } from '../../../data/project'
import { makeProject } from '../../../data/__tests__/make-project'
import { ExperienceTechComponent } from './experience-tech/experience-tech.component'
import { ChippedContent } from '@/common/chipped-content/chipped-content'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { PROJECT_SERVICE, ProjectService } from '../../../data/project-service'
import { MockProvider } from 'ng-mocks'
import { lastValueFrom, of } from 'rxjs'

describe('experienceToContents', () => {
  it('should include summary content', async () => {
    const summary = 'Did amazing things and rocked 100% of time'
    const sut = makeSut()

    const contents = await lastValueFrom(sut(makeExperience({ summary })))
    const summaryContents = contents.filter(
      (content) => content.displayName === 'Summary',
    )

    expect(summaryContents).toHaveSize(1)
    const summaryContent =
      summaryContents[0] as ChippedContent<TextContentComponent>

    expect(summaryContent.component).toEqual(TextContentComponent)
    expect(summaryContent.inputs).toEqual({
      text: summary,
    })
  })

  it('should include highlights content', async () => {
    const highlights = ['Highlight 1', 'Highlight 2']
    const sut = makeSut()

    const contents = await lastValueFrom(sut(makeExperience({ highlights })))
    const highlightsContents = contents.filter(
      (content) => content.displayName === 'Highlights',
    )

    expect(highlightsContents).toHaveSize(1)
    const highlightsContent =
      highlightsContents[0] as ChippedContent<ExperienceHighlightsComponent>

    expect(highlightsContent.component).toEqual(ExperienceHighlightsComponent)

    expect(highlightsContent.inputs).toEqual({
      highlights,
    })
  })

  it('should include technologies content with the set of technologies of all projects', async () => {
    const aTechnology = 'foo-tech'
    const anotherTechnology = 'bar-tech'
    const technologies = [aTechnology, anotherTechnology]
    const projects: readonly Project[] = [
      makeProject({ technologies: [aTechnology], name: 'project A' }),
      makeProject({
        technologies: [aTechnology, anotherTechnology],
        name: 'project B',
      }),
    ]
    const projectService = {
      getByCompanyName: jasmine
        .createSpy<ProjectService['getByCompanyName']>()
        .and.returnValue(of(projects)),
    } satisfies Partial<ProjectService>

    const sut = makeSut({
      projectService,
    })

    const contents = await lastValueFrom(sut(makeExperience()))
    const techContents = contents.filter(
      (content) => content.displayName === 'Tech',
    )

    expect(techContents).toHaveSize(1)
    const techContent =
      techContents[0] as ChippedContent<ExperienceTechComponent>

    expect(techContent.component).toEqual(ExperienceTechComponent)
    expect(techContent.inputs).toEqual({
      technologies,
      projectNames: projects.map((project) => project.name),
    })
  })
})

const makeSut = ({
  projectService,
}: { projectService?: Partial<ProjectService> } = {}) =>
  serviceTestSetup(EXPERIENCE_TO_CONTENTS, {
    providers: [
      MockProvider(
        PROJECT_SERVICE,
        projectService ?? {
          getByCompanyName: () => of([]),
        },
      ),
    ],
  })
