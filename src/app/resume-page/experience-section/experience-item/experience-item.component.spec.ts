import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing'
import { Attribute, ExperienceItemComponent } from './experience-item.component'
import { ExperienceItem } from './experience-item'
import { NgIf, NgOptimizedImage } from '@angular/common'
import { By } from '@angular/platform-browser'
import { Organization } from '../../organization'
import { DateRange } from '../../date-range/date-range'
import { shouldContainComponent } from '@test/helpers/component-testers'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { MockComponents } from 'ng-mocks'
import { CardComponent } from '../../card/card.component'
import { CardHeaderImageComponent } from '../../card/card-header/card-header-image/card-header-image.component'
import { LinkComponent } from '../../link/link.component'
import { CardHeaderTitleComponent } from '../../card/card-header/card-header-title/card-header-title.component'
import { CardHeaderSubtitleComponent } from '../../card/card-header/card-header-subtitle/card-header-subtitle.component'
import { CardHeaderDetailComponent } from '../../card/card-header/card-header-detail/card-header-detail.component'
import { byTestId } from '@test/helpers/test-id'
import { TestIdDirective } from '@common/test-id.directive'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { CardHeaderTextsComponent } from '../../card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderAttributesComponent } from '../../card/card-header/card-header-attributes/card-header-attributes.component'
import { AttributeComponent } from '../../attribute/attribute.component'
import { ChipComponent } from '../../chip/chip.component'
import { ChippedContentComponent } from '../../chipped-content/chipped-content.component'
import { ExperienceItemSummaryComponent } from './experience-item-summary/experience-item-summary.component'
import { ExperienceItemHighlightsComponent } from './experience-item-highlights/experience-item-highlights.component'
import { byComponent } from '@test/helpers/component-query-predicates'

describe('ExperienceItem', () => {
  let component: ExperienceItemComponent
  let fixture: ComponentFixture<ExperienceItemComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ExperienceItemComponent,
        NgIf,
        NgOptimizedImage,
        LinkComponent,
        CardHeaderImageComponent,
        CardHeaderTitleComponent,
        CardHeaderSubtitleComponent,
        TestIdDirective,
        MockComponents(
          CardComponent,
          DateRangeComponent,
          CardHeaderDetailComponent,
          CardHeaderComponent,
          CardHeaderTextsComponent,
          CardHeaderAttributesComponent,
          AttributeComponent,
          ChipComponent,
          ChippedContentComponent,
        ),
      ],
    })
    fixture = TestBed.createComponent(ExperienceItemComponent)
    component = fixture.componentInstance
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

      const imageElement = anchorElement.query(By.css('img'))
      expect(imageElement).toBeTruthy()
      expect(imageElement.attributes['src']).toEqual(imageUrl)
    })

    it("should display company name with link to company's website", () => {
      const name = 'Sample company name'
      const website = 'https://example.org/'
      setExperienceItem(fixture, {
        company: new Organization({
          name,
          imageSrc: 'https://example.org/logo.png',
          website: new URL(website),
        }),
      })

      const anchorElement = fixture.debugElement
        .query(byTestId('company-name'))
        .query(By.css('a'))
      expect(anchorElement).toBeTruthy()
      expect(anchorElement.attributes['href']).toEqual(website)

      expect(anchorElement.nativeElement.textContent.trim()).toEqual(name)
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

  describe('when experience has summary', () => {
    const summary = 'sample summary'
    beforeEach(() => {
      setExperienceItem(fixture, { summary })
    })

    it('should generate its content item', fakeAsync(() => {
      const summaryContent = component.contents.find(
        (content) => content.component === ExperienceItemSummaryComponent,
      )
      expect(summaryContent).toBeTruthy()
      expect(summaryContent?.inputs).toEqual({ summary })
    }))
  })

  describe('when experience has highlights', () => {
    const highlights = ['Sample highlight 1', 'Sample highlight 2']
    beforeEach(() => {
      setExperienceItem(fixture, { highlights })
    })

    it('should generate its content item', fakeAsync(() => {
      const highlightContent = component.contents.find(
        (content) => content.component === ExperienceItemHighlightsComponent,
      )
      expect(highlightContent).toBeTruthy()
      expect(highlightContent!.inputs).toEqual({ highlights })
    }))
  })

  describe('when content is displayed', () => {
    const summary = 'summary'
    beforeEach(() => {
      setExperienceItem(fixture, { summary })

      const chippedContentElement = fixture.debugElement.query(
        byComponent(ChippedContentComponent),
      )
      expect(chippedContentElement).toBeTruthy()
      chippedContentElement.triggerEventHandler('contentDisplayedChange', true)
      fixture.detectChanges()
    })

    it('should add the expanded class to the element', () => {
      expect(
        fixture.debugElement.classes[ExperienceItemComponent.EXPANDED_CLASS],
      ).toBeTrue()
    })
  })
  describe('when content is removed', () => {
    const summary = 'summary'
    beforeEach(() => {
      setExperienceItem(fixture, { summary })

      const chippedContentElement = fixture.debugElement.query(
        byComponent(ChippedContentComponent),
      )
      expect(chippedContentElement).toBeTruthy()
      chippedContentElement.triggerEventHandler('contentDisplayedChange', false)
      fixture.detectChanges()
    })

    it('should remove the expanded class to the element', () => {
      expect(
        fixture.debugElement.classes[ExperienceItemComponent.EXPANDED_CLASS],
      ).toBeFalsy()
    })
  })
})

function setExperienceItem(
  fixture: ComponentFixture<ExperienceItemComponent>,
  newItemArgOverrides?: Partial<
    ConstructorParameters<typeof ExperienceItem>[0]
  >,
) {
  fixture.componentInstance.item = new ExperienceItem({
    company: new Organization({
      name: 'Fake company',
      imageSrc: 'https://fakeCompany.example.com/logo.jpg',
    }),
    summary: 'Fake summary',
    position: 'Fake position',
    dateRange: new DateRange(new Date('2023-01-01'), new Date('2023-10-10')),
    ...newItemArgOverrides,
  })
  fixture.detectChanges()
}
