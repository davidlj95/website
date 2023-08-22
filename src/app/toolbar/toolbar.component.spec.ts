import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProviders, ngMocks } from 'ng-mocks';
import { ColorSchemeService } from './color-scheme.service';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(() => {
    ngMocks.autoSpy('jasmine');
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      providers: [
        MockProviders(ColorSchemeService),
      ]
    });
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when pressing scheme switcher icon', () => {
    it('should call dark / light scheme toggle', () => {
      const colorSchemeService = TestBed.inject(ColorSchemeService);
      ngMocks.click('.theme-switcher');

      expect(colorSchemeService.toggleDarkLight).toHaveBeenCalled();
    })
  });
});
