import { ComponentFixture } from '@angular/core/testing'

import { LanguageTagComponent } from './language-tag.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { By } from '@angular/platform-browser'

describe('LanguageTagComponent', () => {
  let component: LanguageTagComponent
  let fixture: ComponentFixture<LanguageTagComponent>

  beforeEach(async () => {
    ;[fixture, component] = makeSut()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display tag', () => {
    const tag = 'es'

    component.tag = tag
    fixture.detectChanges()

    expect(fixture.debugElement.nativeElement.textContent.trim()).toContain(tag)
  })

  it('should link tag to ISO page', () => {
    const tag = 'es'

    component.tag = tag
    fixture.detectChanges()

    const anchorElement = fixture.debugElement.query(By.css('a'))
    expect(anchorElement).not.toBeNull()
    expect(anchorElement.attributes['href']).toEqual(
      `https://www.loc.gov/standards/iso639-2/php/langcodes_name.php?iso_639_1=${tag}`,
    )
  })
})

const makeSut = () => componentTestSetup(LanguageTagComponent)
