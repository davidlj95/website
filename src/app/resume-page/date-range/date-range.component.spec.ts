import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DateRangeComponent } from './date-range.component'
import { By } from '@angular/platform-browser'
import { DateRange } from '../data/date-range'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('DateRangeComponent', () => {
  let component: DateRangeComponent
  let fixture: ComponentFixture<DateRangeComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({})
    fixture = TestBed.createComponent(DateRangeComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  function setRangeAndDetectChanges(range: DateRange) {
    setFixtureInputsAndDetectChanges(fixture, { range })
  }

  const [structuredStartDate, humanStartDate] = ['2022-10', 'Oct 2022']
  const [structuredEndDate, humanEndDate] = ['2023-04', 'Apr 2023']
  const startDate = new Date(`${structuredStartDate}-10`)
  const endDate = new Date(`${structuredEndDate}-15`)

  it('should display start and end date formatted as month abbreviation and separated in some way', () => {
    setRangeAndDetectChanges(new DateRange(startDate, endDate))

    expect(textContent(fixture.debugElement)?.replaceAll('\n', ' ')).toEqual(
      `${humanStartDate} → ${humanEndDate}`,
    )
  })

  const endDateSelector = By.css('time:last-child')

  it('should specify proper datetime attribute in time elements', () => {
    setRangeAndDetectChanges(new DateRange(startDate, endDate))

    const startDateTimeElement = fixture.debugElement.query(
      By.css('time:first-child'),
    )

    expect(startDateTimeElement.attributes['datetime']).toEqual(
      structuredStartDate,
    )

    const endDateTimeElement = fixture.debugElement.query(endDateSelector)

    expect(endDateTimeElement.attributes['datetime']).toEqual(structuredEndDate)
  })

  describe('when no end date exists', () => {
    beforeEach(() => {
      setRangeAndDetectChanges(new DateRange(new Date()))
    })

    it('should display present as end date', () => {
      const endDateElement = fixture.debugElement.query(endDateSelector)

      expect(endDateElement).withContext('end date element exists').toBeTruthy()
      expect(textContent(endDateElement))
        .withContext('end date is present')
        .toEqual('Present')
    })
  })
})
