import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CardHeaderImageComponent } from './card-header-image.component'
import { By } from '@angular/platform-browser'
import { setFixtureInputs } from '@/test/helpers/set-input'

describe('CardHeaderImageComponent', () => {
  let component: CardHeaderImageComponent
  let fixture: ComponentFixture<CardHeaderImageComponent>
  const src = 'https://example.org/logo.png'
  const alt = 'Company Foo logotype'

  beforeEach(() => {
    TestBed.configureTestingModule({})
    fixture = TestBed.createComponent(CardHeaderImageComponent)
    component = fixture.componentInstance
    setFixtureInputs(fixture, { src, alt })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should include image with source and alternative text attributes set', () => {
    const imageElement = fixture.debugElement.query(By.css('img'))

    expect(imageElement).toBeTruthy()

    expect(imageElement.attributes['src']).toEqual(src)
    expect(imageElement.attributes['alt']).toEqual(alt)
  })
})
