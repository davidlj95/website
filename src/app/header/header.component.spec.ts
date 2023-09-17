import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProviders, ngMocks } from 'ng-mocks';
import { ColorSchemeService } from './color-scheme.service';
import { HeaderComponent } from './header.component';

describe('ToolbarComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    ngMocks.autoSpy('jasmine');
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        MockProviders(ColorSchemeService),
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when pressing scheme switcher icon', () => {
    it('should call dark / light scheme toggle', () => {
      const colorSchemeService = TestBed.inject(ColorSchemeService);
      ngMocks.click('.dark-light-scheme-toggle');

      expect(colorSchemeService.toggleDarkLight).toHaveBeenCalled();
    })
  });
});
