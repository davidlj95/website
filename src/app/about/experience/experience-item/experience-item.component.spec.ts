import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  Attribute,
  ExperienceItemComponent,
  HIGHLIGHT_CONTENT_TYPE,
  SUMMARY_CONTENT_TYPE,
} from './experience-item.component'
import { ExperienceItem } from './experience-item'
import { NgOptimizedImage } from '@angular/common'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Organization } from '../../organization'
import { DateRange } from '../../date-range/date-range'
import { getComponentSelector } from '../../../../test/helpers/component-testers'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { MockComponents } from 'ng-mocks'
import { CardComponent } from '../../card/card.component'
import { CardHeaderImageComponent } from '../../card/card-header/card-header-image/card-header-image.component'
import { LinkComponent } from '../../link/link.component'
import { CardHeaderTitleComponent } from '../../card/card-header/card-header-title/card-header-title.component'
import { CardHeaderSubtitleComponent } from '../../card/card-header/card-header-subtitle/card-header-subtitle.component'
import { CardHeaderDetailComponent } from '../../card/card-header/card-header-detail/card-header-detail.component'
import { byTestId } from '../../../../test/helpers/test-id'
import { TestIdDirective } from '../../../common/test-id.directive'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { CardHeaderTextsComponent } from '../../card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderAttributesComponent } from '../../card/card-header/card-header-attributes/card-header-attributes.component'
import { AttributeComponent } from '../../attribute/attribute.component'

