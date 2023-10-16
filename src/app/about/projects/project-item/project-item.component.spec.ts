import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  Attribute,
  ProjectItemComponent,
  StackContent,
} from './project-item.component'
import { MockComponents } from 'ng-mocks'
import { CardComponent } from '../../card/card.component'
import { CardHeaderImageComponent } from '../../card/card-header/card-header-image/card-header-image.component'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { SAMPLE_NEW_PROJECT_ITEM_ARG } from './fixtures'
import { byComponent } from '../../../../test/helpers/component-query-predicates'
import { getReflectedAttribute } from '../../../../test/helpers/get-reflected-attribute'
import { ProjectItem, Stack } from './project-item'
import { CardHeaderTextsComponent } from '../../card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderTitleComponent } from '../../card/card-header/card-header-title/card-header-title.component'
import { CardHeaderSubtitleComponent } from '../../card/card-header/card-header-subtitle/card-header-subtitle.component'
import { CardHeaderDetailComponent } from '../../card/card-header/card-header-detail/card-header-detail.component'
import { LinkComponent } from '../../link/link.component'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { byTestId } from '../../../../test/helpers/test-id'
import { By } from '@angular/platform-browser'
import { TestIdDirective } from '../../../common/test-id.directive'
import { DateRange } from '../../date-range/date-range'
import { CardHeaderAttributesComponent } from '../../card/card-header/card-header-attributes/card-header-attributes.component'
import { AttributeComponent } from '../../attribute/attribute.component'

describe('ProjectItemComponent', () => {
  let component: ProjectItemComponent
  let fixture: ComponentFixture<ProjectItemComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectItemComponent,
        LinkComponent,
        TestIdDirective,
        MockComponents(
          CardComponent,
          CardHeaderComponent,
          CardHeaderImageComponent,
          CardHeaderTextsComponent,
          CardHeaderTitleComponent,
          CardHeaderSubtitleComponent,
          CardHeaderDetailComponent,
          DateRangeComponent,
          CardHeaderAttributesComponent,
          AttributeComponent,
        ),
      ],
    })
    fixture = TestBed.createComponent(ProjectItemComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    setProjectItem(fixture)
    expect(component).toBeTruthy()
  })

  describe('when image does not exist', () => {
    it('should not contain image component neither its link', () => {
      const image = undefined
      setProjectItem(fixture, { image })

      const linkElement = fixture.debugElement.query(byTestId('image'))
      expect(linkElement).toBeFalsy()
    })
  })

  describe('when image exists', () => {
    it('should contain image component with link to website', () => {
      const image = new URL('https://example.org/logo.png')
      const website = new URL('https://example.org')

      setProjectItem(fixture, { image, website })

      const anchorElement = fixture.debugElement
        .query(byTestId('image'))
        .query(By.css('a'))
      expect(anchorElement).toBeTruthy()
      expect(anchorElement.attributes['href']).toEqual(website.toString())

      const imageElement = anchorElement.query(
        byComponent(CardHeaderImageComponent),
      )
      expect(imageElement).toBeTruthy()
      expect(getReflectedAttribute(imageElement, 'src')).toEqual(
        image.toString(),
      )
    })
  })

  it('should contain name with link to website', () => {
    const name = 'Cool project name'
    const website = new URL('https://example.org')

    setProjectItem(fixture, { name, website })

    const anchorElement = fixture.debugElement
      .query(byTestId('name'))
      .query(By.css('a'))
    expect(anchorElement).toBeTruthy()
    expect(anchorElement.attributes['href']).toEqual(website.toString())

    expect(anchorElement.nativeElement.textContent.trim()).toEqual(name)
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
      expect(roleElement.nativeElement.textContent.trim()).toEqual(roles[0])
    })
  })

  it('should contain dates range', () => {
    const startDate = new Date('2022-02-14')

    setProjectItem(fixture, { dateRange: new DateRange(startDate) })

    const dateRangeElement = fixture.debugElement.query(
      byComponent(DateRangeComponent),
    )
    expect(dateRangeElement).toBeTruthy()
  })

  describe('when no stack attribute exists', () => {
    it('should not include attribute', () => {
      const stack = undefined

      setProjectItem(fixture, { stack })

      const stackAttributeElement = fixture.debugElement.query(
        byTestId(Attribute.Stack),
      )
      expect(stackAttributeElement).toBeFalsy()
    })
  })

  describe('when stack attribute exists', () => {
    it('should include attribute with its display name and icon', () => {
      const stack = Stack.Front
      const stackContent = StackContent[stack]

      setProjectItem(fixture, { stack })

      const stackAttributeElement = fixture.debugElement.query(
        byTestId(Attribute.Stack),
      )
      expect(stackAttributeElement).toBeTruthy()
      expect(getReflectedAttribute(stackAttributeElement, 'symbol')).toEqual(
        stackContent.materialSymbol,
      )
      expect(stackAttributeElement.nativeElement.textContent.trim()).toEqual(
        stackContent.displayName,
      )
    })
  })
})

function setProjectItem(
  fixture: ComponentFixture<ProjectItemComponent>,
  overrides: Partial<ConstructorParameters<typeof ProjectItem>[0]> = {},
) {
  fixture.componentInstance.item = new ProjectItem({
    ...SAMPLE_NEW_PROJECT_ITEM_ARG,
    ...overrides,
  })
  fixture.detectChanges()
}
