import { ComponentFixture } from '@angular/core/testing'
import { HeaderComponent } from './header.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(HeaderComponent)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
