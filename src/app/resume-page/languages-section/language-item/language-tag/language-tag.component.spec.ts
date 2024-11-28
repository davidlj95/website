import { ComponentFixture } from '@angular/core/testing'

import { LanguageTagComponent } from './language-tag.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { By } from '@angular/platform-browser'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('LanguageTagComponent', () => {
  let component: LanguageTagComponent
  let fixture: ComponentFixture<LanguageTagComponent>
  const DUMMY_TAG = 'dt'

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(LanguageTagComponent)
    setFixtureInputsAndDetectChanges(fixture, { tag: DUMMY_TAG })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display tag between braces', () => {
    expect(textContent(fixture.debugElement)).toEqual(`{${DUMMY_TAG}}`)
  })

  it('should link tag to ISO page', () => {
    const anchorElement = fixture.debugElement.query(By.css('a'))

    expect(anchorElement).not.toBeNull()
    expect(anchorElement.attributes['href']).toEqual(
      `https://www.loc.gov/standards/iso639-2/php/langcodes_name.php?iso_639_1=${DUMMY_TAG}`,
    )
  })
})
