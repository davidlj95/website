import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoScriptComponent } from './no-script.component'

describe('NoScriptComponent', () => {
  let component: NoScriptComponent
  let fixture: ComponentFixture<NoScriptComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({})
    fixture = TestBed.createComponent(NoScriptComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
