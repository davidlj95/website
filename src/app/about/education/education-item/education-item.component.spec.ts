import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EducationItemComponent } from './education-item.component'
import { EducationItem } from './education-item'
import { Organization } from '../organization'
import { By } from '@angular/platform-browser'
import { NgOptimizedImage } from '@angular/common'

describe('EducationItemComponent', () => {
  let component: EducationItemComponent
  let fixture: ComponentFixture<EducationItemComponent>
  const newEducationItemArgs: ConstructorParameters<typeof EducationItem>[0] = {
    institution: new Organization({
      name: 'Fake institution',
      image: new URL('https://fake.example.org/logo.png'),
      website: new URL('https://fake.example.org'),
    }),
    area: 'Fake area',
    studyType: 'Fake study type',
    score: 'Fake score',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-10-10'),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationItemComponent],
      imports: [NgOptimizedImage],
    })
    fixture = TestBed.createComponent(EducationItemComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('institution', () => {
    it('should display institution image with link to its website', () => {
      const fakeEducationItem = new EducationItem(newEducationItemArgs)
      component.item = fakeEducationItem
      fixture.detectChanges()

      const imageContainerElement = fixture.debugElement.query(By.css('.image'))
      expect(imageContainerElement)
        .withContext('institution image container exists')
        .toBeTruthy()

      const anchorElement = imageContainerElement.query(By.css('a'))
      expect(anchorElement).withContext('link exists').toBeTruthy()
      expect(anchorElement.attributes['href'])
        .withContext('link points to institution website')
        .toEqual(fakeEducationItem.institution.website.toString())

      const imageElement = anchorElement.query(By.css('img'))
      expect(imageElement).withContext('image exists').toBeTruthy()
      expect(imageElement.attributes['src'])
        .withContext('image source points to institution image')
        .toEqual(fakeEducationItem.institution.image.toString())
    })

    it("should display institution name with link to company's website", () => {
      const fakeEducationItem = new EducationItem(newEducationItemArgs)
      component.item = fakeEducationItem
      fixture.detectChanges()

      const institutionElement = fixture.debugElement.query(
        By.css('.institution'),
      )
      expect(institutionElement)
        .withContext('institution name container element exists')
        .toBeTruthy()

      const anchorElement = institutionElement.query(By.css('a'))
      expect(anchorElement).withContext('link exists').toBeTruthy()
      expect(anchorElement.attributes['href'])
        .withContext('link points to institution website')
        .toEqual(fakeEducationItem.institution.website.toString())
      expect(anchorElement.nativeElement.textContent.trim()).toEqual(
        fakeEducationItem.institution.name,
      )
    })
  })

  describe('area', () => {
    it('should display area', () => {
      const fakeEducationItem = new EducationItem(newEducationItemArgs)
      component.item = fakeEducationItem
      fixture.detectChanges()

      const areaElement = fixture.debugElement.query(By.css('.area'))
      expect(areaElement).withContext('area exists').toBeTruthy()
      expect(areaElement.nativeElement.textContent.trim())
        .withContext('area element contains area')
        .toEqual(fakeEducationItem.area)
    })
  })

  describe('study type', () => {
    it('should display study type', () => {
      const fakeEducationItem = new EducationItem(newEducationItemArgs)
      component.item = fakeEducationItem
      fixture.detectChanges()

      const studyTypeElement = fixture.debugElement.query(By.css('.studyType'))
      expect(studyTypeElement).withContext('study type exists').toBeTruthy()
      expect(studyTypeElement.nativeElement.textContent.trim())
        .withContext('study type element contains study type')
        .toEqual(fakeEducationItem.studyType)
    })
  })

  describe('dates', () => {
    it('should display start date', () => {
      const fakeStartDate = '2022-10-10'
      const fakeStartDateFormatted = 'Oct 2022'
      component.item = new EducationItem({
        ...newEducationItemArgs,
        startDate: new Date(fakeStartDate),
      })
      // noinspection DuplicatedCode
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
      component.item = new EducationItem({ ...newEducationItemArgs })
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
        component.item = new EducationItem({
          ...newEducationItemArgs,
          endDate: undefined,
        })
        fixture.detectChanges()
      })

      // noinspection DuplicatedCode
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
        component.item = new EducationItem({
          ...newEducationItemArgs,
          endDate: new Date(fakeEndDate),
        })
        fixture.detectChanges()
      })
      // noinspection DuplicatedCode
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
})
