import { ComponentFixture } from '@angular/core/testing'

import { Attribute, EducationItemComponent } from './education-item.component'
import { EducationItem } from './education-item'
import { Organization } from '../../organization'
import { By } from '@angular/platform-browser'
import { NgIf } from '@angular/common'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { MockComponents } from 'ng-mocks'
import { CardComponent } from '../../card/card.component'
import { CardHeaderImageComponent } from '../../card/card-header/card-header-image/card-header-image.component'
import { CardHeaderTitleComponent } from '../../card/card-header/card-header-title/card-header-title.component'
import { CardHeaderSubtitleComponent } from '../../card/card-header/card-header-subtitle/card-header-subtitle.component'
import { CardHeaderDetailComponent } from '../../card/card-header/card-header-detail/card-header-detail.component'
import { byTestId } from '@/test/helpers/test-id'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { CardHeaderTextsComponent } from '../../card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderAttributesComponent } from '../../card/card-header/card-header-attributes/card-header-attributes.component'
import { AttributeComponent } from '../../attribute/attribute.component'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { ChippedContentComponent } from '../../chipped-content/chipped-content.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { makeEducationItem } from './__tests__/make-education-item'
import { shouldContainComponent } from '@/test/helpers/component-testers'
import { ItemFactoryOverrides } from '@/test/helpers/make-item-factory'
import { getComponentInstance } from '@/test/helpers/get-component-instance'
import { LinkComponent } from '../../link/link.component'
import { TestIdDirective } from '@/common/test-id.directive'
import { textContent } from '@/test/helpers/text-content'

describe('EducationItemComponent', () => {
  let component: EducationItemComponent
  let fixture: ComponentFixture<EducationItemComponent>

  beforeEach(() => {
    ;[fixture, component] = makeSut()
  })

  it('should create', () => {
    setEducationItem(fixture)

    expect(component).toBeTruthy()
  })

  it('should display institution image with link to its website', () => {
    const imageUrl = 'https://example.org/logo.png'
    const website = 'https://example.org/'
    const institution = new Organization({
      name: 'Some cool name',
      imageSrc: imageUrl,
      website: new URL(website),
    })
    setEducationItem(fixture, { institution })

    // noinspection DuplicatedCode
    const anchorElement = fixture.debugElement
      .query(byTestId('image'))
      .query(By.css('a'))

    expect(anchorElement).toBeTruthy()
    expect(anchorElement.attributes['href']).toEqual(website)

    const imageElement = anchorElement.query(
      byComponent(CardHeaderImageComponent),
    )

    expect(imageElement).toBeTruthy()
    expect(
      getComponentInstance(imageElement, CardHeaderImageComponent).src,
    ).toEqual(imageUrl)
  })

  it("should display institution name with link to company's website", () => {
    const name = 'Some cool name'
    const website = 'https://example.org/'
    const institution = new Organization({
      name,
      imageSrc: 'https://example.org/logo.png',
      website: new URL(website),
    })
    setEducationItem(fixture, { institution })

    const titleElement = fixture.debugElement.query(
      byTestId('institution-name'),
    )

    expect(textContent(titleElement)).toEqual(name)
  })

  describe('when name is long and there is short name', () => {
    it('should display short name instead', () => {
      const name = 'Very very very very very very very very long name'
      const shortName = 'VLN'
      setEducationItem(fixture, {
        institution: new Organization({
          name,
          imageSrc: 'https://example.org',
          shortName,
        }),
      })

      const institutionNameElement = fixture.debugElement.query(
        byTestId('institution-name'),
      )

      expect(textContent(institutionNameElement)).toEqual(shortName)
    })
  })

  it('should display area', () => {
    const area = 'some study area'
    setEducationItem(fixture, { area })

    const areaElement = fixture.debugElement.query(byTestId('area'))

    expect(areaElement).toBeTruthy()
    expect(textContent(areaElement)).toEqual(area)
  })

  it('should display study type', () => {
    const studyType = 'Some study type'
    setEducationItem(fixture, { studyType })

    const studyTypeElement = fixture.debugElement.query(byTestId('study-type'))

    expect(studyTypeElement).toBeTruthy()
    expect(textContent(studyTypeElement)).toEqual(studyType)
  })

  it('should display date range component', () => {
    setEducationItem(fixture)

    expect(
      fixture.debugElement.query(byComponent(DateRangeComponent)),
    ).toBeTruthy()
  })

  describe('when cum laude attribute is not set', () => {
    it('should not display its attribute', () => {
      setEducationItem(fixture, { cumLaude: false })

      expect(
        fixture.debugElement.query(byTestId(Attribute.CumLaude)),
      ).toBeFalsy()
    })
  })

  describe('when cum laude attribute is set', () => {
    it('should display its attribute', () => {
      setEducationItem(fixture, { cumLaude: true })

      expect(
        fixture.debugElement.query(byTestId(Attribute.CumLaude)),
      ).toBeTruthy()
    })
  })

  shouldContainComponent(() => fixture, ChippedContentComponent)
})

function makeSut() {
  return componentTestSetup(EducationItemComponent, {
    imports: [
      EducationItemComponent,
      NgIf,
      TestIdDirective,
      LinkComponent,
      MockComponents(
        CardComponent,
        DateRangeComponent,
        CardHeaderImageComponent,
        CardHeaderTitleComponent,
        CardHeaderSubtitleComponent,
        CardHeaderDetailComponent,
        CardHeaderComponent,
        CardHeaderTextsComponent,
        CardHeaderAttributesComponent,
        AttributeComponent,
        ChippedContentComponent,
      ),
    ],
  })
}

function setEducationItem(
  fixture: ComponentFixture<EducationItemComponent>,
  overrides?: ItemFactoryOverrides<typeof EducationItem>,
): void {
  fixture.componentInstance.item = makeEducationItem(overrides)

  fixture.detectChanges()
}
