import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoJsMessageComponent } from './no-js-message.component'

describe('NoJsMessageComponent', () => {
  let component: NoJsMessageComponent
  let fixture: ComponentFixture<NoJsMessageComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({})
    fixture = TestBed.createComponent(NoJsMessageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
