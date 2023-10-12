import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EducationItemComponent } from './education-item.component'
import { EducationItem } from './education-item'
import { Organization } from '../../organization'
import { By } from '@angular/platform-browser'
import { NgOptimizedImage } from '@angular/common'
import { getComponentSelector } from '../../../../test/helpers/component-testers'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { DateRange } from '../../date-range/date-range'
import { MockComponents } from 'ng-mocks'
import { CardComponent } from '../../card/card.component'
import { CardHeaderImageComponent } from '../../card/card-header-image/card-header-image.component'
import { LinkComponent } from '../../link/link.component'

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
    dateRange: new DateRange(new Date('2023-01-01'), new Date('2023-10-10')),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EducationItemComponent,
        MockComponents(
          CardComponent,
          LinkComponent,
          CardHeaderImageComponent,
          DateRangeComponent,
        ),
      ],
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
      component.item = new EducationItem(newEducationItemArgs)
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
    it('should display date range component', () => {
      component.item = new EducationItem(newEducationItemArgs)
      fixture.detectChanges()

      const dateRangeElement = fixture.debugElement.query(
        By.css(getComponentSelector(DateRangeComponent)),
      )
      expect(dateRangeElement)
        .withContext('dates range element exists')
        .toBeTruthy()
    })
  })
})
