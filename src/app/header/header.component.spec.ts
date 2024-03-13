import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MockProviders, ngMocks } from 'ng-mocks'
import { ColorSchemeService } from './color-scheme.service'
import { HeaderComponent } from './header.component'

describe('ToolbarComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(() => {
    ngMocks.autoSpy('jasmine')
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [MockProviders(ColorSchemeService)],
    })
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('when pressing scheme switcher icon', () => {
    it('should call dark / light scheme toggle', () => {
      const colorSchemeService = TestBed.inject(ColorSchemeService)

      fixture.debugElement
        .query(By.css('#dark-light-scheme-toggle'))
        .triggerEventHandler('click')

      expect(colorSchemeService.toggleDarkLight).toHaveBeenCalled()
    })
  })
})
