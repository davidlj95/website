import { ComponentFixture } from '@angular/core/testing'

import {
  ATTRIBUTE,
  ProjectItemComponent,
  STACK_CONTENT,
} from './project-item.component'
import { MockComponents } from 'ng-mocks'
import { CardComponent } from '../../card/card.component'
import { CardHeaderImageComponent } from '../../card/card-header/card-header-image/card-header-image.component'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { Project, Stack } from '../../data/project'
import { CardHeaderTextsComponent } from '../../card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderDetailComponent } from '../../card/card-header/card-header-detail/card-header-detail.component'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { byTestId } from '@/test/helpers/test-id'
import { By } from '@angular/platform-browser'
import { DateRange } from '../../data/date-range'
import { CardHeaderAttributesComponent } from '../../card/card-header/card-header-attributes/card-header-attributes.component'
import { AttributeComponent } from '../../attribute/attribute.component'
import { ChippedContentComponent } from '../../chipped-content/chipped-content.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { makeProject } from '../../data/__tests__/make-project'
import { getComponentInstance } from '@/test/helpers/get-component-instance'
import { TestIdDirective } from '@/common/test-id.directive'
import { LinkComponent } from '../../link/link.component'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('ProjectItemComponent', () => {
  let component: ProjectItemComponent
  let fixture: ComponentFixture<ProjectItemComponent>

  beforeEach(() => {
    ;[fixture, component] = makeSut()
  })

  it('should create', () => {
    setProjectItem(fixture)

    expect(component).toBeTruthy()
  })

  describe('when image does not exist', () => {
    it('should not contain image component neither its link', () => {
      const imageSrc = undefined
      setProjectItem(fixture, { imageSrc })

      const linkElement = fixture.debugElement.query(byTestId('image'))

      expect(linkElement).toBeFalsy()
    })
  })

  describe('when image exists', () => {
    it('should contain image component with link to website', () => {
      const imageSrc = 'https://example.org/logo.png'
      const website = new URL('https://example.org')

      setProjectItem(fixture, { imageSrc, website })

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

    setProjectItem(fixture, { name, website })

    const titleElement = fixture.debugElement.query(byTestId('name'))

    expect(textContent(titleElement)).toEqual(name)
  })

  describe('when no roles exist', () => {
    it('should not contain role', () => {
      const roles = undefined
      setProjectItem(fixture, { roles })

      const roleElement = fixture.debugElement.query(byTestId('role'))

      expect(roleElement).toBeFalsy()
    })
  })

  describe('when at least one role exists', () => {
    it('should contain first role', () => {
      const roles = ['Role 1', 'Role 2']

      setProjectItem(fixture, { roles })

      const roleElement = fixture.debugElement.query(byTestId('role'))

      expect(roleElement).toBeTruthy()
      expect(textContent(roleElement)).toEqual(roles[0])
    })
  })

  it('should contain dates range', () => {
    const startDate = new Date('2022-02-14')

    setProjectItem(fixture, { dateRange: new DateRange(startDate) })

    const dateRangeElement = fixture.debugElement.query(
      By.directive(DateRangeComponent),
    )

    expect(dateRangeElement).toBeTruthy()
  })

  describe('when no stack attribute exists', () => {
    it('should not include attribute', () => {
      const stack = undefined

      setProjectItem(fixture, { stack })

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

      setProjectItem(fixture, { stack })

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
  return componentTestSetup(ProjectItemComponent, {
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

function setProjectItem(
  fixture: ComponentFixture<ProjectItemComponent>,
  overrides?: Partial<Project>,
) {
  setFixtureInputsAndDetectChanges(fixture, {
    item: makeProject(overrides),
  })
}
