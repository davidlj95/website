import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DateRangeComponent } from './date-range.component'
import { By } from '@angular/platform-browser'
import { DateRange } from './date-range'

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
    component.range = range
    fixture.detectChanges()
  }

  it('should display start date formatted as month abbreviation and year', () => {
    const sampleStartDate = new Date('2022-10-10')
    const expectedFormattedStartDate = 'Oct 2022'
    setRangeAndDetectChanges(new DateRange(sampleStartDate))

    const startDateElement = fixture.debugElement.query(By.css('.start'))
    expect(startDateElement)
      .withContext('start date element exists')
      .toBeTruthy()
    expect(startDateElement.nativeElement.textContent.trim())
      .withContext('start date is displayed with proper format')
      .toEqual(expectedFormattedStartDate)
  })

  it('should display separator', () => {
    setRangeAndDetectChanges(new DateRange(new Date()))

    const separatorElement = fixture.debugElement.query(By.css('.separator'))
    expect(separatorElement)
      .withContext('separator element exists')
      .toBeTruthy()
  })

  describe('when no end date exists', () => {
    beforeEach(() => {
      setRangeAndDetectChanges(new DateRange(new Date()))
    })

    it('should display present as end date', () => {
      const endDateElement = fixture.debugElement.query(By.css('.end'))
      expect(endDateElement).withContext('end date element exists').toBeTruthy()
      expect(endDateElement.nativeElement.textContent.trim())
        .withContext('end date is present')
        .toEqual('Present')
    })
  })
  describe('when end date exists', () => {
    const sampleRange = new DateRange(
      new Date('2023-12-31'),
      new Date('2024-01-01'),
    )
    const expectedFormattedEndDate = 'Jan 2024'

    beforeEach(() => {
      setRangeAndDetectChanges(sampleRange)
    })
    it('should display end date formatted as month abbreviation and year', () => {
      const endDateElement = fixture.debugElement.query(By.css('.end'))
      expect(endDateElement).withContext('end date element exists').toBeTruthy()
      expect(endDateElement.nativeElement.textContent.trim())
        .withContext('end date is displayed with proper format')
        .toEqual(expectedFormattedEndDate)
    })
  })
})
