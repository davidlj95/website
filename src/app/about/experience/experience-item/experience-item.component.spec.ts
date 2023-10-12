import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  ExperienceItemComponent,
  HIGHLIGHT_CONTENT_TYPE,
  SUMMARY_CONTENT_TYPE,
} from './experience-item.component'
import { ExperienceItem } from './experience-item'
import { NgOptimizedImage } from '@angular/common'
import { By } from '@angular/platform-browser'
import { MATERIAL_SYMBOLS_CLASS } from '../../../common/material-symbols'
import {
  Badge,
  More,
  School,
  ToolsLadder,
  Work,
} from '../../../material-symbols'
import { DebugElement } from '@angular/core'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Organization } from '../../organization'
import { DateRange } from '../../date-range/date-range'
import { getComponentSelector } from '../../../../test/helpers/component-testers'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { MockComponents } from 'ng-mocks'
import { CardComponent } from '../../card/card.component'
import { CardHeaderImageComponent } from '../../card/card-header-image/card-header-image.component'
import { LinkComponent } from '../../link/link.component'

describe('ExperienceItem', () => {
  let component: ExperienceItemComponent
  let fixture: ComponentFixture<ExperienceItemComponent>
  const newExperienceItemArgs: ConstructorParameters<typeof ExperienceItem>[0] =
    {
      company: new Organization({
        name: 'Fake company',
        image: new URL('https://fakeCompany.example.com/logo.jpg'),
        website: new URL('https://fake.example.org'),
      }),
      summary: 'Fake summary',
      role: 'Fake role',
      dateRange: new DateRange(new Date('2023-01-01'), new Date('2023-10-10')),
    }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExperienceItemComponent,
        MockComponents(
          CardComponent,
          LinkComponent,
          CardHeaderImageComponent,
          DateRangeComponent,
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
      component.item = new ExperienceItem(newExperienceItemArgs)
      fixture.detectChanges()

      const linkElement = fixture.debugElement.query(
        By.css(getComponentSelector(LinkComponent)),
      )
      expect(linkElement).toBeTruthy()

      const headerImageElement = linkElement.query(
        By.css(getComponentSelector(CardHeaderImageComponent)),
      )
      expect(headerImageElement).toBeTruthy()
    })

    it("should display company name with link to company's website", () => {
      const experienceItem = new ExperienceItem(newExperienceItemArgs)
      component.item = experienceItem
      fixture.detectChanges()

      const companyElement = fixture.debugElement.query(By.css('.company'))
      expect(companyElement)
        .withContext('company name container element exists')
        .toBeTruthy()

      const anchorElement = companyElement.query(By.css('a'))
      expect(anchorElement).withContext('link exists').toBeTruthy()
      expect(anchorElement.attributes['href'])
        .withContext('link points to company website')
        .toEqual(experienceItem.company.website.toString())
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

      const roleElement = fixture.debugElement.query(By.css('.role'))
      expect(roleElement).withContext('role exists').toBeTruthy()
      expect(roleElement.nativeElement.textContent.trim())
        .withContext('role contains role')
        .toEqual(experienceItem.role)
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
      expect(dateRangeElement)
        .withContext('date range element exists')
        .toBeTruthy()
    })
  })
  describe('attributes', () => {
    function testShouldNotDisplayAttribute(
      attributeElementGetter: () => DebugElement,
    ) {
      it('should not display attribute', () => {
        const attributeElement = attributeElementGetter()
        expect(attributeElement).withContext('attribute element').toBeFalsy()
      })
    }
    function testShouldDisplayItsIcon(
      attributeElementGetter: () => DebugElement,
      {
        name,
        icon,
      }: {
        name: string
        icon: string
      },
    ) {
      it(`should display its icon (${name})`, () => {
        const attributeElement = attributeElementGetter()
        expect(attributeElement)
          .withContext('attribute element exists')
          .toBeDefined()

        const iconElement = attributeElement.query(By.css('span'))
        expect(iconElement).withContext('icon exists').toBeTruthy()
        expect(iconElement.classes)
          .withContext('icon element has material symbols class')
          .toEqual(jasmine.objectContaining({ [MATERIAL_SYMBOLS_CLASS]: true }))
        expect(iconElement.nativeElement.textContent.trim())
          .withContext(`icon is ${name}`)
          .toEqual(icon)
      })
    }

    function testShouldDisplayItsTooltipWithAria(
      attributeElementGetter: () => DebugElement,
      text: jasmine.Expected<string>,
      idGetter: () => string,
    ) {
      it('should display its tooltip with its helper text and ARIA support', () => {
        const attributeElement = attributeElementGetter()
        expect(attributeElement)
          .withContext('attribute element exists')
          .toBeDefined()

        const tooltipElement = attributeElement.query(
          By.css("[role='tooltip']"),
        )
        expect(tooltipElement).withContext('tooltip exists').toBeTruthy()
        expect(tooltipElement.nativeElement.textContent.trim())
          .withContext('tooltip contains helper text')
          .toEqual(text)

        const id = idGetter()
        const iconElement = attributeElement.query(By.css('span'))
        expect(iconElement.attributes['aria-describedby'])
          .withContext('ARIA describedby points to tooltip id')
          .toEqual(id)
        expect(iconElement.attributes['tabindex'])
          .withContext('icon included in tab sequence')
          .toEqual('0')
        expect(tooltipElement.attributes['id'])
          .withContext('Tooltip has id')
          .toEqual(id)
      })
    }

    describe('when experience is not freelance', () => {
      let experienceItem: ExperienceItem
      let attributeElement: DebugElement

      beforeEach(() => {
        experienceItem = new ExperienceItem({
          ...newExperienceItemArgs,
          freelance: false,
        })
        component.item = experienceItem
        fixture.detectChanges()

        attributeElement = fixture.debugElement.query(By.css('.freelance'))
      })

      testShouldDisplayItsIcon(() => attributeElement, {
        name: 'badge',
        icon: Badge,
      })
      testShouldDisplayItsTooltipWithAria(
        () => attributeElement,
        'Employee',
        () => component.freelanceAttributeTooltipId,
      )
    })

    describe('when experience is freelance', () => {
      let experienceItem: ExperienceItem
      let attributeElement: DebugElement

      beforeEach(() => {
        experienceItem = new ExperienceItem({
          ...newExperienceItemArgs,
          freelance: true,
        })

        component.item = experienceItem
        fixture.detectChanges()

        attributeElement = fixture.debugElement.query(By.css('.freelance'))
      })

      testShouldDisplayItsIcon(() => attributeElement, {
        name: 'work',
        icon: Work,
      })
      testShouldDisplayItsTooltipWithAria(
        () => attributeElement,
        'Freelance',
        () => component.freelanceAttributeTooltipId,
      )
    })

    describe('when experience is not an internship', () => {
      let experienceItem: ExperienceItem
      let attributeElement: DebugElement

      beforeEach(() => {
        experienceItem = new ExperienceItem({
          ...newExperienceItemArgs,
          internship: false,
        })

        component.item = experienceItem
        fixture.detectChanges()

        attributeElement = fixture.debugElement.query(By.css('.internship'))
      })

      testShouldNotDisplayAttribute(() => attributeElement)
    })

    describe('when experience is an internship', () => {
      let experienceItem: ExperienceItem
      let attributeElement: DebugElement

      beforeEach(() => {
        experienceItem = new ExperienceItem({
          ...newExperienceItemArgs,
          internship: true,
        })

        component.item = experienceItem
        fixture.detectChanges()

        attributeElement = fixture.debugElement.query(By.css('.internship'))
      })

      testShouldDisplayItsIcon(() => attributeElement, {
        name: 'school',
        icon: School,
      })
      testShouldDisplayItsTooltipWithAria(
        () => attributeElement,
        'Internship',
        () => component.internshipAttributeTooltipId,
      )
    })

    describe('when experience contained no promotions', () => {
      let experienceItem: ExperienceItem
      let attributeElement: DebugElement

      beforeEach(() => {
        experienceItem = new ExperienceItem({
          ...newExperienceItemArgs,
          promotions: false,
        })

        component.item = experienceItem
        fixture.detectChanges()

        attributeElement = fixture.debugElement.query(By.css('.promotions'))
      })

      testShouldNotDisplayAttribute(() => attributeElement)
    })

    describe('when experience contained promotions', () => {
      let experienceItem: ExperienceItem
      let attributeElement: DebugElement

      beforeEach(() => {
        experienceItem = new ExperienceItem({
          ...newExperienceItemArgs,
          promotions: true,
        })

        component.item = experienceItem
        fixture.detectChanges()

        attributeElement = fixture.debugElement.query(By.css('.promotions'))
      })

      testShouldDisplayItsIcon(() => attributeElement, {
        name: 'toolsLadder',
        icon: ToolsLadder,
      })
      testShouldDisplayItsTooltipWithAria(
        () => attributeElement,
        jasmine.stringContaining('Promotions during this period'),
        () => component.promotionsAttributeTooltipId,
      )
    })

    describe('when experience contained no other roles', () => {
      let experienceItem: ExperienceItem
      let attributeElement: DebugElement

      beforeEach(() => {
        experienceItem = new ExperienceItem({
          ...newExperienceItemArgs,
          otherRoles: false,
        })

        component.item = experienceItem
        fixture.detectChanges()

        attributeElement = fixture.debugElement.query(By.css('.other-roles'))
      })

      testShouldNotDisplayAttribute(() => attributeElement)
    })

    describe('when experience contained other roles', () => {
      let experienceItem: ExperienceItem
      let attributeElement: DebugElement

      beforeEach(() => {
        experienceItem = new ExperienceItem({
          ...newExperienceItemArgs,
          otherRoles: true,
        })

        component.item = experienceItem
        fixture.detectChanges()

        attributeElement = fixture.debugElement.query(By.css('.other-roles'))
      })

      testShouldDisplayItsIcon(() => attributeElement, {
        name: 'more',
        icon: More,
      })
      testShouldDisplayItsTooltipWithAria(
        () => attributeElement,
        jasmine.stringContaining('More roles'),
        () => component.otherRolesAttributeTooltipId,
      )
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
