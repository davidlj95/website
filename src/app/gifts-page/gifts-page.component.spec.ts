import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GiftsPageComponent } from './gifts-page.component'

describe('GiftsPageComponent', () => {
  let component: GiftsPageComponent
  let fixture: ComponentFixture<GiftsPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftsPageComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GiftsPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
