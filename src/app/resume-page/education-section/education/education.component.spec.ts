import { ComponentFixture } from '@angular/core/testing'

import { ATTRIBUTE, EducationComponent } from './education.component'
import { Education } from '../../data/education'
import { By } from '@angular/platform-browser'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { MockComponents } from 'ng-mocks'
import { CardComponent } from '../../card/card.component'
import { CardHeaderImageComponent } from '../../card/card-header/card-header-image/card-header-image.component'
import { CardHeaderDetailComponent } from '../../card/card-header/card-header-detail/card-header-detail.component'
import { byTestId } from '@/test/helpers/test-id'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { CardHeaderTextsComponent } from '../../card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderAttributesComponent } from '../../card/card-header/card-header-attributes/card-header-attributes.component'
import { AttributeComponent } from '../../attribute/attribute.component'
import { ChippedContentComponent } from '../../chipped-content/chipped-content.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { makeEducation } from '../../data/__tests__/make-education'
import { getComponentInstance } from '@/test/helpers/get-component-instance'
import { LinkComponent } from '../../link/link.component'
import { TestIdDirective } from '@/common/test-id.directive'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('EducationComponent', () => {
  let component: EducationComponent
  let fixture: ComponentFixture<EducationComponent>

  beforeEach(() => {
    ;[fixture, component] = makeSut()
  })

  it('should create', () => {
    setEducation(fixture)

    expect(component).toBeTruthy()
  })

  it('should display institution image with link to its website', () => {
    const imageUrl = 'https://example.org/logo.png'
    const website = 'https://example.org/'
    const institution = {
      name: 'Some cool name',
      imageSrc: imageUrl,
      website: new URL(website),
    }
    setEducation(fixture, { institution })

    // noinspection DuplicatedCode
    const anchorElement = fixture.debugElement
      .query(byTestId('image'))
      .query(By.css('a'))

    expect(anchorElement).toBeTruthy()
    expect(anchorElement.attributes['href']).toEqual(website)

    const imageElement = anchorElement.query(
      By.directive(CardHeaderImageComponent),
    )

    expect(imageElement).toBeTruthy()
    expect(
      getComponentInstance(imageElement, CardHeaderImageComponent).src,
    ).toEqual(imageUrl)
  })

  it("should display institution name with link to company's website", () => {
    const name = 'Some cool name'
    const website = 'https://example.org/'
    const institution = {
      name,
      imageSrc: 'https://example.org/logo.png',
      website: new URL(website),
    }
    setEducation(fixture, { institution })

    const titleElement = fixture.debugElement.query(
      byTestId('institution-name'),
    )

    expect(textContent(titleElement)).toEqual(name)
  })

  describe('when name is long and there is short name', () => {
    it('should display short name instead', () => {
      const name = 'Very very very very very very very very long name'
      const shortName = 'VLN'
      setEducation(fixture, {
        institution: {
          name,
          imageSrc: 'https://example.org',
          shortName,
        },
      })

      const institutionNameElement = fixture.debugElement.query(
        byTestId('institution-name'),
      )

      expect(textContent(institutionNameElement)).toEqual(shortName)
    })
  })

  it('should display study type and area', () => {
    const studyType = 'Some study type'
    const area = 'some study area'
    setEducation(fixture, { studyType, area })

    const studyTypeAndAreaElement = fixture.debugElement.query(By.css('h4'))

    expect(studyTypeAndAreaElement).toBeTruthy()
    expect(textContent(studyTypeAndAreaElement)).toEqual(
      `${studyType} - ${area}`,
    )
  })

  it('should display date range component', () => {
    setEducation(fixture)

    expect(
      fixture.debugElement.query(By.directive(DateRangeComponent)),
    ).toBeTruthy()
  })

  describe('when cum laude attribute is not set', () => {
    it('should not display its attribute', () => {
      setEducation(fixture, { isCumLaude: false })

      expect(
        fixture.debugElement.query(byTestId(ATTRIBUTE.CumLaude)),
      ).toBeFalsy()
    })
  })

  describe('when cum laude attribute is set', () => {
    it('should display its attribute', () => {
      setEducation(fixture, { isCumLaude: true })

      expect(
        fixture.debugElement.query(byTestId(ATTRIBUTE.CumLaude)),
      ).toBeTruthy()
    })
  })
})

function makeSut() {
  return componentTestSetup(EducationComponent, {
    imports: [
      TestIdDirective,
      LinkComponent,
      MockComponents(
        CardComponent,
        CardHeaderImageComponent,
        CardHeaderDetailComponent,
        CardHeaderComponent,
        CardHeaderTextsComponent,
        CardHeaderAttributesComponent,
        DateRangeComponent,
        AttributeComponent,
        ChippedContentComponent,
      ),
    ],
  })
}

function setEducation(
  fixture: ComponentFixture<EducationComponent>,
  overrides?: Partial<Education>,
): void {
  setFixtureInputsAndDetectChanges(fixture, {
    education: makeEducation(overrides),
  })
}
