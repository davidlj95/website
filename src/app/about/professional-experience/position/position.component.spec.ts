import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  HIGHLIGHT_CONTENT_TYPE,
  PositionComponent,
  SUMMARY_CONTENT_TYPE,
} from './position.component'
import { Company, Position } from './position'
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

describe('PositionComponent', () => {
  let component: PositionComponent
  let fixture: ComponentFixture<PositionComponent>
  const newPositionArgs: ConstructorParameters<typeof Position>[0] = {
    company: new Company({
      name: 'Fake company',
      image: new URL('https://fakeCompany.example.com/logo.jpg'),
      website: new URL('https://fake.example.org'),
    }),
    summary: 'Fake summary',
    role: 'Fake role',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-10-10'),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PositionComponent],
      imports: [NgOptimizedImage, NoopAnimationsModule],
    })
    fixture = TestBed.createComponent(PositionComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('company', () => {
    it("should display company image with link to company's website", () => {
      const fakePosition = new Position(newPositionArgs)
      component.position = fakePosition
      fixture.detectChanges()

      const imageContainerElement = fixture.debugElement.query(By.css('.image'))
      expect(imageContainerElement)
        .withContext('company image container exists')
        .toBeTruthy()

      const anchorElement = imageContainerElement.query(By.css('a'))
      expect(anchorElement).withContext('link exists').toBeTruthy()
      expect(anchorElement.attributes['href'])
        .withContext('link points to company website')
        .toEqual(fakePosition.company.website.toString())

      const imageElement = anchorElement.query(By.css('img'))
      expect(imageElement).withContext('image exists').toBeTruthy()
      expect(imageElement.attributes['src'])
        .withContext('image source points to company image')
        .toEqual(fakePosition.company.image.toString())
    })

    it("should display company name with link to company's website", () => {
      const fakePosition = new Position(newPositionArgs)
      component.position = fakePosition
      fixture.detectChanges()

      const companyElement = fixture.debugElement.query(By.css('.company'))
      expect(companyElement)
        .withContext('company name container element exists')
        .toBeTruthy()

      const anchorElement = companyElement.query(By.css('a'))
      expect(anchorElement).withContext('link exists').toBeTruthy()
      expect(anchorElement.attributes['href'])
        .withContext('link points to company website')
        .toEqual(fakePosition.company.website.toString())
      expect(anchorElement.nativeElement.textContent.trim()).toEqual(
        fakePosition.company.name,
      )
    })
  })
  describe('role', () => {
    it('should display role', () => {
      const fakePosition = new Position(newPositionArgs)
      component.position = fakePosition
      fixture.detectChanges()

      const roleElement = fixture.debugElement.query(By.css('.role'))
      expect(roleElement).withContext('role exists').toBeTruthy()
      expect(roleElement.nativeElement.textContent.trim())
        .withContext('role contains position role')
        .toEqual(fakePosition.role)
    })
  })
  describe('dates', () => {
    it('should display start date', () => {
      const fakeStartDate = '2022-10-10'
      const fakeStartDateFormatted = 'Oct 2022'
      component.position = new Position({
        ...newPositionArgs,
        startDate: new Date(fakeStartDate),
      })
      fixture.detectChanges()

      const datesElement = fixture.debugElement.query(By.css('.dates'))
      expect(datesElement).withContext('dates container exists').toBeTruthy()

      const startDateElement = datesElement.query(By.css('.start'))
      expect(startDateElement)
        .withContext('start date element exists')
        .toBeTruthy()
      expect(startDateElement.nativeElement.textContent.trim())
        .withContext('start date is displayed with proper format')
        .toEqual(fakeStartDateFormatted)
    })
    it('should display separator', () => {
      component.position = new Position({ ...newPositionArgs })
      fixture.detectChanges()

      const datesElement = fixture.debugElement.query(By.css('.dates'))
      expect(datesElement).withContext('dates container exists').toBeTruthy()

      const separatorElement = datesElement.query(By.css('.separator'))
      expect(separatorElement)
        .withContext('separator element exists')
        .toBeTruthy()
    })
    describe('when no end date exists', () => {
      beforeEach(() => {
        component.position = new Position({
          ...newPositionArgs,
          endDate: undefined,
        })
        fixture.detectChanges()
      })
      it('should display present as end date', () => {
        const datesElement = fixture.debugElement.query(By.css('.dates'))
        expect(datesElement).withContext('dates container exists').toBeTruthy()

        const endDateElement = datesElement.query(By.css('.end'))
        expect(endDateElement)
          .withContext('end date element exists')
          .toBeTruthy()
        expect(endDateElement.nativeElement.textContent.trim())
          .withContext('end date is present')
          .toEqual('Present')
      })
    })
    describe('when end date exists', () => {
      const fakeEndDate = '2024-01-01'
      const fakeEndDateFormatted = 'Jan 2024'

      beforeEach(() => {
        component.position = new Position({
          ...newPositionArgs,
          endDate: new Date(fakeEndDate),
        })
        fixture.detectChanges()
      })
      it('should display end date', () => {
        const datesElement = fixture.debugElement.query(By.css('.dates'))
        expect(datesElement).withContext('dates container exists').toBeTruthy()

        const endDateElement = datesElement.query(By.css('.end'))
        expect(endDateElement)
          .withContext('end date element exists')
          .toBeTruthy()
        expect(endDateElement.nativeElement.textContent.trim())
          .withContext('end date is displayed with proper format')
          .toEqual(fakeEndDateFormatted)
      })
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

    describe('when position is not freelance', () => {
      let fakePosition: Position
      let attributeElement: DebugElement

      beforeEach(() => {
        fakePosition = new Position({
          ...newPositionArgs,
          freelance: false,
        })
        component.position = fakePosition
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

    describe('when position is freelance', () => {
      let fakePosition: Position
      let attributeElement: DebugElement

      beforeEach(() => {
        fakePosition = new Position({
          ...newPositionArgs,
          freelance: true,
        })

        component.position = fakePosition
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

    describe('when position is not an internship', () => {
      let fakePosition: Position
      let attributeElement: DebugElement

      beforeEach(() => {
        fakePosition = new Position({
          ...newPositionArgs,
          internship: false,
        })

        component.position = fakePosition
        fixture.detectChanges()

        attributeElement = fixture.debugElement.query(By.css('.internship'))
      })

      testShouldNotDisplayAttribute(() => attributeElement)
    })

    describe('when position is an internship', () => {
      let fakePosition: Position
      let attributeElement: DebugElement

      beforeEach(() => {
        fakePosition = new Position({
          ...newPositionArgs,
          internship: true,
        })

        component.position = fakePosition
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

    describe('when position contained no promotions', () => {
      let fakePosition: Position
      let attributeElement: DebugElement

      beforeEach(() => {
        fakePosition = new Position({
          ...newPositionArgs,
          promotions: false,
        })

        component.position = fakePosition
        fixture.detectChanges()

        attributeElement = fixture.debugElement.query(By.css('.promotions'))
      })

      testShouldNotDisplayAttribute(() => attributeElement)
    })

    describe('when position contained promotions', () => {
      let fakePosition: Position
      let attributeElement: DebugElement

      beforeEach(() => {
        fakePosition = new Position({
          ...newPositionArgs,
          promotions: true,
        })

        component.position = fakePosition
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

    describe('when position contained no other roles', () => {
      let fakePosition: Position
      let attributeElement: DebugElement

      beforeEach(() => {
        fakePosition = new Position({
          ...newPositionArgs,
          otherRoles: false,
        })

        component.position = fakePosition
        fixture.detectChanges()

        attributeElement = fixture.debugElement.query(By.css('.other-roles'))
      })

      testShouldNotDisplayAttribute(() => attributeElement)
    })

    describe('when position contained other roles', () => {
      let fakePosition: Position
      let attributeElement: DebugElement

      beforeEach(() => {
        fakePosition = new Position({
          ...newPositionArgs,
          otherRoles: true,
        })

        component.position = fakePosition
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
    describe('when no position', () => {
      it('should not display chips container', () => {
        const chipsElement = fixture.debugElement.query(By.css('.chips'))
        expect(chipsElement)
          .withContext("chips container doesn't exist")
          .toBeFalsy()
      })
    })
    describe('when position has summary', () => {
      let summaryChipElement: DebugElement | undefined
      const fakePosition: Position = new Position(newPositionArgs)

      beforeEach(() => {
        component.position = fakePosition
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
            fakePosition.summary,
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
    describe('when position has highlights', () => {
      let highlightsChipElement: DebugElement | undefined
      const highlights: ReadonlyArray<string> = [
        'Fake highlight 1',
        'Fake highlight 2',
      ]

      beforeEach(() => {
        component.position = new Position({
          ...newPositionArgs,
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
