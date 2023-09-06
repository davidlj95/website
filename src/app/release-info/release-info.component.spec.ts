import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseInfoComponent } from './release-info.component';

describe('ReleaseInfoComponent', () => {
  let component: ReleaseInfoComponent;
  let fixture: ComponentFixture<ReleaseInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReleaseInfoComponent],
    });
    fixture = TestBed.createComponent(ReleaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
