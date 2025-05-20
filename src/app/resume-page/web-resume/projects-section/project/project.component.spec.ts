import { ComponentFixture } from '@angular/core/testing'

import { ATTRIBUTE, ProjectComponent, STACK_CONTENT } from './project.component'
import { MockComponents } from 'ng-mocks'
import { CardComponent } from '@/common/card/card.component'
import { CardHeaderImageComponent } from '@/common/card/card-header/card-header-image/card-header-image.component'
import { CardHeaderComponent } from '@/common/card/card-header/card-header.component'
import { Project, Stack } from '../../../data/project'
import { CardHeaderTextsComponent } from '@/common/card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderDetailComponent } from '@/common/card/card-header/card-header-detail/card-header-detail.component'
import { DateRangeComponent } from '../../../date-range/date-range.component'
import { byTestId } from '@/test/helpers/test-id'
import { By } from '@angular/platform-browser'
import { DateRange } from '../../../data/date-range'
import { CardHeaderAttributesComponent } from '@/common/card/card-header/card-header-attributes/card-header-attributes.component'
import { AttributeComponent } from '../../attribute/attribute.component'
import { ChippedContentComponent } from '@/common/chipped-content/chipped-content.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { makeProject } from '../../../data/__tests__/make-project'
import { getComponentInstance } from '@/test/helpers/get-component-instance'
import { TestIdDirective } from '@/common/test-id.directive'
import { LinkComponent } from '../../../link/link.component'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('ProjectComponent', () => {
  let component: ProjectComponent
  let fixture: ComponentFixture<ProjectComponent>

  beforeEach(() => {
    ;[fixture, component] = makeSut()
  })

  it('should create', () => {
    setProject(fixture)

    expect(component).toBeTruthy()
  })

  describe('when image does not exist', () => {
    it('should not contain image component neither its link', () => {
      const imageSrc = undefined
      setProject(fixture, { imageSrc })

      const linkElement = fixture.debugElement.query(byTestId('image'))

      expect(linkElement).toBeFalsy()
    })
  })

  describe('when image exists', () => {
    it('should contain image component with link to website', () => {
      const imageSrc = 'https://example.org/logo.png'
      const website = new URL('https://example.org')

      setProject(fixture, { imageSrc, website })

      const anchorElement = fixture.debugElement
        .query(byTestId('image'))
        .query(By.css('a'))

      expect(anchorElement).toBeTruthy()
      expect(anchorElement.attributes['href']).toEqual(website.toString())

      const imageElement = anchorElement.query(
        By.directive(CardHeaderImageComponent),
      )

      expect(imageElement).toBeTruthy()
      expect(
        getComponentInstance(imageElement, CardHeaderImageComponent).src,
      ).toBe(imageSrc)
    })
  })

  it('should contain name with link to website', () => {
    const name = 'Cool project name'
    const website = new URL('https://example.org')

    setProject(fixture, { name, website })

    const titleElement = fixture.debugElement.query(byTestId('name'))

    expect(textContent(titleElement)).toEqual(name)
  })

  describe('when no roles exist', () => {
    it('should not contain role', () => {
      const roles: Project['roles'] = []
      setProject(fixture, { roles })

      const roleElement = fixture.debugElement.query(byTestId('role'))

      expect(roleElement).toBeFalsy()
    })
  })

  describe('when at least one role exists', () => {
    it('should contain first role', () => {
      const roles = ['Role 1', 'Role 2']

      setProject(fixture, { roles })

      const roleElement = fixture.debugElement.query(byTestId('role'))

      expect(roleElement).toBeTruthy()
      expect(textContent(roleElement)).toEqual(roles[0])
    })
  })

  it('should contain dates range', () => {
    const startDate = new Date('2022-02-14')

    setProject(fixture, { dateRange: new DateRange(startDate) })

    const dateRangeElement = fixture.debugElement.query(
      By.directive(DateRangeComponent),
    )

    expect(dateRangeElement).toBeTruthy()
  })

  describe('when no stack attribute exists', () => {
    it('should not include attribute', () => {
      const stack = undefined

      setProject(fixture, { stack })

      const stackAttributeElement = fixture.debugElement.query(
        byTestId(ATTRIBUTE.Stack),
      )

      expect(stackAttributeElement).toBeFalsy()
    })
  })

  describe('when stack attribute exists', () => {
    it('should include attribute with its display name and icon', () => {
      const stack = Stack.Front
      const stackContent = STACK_CONTENT[stack]

      setProject(fixture, { stack })

      const stackAttributeElement = fixture.debugElement.query(
        byTestId(ATTRIBUTE.Stack),
      )

      expect(stackAttributeElement).toBeTruthy()
      expect(
        getComponentInstance(stackAttributeElement, AttributeComponent).symbol,
      ).toBe(stackContent.materialSymbol)

      expect(textContent(stackAttributeElement)).toEqual(
        stackContent.displayName,
      )
    })
  })
})

function makeSut() {
  return componentTestSetup(ProjectComponent, {
    imports: [
      TestIdDirective,
      LinkComponent,
      MockComponents(
        CardComponent,
        CardHeaderComponent,
        CardHeaderImageComponent,
        CardHeaderTextsComponent,
        CardHeaderDetailComponent,
        DateRangeComponent,
        CardHeaderAttributesComponent,
        AttributeComponent,
        ChippedContentComponent,
      ),
    ],
  })
}

function setProject(
  fixture: ComponentFixture<ProjectComponent>,
  overrides?: Partial<Project>,
) {
  setFixtureInputsAndDetectChanges(fixture, {
    project: makeProject(overrides),
  })
}
