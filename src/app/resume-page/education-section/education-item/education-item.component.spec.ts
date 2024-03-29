import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing'

import { Attribute, EducationItemComponent } from './education-item.component'
import { EducationItem } from './education-item'
import { Organization } from '../../organization'
import { By } from '@angular/platform-browser'
import { NgIf, NgOptimizedImage } from '@angular/common'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { DateRange } from '../../date-range/date-range'
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
import { byComponent } from '@test/helpers/component-query-predicates'
import { ChippedContentComponent } from '../../chipped-content/chipped-content.component'
import { EducationItemScoreComponent } from './education-item-score/education-item-score.component'
import { EducationItemCoursesComponent } from './education-item-courses/education-item-courses.component'

describe('EducationItemComponent', () => {
  let component: EducationItemComponent
  let fixture: ComponentFixture<EducationItemComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EducationItemComponent,
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
          ChippedContentComponent,
        ),
      ],
    })
    fixture = TestBed.createComponent(EducationItemComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    setEducationItem(fixture)

    expect(component).toBeTruthy()
  })

  it('should display institution image with link to its website', () => {
    const imageUrl = 'https://example.org/logo.png'
    const website = 'https://example.org/'
    const institution = new Organization({
      name: 'Some cool name',
      imageSrc: imageUrl,
      website: new URL(website),
    })
    setEducationItem(fixture, { institution })

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

  it("should display institution name with link to company's website", () => {
    const name = 'Some cool name'
    const website = 'https://example.org/'
    const institution = new Organization({
      name,
      imageSrc: 'https://example.org/logo.png',
      website: new URL(website),
    })
    setEducationItem(fixture, { institution })

    const anchorElement = fixture.debugElement
      .query(byTestId('institution-name'))
      .query(By.css('a'))
    expect(anchorElement).toBeTruthy()
    expect(anchorElement.attributes['href']).toEqual(website)
    expect(anchorElement.nativeElement.textContent.trim()).toEqual(name)
  })

  describe('when name is long and there is short name', () => {
    it('should display short name instead', () => {
      const name = 'Very very very very very very very very long name'
      const shortName = 'VLN'
      setEducationItem(fixture, {
        institution: new Organization({
          name,
          imageSrc: 'https://example.org',
          shortName,
        }),
      })

      const institutionNameElement = fixture.debugElement.query(
        byTestId('institution-name'),
      )
      expect(institutionNameElement.nativeElement.textContent.trim()).toEqual(
        shortName,
      )
    })
  })

  it('should display area', () => {
    const area = 'some study area'
    setEducationItem(fixture, { area })

    const areaElement = fixture.debugElement.query(byTestId('area'))
    expect(areaElement).toBeTruthy()
    expect(areaElement.nativeElement.textContent.trim()).toEqual(area)
  })

  it('should display study type', () => {
    const studyType = 'Some study type'
    setEducationItem(fixture, { studyType })

    const studyTypeElement = fixture.debugElement.query(byTestId('study-type'))
    expect(studyTypeElement).toBeTruthy()
    expect(studyTypeElement.nativeElement.textContent.trim()).toEqual(studyType)
  })

  it('should display date range component', () => {
    setEducationItem(fixture)

    expect(
      fixture.debugElement.query(byComponent(DateRangeComponent)),
    ).toBeTruthy()
  })

  describe('when cum laude attribute is not set', () => {
    it('should not display its attribute', () => {
      setEducationItem(fixture, { cumLaude: false })

      expect(
        fixture.debugElement.query(byTestId(Attribute.CumLaude)),
      ).toBeFalsy()
    })
  })

  describe('when cum laude attribute is set', () => {
    it('should display its attribute', () => {
      setEducationItem(fixture, { cumLaude: true })

      expect(
        fixture.debugElement.query(byTestId(Attribute.CumLaude)),
      ).toBeTruthy()
    })
  })

  it('should add chipped contents component', () => {
    setEducationItem(fixture)

    expect(
      fixture.debugElement.query(byComponent(ChippedContentComponent)),
    ).toBeTruthy()
  })

  describe('when score is present', () => {
    const score = 'Very good++'

    beforeEach(() => {
      setEducationItem(fixture, { score })
    })

    it('should add score content', fakeAsync(() => {
      const scoreContent = component.contents.find(
        (content) => content.component === EducationItemScoreComponent,
      )
      expect(scoreContent).toBeTruthy()
      expect(scoreContent!.inputs).toEqual({ score })
    }))
  })

  describe('when courses are not empty', () => {
    const courses = ['Course 1', 'Course 2']

    beforeEach(() => {
      setEducationItem(fixture, { courses })
    })

    it('should add courses content', fakeAsync(() => {
      const coursesContent = component.contents.find(
        (content) => content.component === EducationItemCoursesComponent,
      )
      expect(coursesContent).toBeTruthy()
      expect(coursesContent!.inputs).toEqual({ courses })
    }))
  })
})

function setEducationItem(
  fixture: ComponentFixture<EducationItemComponent>,
  newItemArgOverrides?: Partial<ConstructorParameters<typeof EducationItem>[0]>,
): void {
  fixture.componentInstance.item = new EducationItem({
    institution: new Organization({
      name: 'Institution name',
      imageSrc: 'https://example.org/logo.png',
      website: new URL('https://example.org'),
    }),
    area: 'Area',
    studyType: 'Study type',
    score: 'Score',
    dateRange: new DateRange(new Date('2023-01-01'), new Date('2023-12-31')),
    ...newItemArgOverrides,
  })

  fixture.detectChanges()
}
