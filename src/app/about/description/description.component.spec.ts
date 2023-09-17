import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockProvider } from 'ng-mocks';
import { MATERIAL_SYMBOLS_CLASS_SELECTOR } from '../../../test/constants';
import { METADATA } from '../../common/injection-tokens';
import { Metadata } from '../../metadata';

import { DescriptionComponent } from './description.component';

describe('DescriptionComponent', () => {
  let component: DescriptionComponent;
  let fixture: ComponentFixture<DescriptionComponent>;
  const fakeMetadata: Metadata = ({
    descriptionLines: [
      {symbol: 'code', text: 'Foo bar'},
      {symbol: 'build', text: 'Bar foo'},
    ],
  } as Pick<Metadata, 'descriptionLines'>) as Metadata;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionComponent],
      providers: [
        MockProvider(METADATA, fakeMetadata)
      ]
    });
    fixture = TestBed.createComponent(DescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain description lines with symbol as a Material Symbol', () => {
    const h2s = fixture.debugElement.queryAll(By.css('h2'));
    h2s.forEach((h2, index) => {
      const descriptionLine = fakeMetadata.descriptionLines[index];
      const materialSymbolSpan = h2.query(MATERIAL_SYMBOLS_CLASS_SELECTOR)
      expect(materialSymbolSpan.nativeElement.textContent).toEqual(descriptionLine.symbol)
    });
  })

  it('should contain description lines with text', () => {
    const h2s = fixture.debugElement.queryAll(By.css('h2'));
    h2s.forEach((h2, index) => {
      const descriptionLine = fakeMetadata.descriptionLines[index];
      const textSpan = h2.query(By.css('span:nth-child(2)'))
      expect(textSpan.nativeElement.textContent).toEqual(descriptionLine.text)
    });
  })
});
