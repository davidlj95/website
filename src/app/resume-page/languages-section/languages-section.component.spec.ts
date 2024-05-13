import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LanguagesSectionComponent } from './languages-section.component'

describe('LanguagesSectionComponent', () => {
  let component: LanguagesSectionComponent
  let fixture: ComponentFixture<LanguagesSectionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagesSectionComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LanguagesSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
