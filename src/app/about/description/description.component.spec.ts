import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockProvider } from 'ng-mocks';
import { MATERIAL_SYMBOLS_CLASS } from '../../../test/constants';
import { METADATA } from '../../common/injection-tokens';
import { Build, Code, History } from '../../material-symbols';
import { DescriptionLine, Metadata } from '../../metadata';

import { DescriptionComponent } from './description.component';

describe('DescriptionComponent', () => {
  let component: DescriptionComponent;
  let fixture: ComponentFixture<DescriptionComponent>;
  const fakeDescriptionLines: ReadonlyArray<DescriptionLine> = [
    {symbol: Code, html: 'Line 1 HTML', text: 'Line 1 Text'},
    {
      symbol: Build, html: 'Line 2 HTML', text: 'Line 2 Text', lines: [
        {symbol: History, html: 'Line 2.1 HTML', text: 'Line 2.1 Text'},
      ],
    },
  ]
  const allFakeDescriptionLines = fakeDescriptionLines
    .flatMap((line) => line.lines && line.lines.length ? [line, ...line.lines] : line)
  const fakeMetadata: Metadata = ({
    descriptionLines: fakeDescriptionLines,
  } as Pick<Metadata, 'descriptionLines'>) as Metadata;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DescriptionComponent,
      ],
      providers: [
        MockProvider(METADATA, fakeMetadata),
      ],
    });
    fixture = TestBed.createComponent(DescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain all description lines with its symbol and text', () => {
    const lineElements = fixture.debugElement.queryAll(By.css('.line'));
    expect(lineElements.length).toBe(allFakeDescriptionLines.length);
    lineElements.forEach((lineElement, index) => {
      const descriptionLine= allFakeDescriptionLines[index];

      const materialSymbolSpan = lineElement.query(By.css( `.${MATERIAL_SYMBOLS_CLASS}`))
      expect(materialSymbolSpan.nativeElement.textContent).withContext(`item ${index} symbol`).toEqual(descriptionLine.symbol)

      const textSpan = lineElement.query(By.css('.content'))
      expect(textSpan.nativeElement.innerHTML).withContext(`item ${index} html`).toEqual(descriptionLine.html)
    });
  })
});