describe('ExperienceItem', () => {
  let component: ExperienceItemComponent
  let fixture: ComponentFixture<ExperienceItemComponent>
  const newExperienceItemArgs: ConstructorParameters<typeof ExperienceItem>[0] =
    {
      company: new Organization({
        name: 'Fake company',
        image: new URL('https://fakeCompany.example.com/logo.jpg'),
      }),
      summary: 'Fake summary',
      position: 'Fake position',
      dateRange: new DateRange(new Date('2023-01-01'), new Date('2023-10-10')),
    }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExperienceItemComponent,
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
        ),
      ],
      imports: [NgOptimizedImage, NoopAnimationsModule],
    })
    fixture = TestBed.createComponent(ExperienceItemComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('company', () => {
    it("should display company image with link to company's website", () => {
      const companyUrl = 'https://example.org/'
      const experienceItem = new ExperienceItem({
        ...newExperienceItemArgs,
        company: new Organization({
          name: newExperienceItemArgs.company.name,
          image: new URL('https://example.org/logo.png'),
          website: new URL(companyUrl),
        }),
      })
      component.item = experienceItem
      fixture.detectChanges()

      const anchorElement = fixture.debugElement
        .query(byTestId('image'))
        .query(By.css('a'))
      expect(anchorElement).toBeTruthy()
      expect(anchorElement.attributes['href']).toEqual(companyUrl)

      const imageElement = anchorElement.query(By.css('img'))
      expect(imageElement).toBeTruthy()
      expect(imageElement.attributes['src']).toEqual(
        experienceItem.company.image.toString(),
      )
    })

    it("should display company name with link to company's website", () => {
      const companyUrl = 'https://example.org/'
      const experienceItem = new ExperienceItem({
        ...newExperienceItemArgs,
        company: new Organization({
          name: newExperienceItemArgs.company.name,
          image: new URL('https://example.org/logo.png'),
          website: new URL(companyUrl),
        }),
      })
      component.item = experienceItem
      fixture.detectChanges()

      const anchorElement = fixture.debugElement
        .query(byTestId('company-name'))
        .query(By.css('a'))
      expect(anchorElement).toBeTruthy()
      expect(anchorElement.attributes['href']).toEqual(companyUrl)

      expect(anchorElement.nativeElement.textContent.trim()).toEqual(
        experienceItem.company.name,
      )
    })
  })
  describe('role', () => {
    it('should display role', () => {
      const experienceItem = new ExperienceItem(newExperienceItemArgs)
      component.item = experienceItem
      fixture.detectChanges()

      const roleElement = fixture.debugElement.query(byTestId('role'))
      expect(roleElement).toBeTruthy()
      expect(roleElement.nativeElement.textContent.trim()).toEqual(
        experienceItem.position,
      )
    })
  })
  describe('dates', () => {
    it('should display date range component', () => {
      component.item = new ExperienceItem({
        ...newExperienceItemArgs,
      })
      fixture.detectChanges()

      const dateRangeElement = fixture.debugElement.query(
        By.css(getComponentSelector(DateRangeComponent)),
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
        component.item = new ExperienceItem({
          ...newExperienceItemArgs,
          freelance: false,
        })
        fixture.detectChanges()
      })

      testShouldDisplayItsAttribute(() => fixture, Attribute.Employee)
    })

    describe('when experience is freelance', () => {
      beforeEach(() => {
        component.item = new ExperienceItem({
          ...newExperienceItemArgs,
          freelance: true,
        })
        fixture.detectChanges()
      })

      testShouldDisplayItsAttribute(() => fixture, Attribute.Freelance)
    })

    describe('when experience is not an internship', () => {
      beforeEach(() => {
        component.item = new ExperienceItem({
          ...newExperienceItemArgs,
          internship: false,
        })
        fixture.detectChanges()
      })

      testShouldNotDisplayItsAttribute(() => fixture, Attribute.Internship)
    })

    describe('when experience is an internship', () => {
      beforeEach(() => {
        component.item = new ExperienceItem({
          ...newExperienceItemArgs,
          internship: true,
        })
        fixture.detectChanges()
      })

      testShouldDisplayItsAttribute(() => fixture, Attribute.Internship)
    })

    describe('when experience contained no promotions', () => {
      beforeEach(() => {
        component.item = new ExperienceItem({
          ...newExperienceItemArgs,
          promotions: false,
        })
        fixture.detectChanges()
      })

      testShouldNotDisplayItsAttribute(() => fixture, Attribute.Promotions)
    })

    describe('when experience contained promotions', () => {
      beforeEach(() => {
        component.item = new ExperienceItem({
          ...newExperienceItemArgs,
          promotions: true,
        })
        fixture.detectChanges()
      })

      testShouldDisplayItsAttribute(() => fixture, Attribute.Promotions)
    })

    describe('when experience contained no more positions', () => {
      beforeEach(() => {
        component.item = new ExperienceItem({
          ...newExperienceItemArgs,
          morePositions: false,
        })
        fixture.detectChanges()
      })

      testShouldNotDisplayItsAttribute(() => fixture, Attribute.MorePositions)
    })

    describe('when experience contained other positions', () => {
      beforeEach(() => {
        component.item = new ExperienceItem({
          ...newExperienceItemArgs,
          morePositions: true,
        })
        fixture.detectChanges()
      })

      testShouldDisplayItsAttribute(() => fixture, Attribute.MorePositions)
    })
  })
  describe('chipped content', () => {
    describe('when no experience', () => {
      it('should not display chips container', () => {
        const chipsElement = fixture.debugElement.query(By.css('.chips'))
        expect(chipsElement)
          .withContext("chips container doesn't exist")
          .toBeFalsy()
      })
    })
    describe('when experience has summary', () => {
      let summaryChipElement: DebugElement | undefined
      const experienceItem: ExperienceItem = new ExperienceItem(
        newExperienceItemArgs,
      )

      beforeEach(() => {
        component.item = experienceItem
        fixture.detectChanges()

        const chipsElement = fixture.debugElement.query(By.css('.chips'))
        expect(chipsElement).withContext('chips container exists').toBeTruthy()

        const chipElements = chipsElement.queryAll(By.css('.chip'))
        summaryChipElement = chipElements.find(
          (chipElement) =>
            chipElement.nativeElement.textContent.trim() ==
            SUMMARY_CONTENT_TYPE.displayName,
        )
      })

      it('should display summary chip', () => {
        expect(summaryChipElement)
          .withContext('summary chip exists')
          .toBeTruthy()
      })

      describe('when tapping on the summary chip', () => {
        beforeEach(() => {
          summaryChipElement!.triggerEventHandler('click')
          fixture.detectChanges()
        })

        it('should mark chip as active', () => {
          expect(summaryChipElement?.classes['active']).toBeTrue()
        })

        it('should display summary in contents', () => {
          const contentElement = fixture.debugElement.query(
            By.css('.content.summary'),
          )
          expect(contentElement)
            .withContext('content container exists')
            .toBeTruthy()

          expect(contentElement.nativeElement.textContent.trim()).toEqual(
            experienceItem.summary,
          )
        })

        describe('when tapping again on the summary chip', () => {
          beforeEach(() => {
            summaryChipElement!.triggerEventHandler('click')
            fixture.detectChanges()
          })

          it('should not mark chip as active', () => {
            expect(summaryChipElement?.classes['active']).toBeFalsy()
          })

          it('should not display summary in contents', () => {
            const contentElement = fixture.debugElement.query(
              By.css('.content.summary'),
            )
            expect(contentElement)
              .withContext('content container does not exist')
              .toBeFalsy()
          })
        })
      })
    })
    describe('when experience has highlights', () => {
      let highlightsChipElement: DebugElement | undefined
      const highlights: ReadonlyArray<string> = [
        'Fake highlight 1',
        'Fake highlight 2',
      ]

      beforeEach(() => {
        component.item = new ExperienceItem({
          ...newExperienceItemArgs,
          highlights,
        })
        fixture.detectChanges()

        const chipsElement = fixture.debugElement.query(By.css('.chips'))
        expect(chipsElement).withContext('chips container exists').toBeTruthy()

        const chipElements = chipsElement.queryAll(By.css('.chip'))
        highlightsChipElement = chipElements.find(
          (chipElement) =>
            chipElement.nativeElement.textContent.trim() ==
            HIGHLIGHT_CONTENT_TYPE.displayName,
        )
      })

      it('should display highlights chip', () => {
        expect(highlightsChipElement)
          .withContext('highlights chip exists')
          .toBeTruthy()
      })

      describe('when tapping on the highlights chip', () => {
        beforeEach(() => {
          highlightsChipElement!.triggerEventHandler('click')
          fixture.detectChanges()
        })

        it('should mark chip as active', () => {
          expect(highlightsChipElement?.classes['active']).toBeTrue()
        })

        it('should display highlights in contents', () => {
          const contentElement = fixture.debugElement.query(
            By.css('.content.highlights'),
          )
          expect(contentElement)
            .withContext('content container exists')
            .toBeTruthy()

          const listElements = contentElement.queryAll(By.css('li'))
          expect(listElements.length).toEqual(highlights.length)
          listElements.forEach((listElement, index) => {
            const highlight = highlights[index]
            expect(listElement.nativeElement.textContent.trim())
              .withContext(`list element ${index}`)
              .toEqual(highlight)
          })
        })
        describe('when tapping again on the highlights chip', () => {
          beforeEach(() => {
            highlightsChipElement!.triggerEventHandler('click')
            fixture.detectChanges()
          })

          it('should not mark chip as active', () => {
            expect(highlightsChipElement?.classes['active']).toBeFalsy()
          })

          it('should not display highlight in contents', () => {
            const contentElement = fixture.debugElement.query(
              By.css('.content.highlights'),
            )
            expect(contentElement)
              .withContext('content container does not exist')
              .toBeFalsy()
          })
        })
      })
    })
  })
})
