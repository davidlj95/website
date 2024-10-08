import { ComponentFixture } from '@angular/core/testing'
import { Attribute, ExperienceItemComponent } from './experience-item.component'
import { ExperienceItem } from './experience-item'
import { NgIf } from '@angular/common'
import { By } from '@angular/platform-browser'
import { Organization } from '../../organization'
import { shouldContainComponent } from '@/test/helpers/component-testers'
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
import { byComponent } from '@/test/helpers/component-query-predicates'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { makeExperienceItem } from './__tests__/make-experience-item'
import { ItemFactoryOverrides } from '@/test/helpers/make-item-factory'
import { getComponentInstance } from '@/test/helpers/get-component-instance'

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
        byComponent(CardHeaderImageComponent),
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
      expect(titleElement.nativeElement.textContent.trim()).toEqual(name)
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
      expect(positionElement.nativeElement.textContent.trim()).toEqual(position)
    })
  })
  describe('dates', () => {
    it('should display date range component', () => {
      setExperienceItem(fixture)

      const dateRangeElement = fixture.debugElement.query(
        byComponent(DateRangeComponent),
      )
      expect(dateRangeElement).toBeTruthy()
    })
  })
  describe('attributes', () => {
    function testShouldNotDisplayItsAttribute(
      fixtureGetter: () => ComponentFixture<ExperienceItemComponent>,
      attribute: Attribute,
    ) {
      it('should not display its attribute', () => {
        const fixture = fixtureGetter()

        const attributeElement = fixture.debugElement.query(byTestId(attribute))
        expect(attributeElement).toBeFalsy()
      })
    }

    function testShouldDisplayItsAttribute(
      fixtureGetter: () => ComponentFixture<ExperienceItemComponent>,
      attribute: Attribute,
    ) {
      it('should display its attribute', () => {
        const fixture = fixtureGetter()

        const attributeElement = fixture.debugElement.query(byTestId(attribute))
        expect(attributeElement).toBeTruthy()
      })
    }

    describe('when experience is not freelance, therefore it was employee', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { freelance: false })
      })

      testShouldDisplayItsAttribute(() => fixture, Attribute.Employee)
    })

    describe('when experience is freelance', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { freelance: true })
      })

      testShouldDisplayItsAttribute(() => fixture, Attribute.Freelance)
    })

    describe('when experience is not an internship', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { internship: false })
      })

      testShouldNotDisplayItsAttribute(() => fixture, Attribute.Internship)
    })

    describe('when experience is an internship', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { internship: true })
      })

      testShouldDisplayItsAttribute(() => fixture, Attribute.Internship)
    })

    describe('when experience contained no promotions', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { promotions: false })
      })

      testShouldNotDisplayItsAttribute(() => fixture, Attribute.Promotions)
    })

    describe('when experience contained promotions', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { promotions: true })
      })

      testShouldDisplayItsAttribute(() => fixture, Attribute.Promotions)
    })

    describe('when experience contained no more positions', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { morePositions: false })
      })

      testShouldNotDisplayItsAttribute(() => fixture, Attribute.MorePositions)
    })

    describe('when experience contained more positions', () => {
      beforeEach(() => {
        setExperienceItem(fixture, { morePositions: true })
      })

      testShouldDisplayItsAttribute(() => fixture, Attribute.MorePositions)
    })
  })

  shouldContainComponent(() => fixture, ChippedContentComponent)
})
function makeSut() {
  return componentTestSetup(ExperienceItemComponent, {
    imports: [
      ExperienceItemComponent,
      NgIf,
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

function setExperienceItem(
  fixture: ComponentFixture<ExperienceItemComponent>,
  overrides?: ItemFactoryOverrides<typeof ExperienceItem>,
) {
  fixture.componentInstance.item = makeExperienceItem(overrides)
  fixture.detectChanges()
}
