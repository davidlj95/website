import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CardHeaderImageComponent } from './card-header-image.component'
import { By } from '@angular/platform-browser'
import { NgOptimizedImage } from '@angular/common'

describe('CardHeaderImageComponent', () => {
  let component: CardHeaderImageComponent
  let fixture: ComponentFixture<CardHeaderImageComponent>
  const src = 'https://example.org/logo.png'
  const alt = 'Company Foo logotype'

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardHeaderImageComponent],
      imports: [NgOptimizedImage],
    })
    fixture = TestBed.createComponent(CardHeaderImageComponent)
    component = fixture.componentInstance

    component.src = src
    component.alt = alt
    fixture.detectChanges()
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
