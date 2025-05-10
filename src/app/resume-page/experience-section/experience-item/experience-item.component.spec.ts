import { ComponentFixture } from '@angular/core/testing'
import { ATTRIBUTE, ExperienceItemComponent } from './experience-item.component'
import { ExperienceItem } from './experience-item'
import { By } from '@angular/platform-browser'
import { Organization } from '../../organization'
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
import { ChippedContentComponent } from '../../chipped-content/chipped-content.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { makeExperienceItem } from './__tests__/make-experience-item'
import { ItemFactoryOverrides } from '@/test/helpers/make-item-factory'
import { getComponentInstance } from '@/test/helpers/get-component-instance'
import { LinkComponent } from '../../link/link.component'
import { TestIdDirective } from '@/common/test-id.directive'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('ExperienceItem', () => {
  let component: ExperienceItemComponent
  let fixture: ComponentFixture<ExperienceItemComponent>

  beforeEach(() => {
    ;[fixture, component] = makeSut()
  })

  it('should create', () => {
    setExperienceItem(fixture)

    expect(component).toBeTruthy()
  })

  describe('company', () => {
    it("should display company image with link to company's website", () => {
      const website = 'https://example.org/'
      const imageUrl = 'https://example.org/logo.png'
      setExperienceItem(fixture, {
        company: new Organization({
          name: 'Company name',
          imageSrc: imageUrl,
          website: new URL(website),
        }),
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
      setExperienceItem(fixture, {
        company: new Organization({
          name,
          imageSrc: 'https://example.org/logo.png',
          website: new URL(website),
        }),
      })

      const titleElement = fixture.debugElement.query(byTestId('company-name'))

      expect(textContent(titleElement)).toEqual(name)
    })
  })

  describe('position', () => {
    it('should display position', () => {
      const position = 'Sample position'
      setExperienceItem(fixture, {
        position,
      })

      const positionElement = fixture.debugElement.query(byTestId('position'))

      expect(positionElement).toBeTruthy()
      expect(textContent(positionElement)).toEqual(position)
    })
  })

  describe('dates', () => {
    it('should display date range component', () => {
      setExperienceItem(fixture)

      const dateRangeElement = fixture.debugElement.query(
        By.directive(DateRangeComponent),
      )

      expect(dateRangeElement).toBeTruthy()
    })
  })

  describe('attributes', () => {
    function testShouldNotDisplayItsAttribute(
      fixtureGetter: () => ComponentFixture<ExperienceItemComponent>,
      attribute: (typeof ATTRIBUTE)[keyof typeof ATTRIBUTE],
    ) {
      it('should not display its attribute', () => {
        const fixture = fixtureGetter()

        const attributeElement = fixture.debugElement.query(byTestId(attribute))

        expect(attributeElement).toBeFalsy()
      })
    }

    function testShouldDisplayItsAttribute(
      fixtureGetter: () => ComponentFixture<ExperienceItemComponent>,
      attribute: (typeof ATTRIBUTE)[keyof typeof ATTRIBUTE],
    ) {
      it('should display its attribute', () => {
        const fixture = fixtureGetter()

        const attributeElement = fixture.debugElement.query(byTestId(attribute))

        expect(attributeElement).toBeTruthy()
      })
    }

    describe('when experience is not freelance, therefore it was employee', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { isFreelance: false })
      })

      testShouldDisplayItsAttribute(() => fixture, ATTRIBUTE.Employee)
    })

    describe('when experience is freelance', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { isFreelance: true })
      })

      testShouldDisplayItsAttribute(() => fixture, ATTRIBUTE.Freelance)
    })

    describe('when experience is not an internship', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { isInternship: false })
      })

      testShouldNotDisplayItsAttribute(() => fixture, ATTRIBUTE.Internship)
    })

    describe('when experience is an internship', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { isInternship: true })
      })

      testShouldDisplayItsAttribute(() => fixture, ATTRIBUTE.Internship)
    })

    describe('when experience contained no promotions', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { hasPromotions: false })
      })

      testShouldNotDisplayItsAttribute(() => fixture, ATTRIBUTE.Promotions)
    })

    describe('when experience contained promotions', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { hasPromotions: true })
      })

      testShouldDisplayItsAttribute(() => fixture, ATTRIBUTE.Promotions)
    })

    describe('when experience contained no more positions', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { hasMorePositions: false })
      })

      testShouldNotDisplayItsAttribute(() => fixture, ATTRIBUTE.MorePositions)
    })

    describe('when experience contained more positions', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { hasMorePositions: true })
      })

      testShouldDisplayItsAttribute(() => fixture, ATTRIBUTE.MorePositions)
    })
  })
})
function makeSut() {
  return componentTestSetup(ExperienceItemComponent, {
    imports: [
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
        ChippedContentComponent,
      ),
    ],
  })
}

function setExperienceItem(
  fixture: ComponentFixture<ExperienceItemComponent>,
  overrides?: ItemFactoryOverrides<typeof ExperienceItem>,
) {
  setFixtureInputsAndDetectChanges(fixture, {
    item: makeExperienceItem(overrides),
  })
}
