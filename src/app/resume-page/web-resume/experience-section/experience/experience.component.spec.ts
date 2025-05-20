import { ComponentFixture } from '@angular/core/testing'
import { ExperienceComponent } from './experience.component'
import { By } from '@angular/platform-browser'
import { DateRangeComponent } from '../../../date-range/date-range.component'
import { MockComponents } from 'ng-mocks'
import { CardComponent } from '@/common/card/card.component'
import { CardHeaderImageComponent } from '@/common/card/card-header/card-header-image/card-header-image.component'
import { CardHeaderDetailComponent } from '@/common/card/card-header/card-header-detail/card-header-detail.component'
import { byTestId } from '@/test/helpers/test-id'
import { CardHeaderComponent } from '@/common/card/card-header/card-header.component'
import { CardHeaderTextsComponent } from '@/common/card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderAttributesComponent } from '@/common/card/card-header/card-header-attributes/card-header-attributes.component'
import { AttributeComponent } from '../../attribute/attribute.component'
import { ChippedContentComponent } from '@/common/chipped-content/chipped-content.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { makeExperience } from '../../../data/__tests__/make-experience'
import { getComponentInstance } from '@/test/helpers/get-component-instance'
import { LinkComponent } from '../../../link/link.component'
import { TestIdDirective } from '@/common/test-id.directive'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'
import { TAG_TO_ATTRIBUTE } from './tags'
import { Experience } from '../../../data/experience'

describe('ExperienceComponent', () => {
  let component: ExperienceComponent
  let fixture: ComponentFixture<ExperienceComponent>

  beforeEach(() => {
    ;[fixture, component] = makeSut()
  })

  it('should create', () => {
    setExperience(fixture)

    expect(component).toBeTruthy()
  })

  describe('company', () => {
    it("should display company image with link to company's website", () => {
      const website = 'https://example.org/'
      const imageUrl = 'https://example.org/logo.png'
      setExperience(fixture, {
        company: {
          name: 'Company name',
          imageSrc: imageUrl,
          website: new URL(website),
        },
      })

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
      ).toBe(imageUrl)
    })

    it('should display company name', () => {
      const name = 'Sample company name'
      const website = 'https://example.org/'
      setExperience(fixture, {
        company: {
          name,
          imageSrc: 'https://example.org/logo.png',
          website: new URL(website),
        },
      })

      const titleElement = fixture.debugElement.query(byTestId('company-name'))

      expect(textContent(titleElement)).toEqual(name)
    })
  })

  describe('position', () => {
    it('should display position', () => {
      const position = 'Sample position'
      setExperience(fixture, {
        position,
      })

      const positionElement = fixture.debugElement.query(byTestId('position'))

      expect(positionElement).toBeTruthy()
      expect(textContent(positionElement)).toEqual(position)
    })
  })

  describe('dates', () => {
    it('should display date range component', () => {
      setExperience(fixture)

      const dateRangeElement = fixture.debugElement.query(
        By.directive(DateRangeComponent),
      )

      expect(dateRangeElement).toBeTruthy()
    })
  })

  it('should map tags to attributes', () => {
    const tags = ['freelance', 'internship', 'more-positions', 'promotions']
    setExperience(fixture, { tags })

    const attributeElements = fixture.debugElement.queryAll(
      By.directive(AttributeComponent),
    )

    expect(attributeElements.length)
      .withContext('same attributes count as tags')
      .toEqual(tags.length)

    attributeElements.forEach((attributeElement, index) => {
      const tag = tags[index]

      expect(
        getComponentInstance(attributeElement, AttributeComponent).symbol,
      ).toEqual(TAG_TO_ATTRIBUTE[tag].symbol)

      expect(textContent(attributeElement)).toEqual(TAG_TO_ATTRIBUTE[tag].text)
    })
  })

  it('should not display unknown tags', () => {
    const tags = ['unknown-42']

    setExperience(fixture, { tags })

    expect(
      fixture.debugElement.queryAll(By.directive(AttributeComponent)).length,
    ).toBe(0)
  })
})
function makeSut() {
  return componentTestSetup(ExperienceComponent, {
    imports: [
      LinkComponent,
      TestIdDirective,
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

function setExperience(
  fixture: ComponentFixture<ExperienceComponent>,
  overrides?: Partial<Experience>,
) {
  setFixtureInputsAndDetectChanges(fixture, {
    experience: makeExperience(overrides),
  })
}
