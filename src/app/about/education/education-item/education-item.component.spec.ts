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
import { CardHeaderTitleComponent } from '../../card/card-header-title/card-header-title.component'
import { CardHeaderSubtitleComponent } from '../../card/card-header-subtitle/card-header-subtitle.component'

describe('EducationItemComponent', () => {
  let component: EducationItemComponent
  let fixture: ComponentFixture<EducationItemComponent>
  const newEducationItemArgs: ConstructorParameters<typeof EducationItem>[0] = {
    institution: new Organization({
      name: 'Fake institution',
      image: new URL('https://fake.example.org/logo.png'),
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
        LinkComponent,
        CardHeaderImageComponent,
        CardHeaderTitleComponent,
        CardHeaderSubtitleComponent,
        MockComponents(CardComponent, DateRangeComponent),
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
      const institutionUrl = 'https://example.org/'
      const fakeEducationItem = new EducationItem({
        ...newEducationItemArgs,
        institution: new Organization({
          name: newEducationItemArgs.institution.name,
          image: new URL('https://example.org/logo.png'),
          website: new URL(institutionUrl),
        }),
      })
      component.item = fakeEducationItem
      fixture.detectChanges()

      const anchorElement = fixture.debugElement
        .query(By.css("[data-test-id='image']"))
        .query(By.css('a'))
      expect(anchorElement).toBeTruthy()
      expect(anchorElement.attributes['href']).toEqual(institutionUrl)

      const imageElement = anchorElement.query(By.css('img'))
      expect(imageElement).toBeTruthy()
      expect(imageElement.attributes['src']).toEqual(
        fakeEducationItem.institution.image.toString(),
      )
    })

    it("should display institution name with link to company's website", () => {
      const institutionUrl = 'https://example.org/'
      const fakeEducationItem = new EducationItem({
        ...newEducationItemArgs,
        institution: new Organization({
          name: newEducationItemArgs.institution.name,
          image: new URL('https://example.org/logo.png'),
          website: new URL(institutionUrl),
        }),
      })
      component.item = fakeEducationItem
      fixture.detectChanges()

      const anchorElement = fixture.debugElement
        .query(By.css("[data-test-id='institution-name']"))
        .query(By.css('a'))
      expect(anchorElement).toBeTruthy()
      expect(anchorElement.attributes['href']).toEqual(institutionUrl)

      expect(anchorElement.nativeElement.textContent.trim()).toEqual(
        fakeEducationItem.institution.name,
      )
    })
  })

  describe('area', () => {
    it('should display area', () => {
      const educationItem = new EducationItem(newEducationItemArgs)
      component.item = educationItem
      fixture.detectChanges()

      const areaElement = fixture.debugElement.query(
        By.css("[data-test-id='area']"),
      )
      expect(areaElement).toBeTruthy()
      expect(areaElement.nativeElement.textContent.trim()).toEqual(
        educationItem.area,
      )
    })
  })

  describe('study type', () => {
    it('should display study type', () => {
      const educationItem = new EducationItem(newEducationItemArgs)
      component.item = educationItem
      fixture.detectChanges()

      const studyTypeElement = fixture.debugElement.query(
        By.css("[data-test-id='study-type']"),
      )
      expect(studyTypeElement).toBeTruthy()
      expect(studyTypeElement.nativeElement.textContent.trim()).toEqual(
        educationItem.studyType,
      )
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
