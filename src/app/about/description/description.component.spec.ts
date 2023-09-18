import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockProvider } from 'ng-mocks';
import { MATERIAL_SYMBOLS_CLASS_SELECTOR } from '../../../test/constants';
import { METADATA } from '../../common/injection-tokens';
import { Build, Code, History } from '../../material-symbols';
import { DescriptionLine, Metadata } from '../../metadata';

import { DescriptionComponent } from './description.component';

describe('DescriptionComponent', () => {
  let component: DescriptionComponent;
  let fixture: ComponentFixture<DescriptionComponent>;
  type FakeHtmlDescriptionLine =
    Omit<DescriptionLine, 'text' | 'lines'>
    & { lines?: ReadonlyArray<FakeHtmlDescriptionLine> }
  const fakeDescriptionLines: ReadonlyArray<FakeHtmlDescriptionLine> = [
    {symbol: Code, html: 'Foo bar'},
    {
      symbol: Build, html: 'Bar foo', lines: [{symbol: History, html: 'Foo bar foo bar'}],
    },
  ]
  const allFakeDescriptionLines = fakeDescriptionLines
    .flatMap((line) => line.lines && line.lines.length ? [line, ...line.lines] : line)
  const fakeMetadata: Metadata = ({
    descriptionLines: fakeDescriptionLines,
  } as Pick<Metadata, 'descriptionLines'>) as Metadata;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionComponent],
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
    const lineElements = fixture.debugElement.queryAll(By.css('.item'));
    expect(lineElements.length).toBe(allFakeDescriptionLines.length);
    lineElements.forEach((lineElement, index) => {
      const descriptionLine= allFakeDescriptionLines[index];

      const materialSymbolSpan = lineElement.query(MATERIAL_SYMBOLS_CLASS_SELECTOR)
      expect(materialSymbolSpan.nativeElement.textContent).withContext(`item ${index} symbol`).toEqual(descriptionLine.symbol)

      const textSpan = lineElement.query(By.css('span:nth-child(2)'))
      expect(textSpan.nativeElement.innerHTML).withContext(`item ${index} text`).toEqual(descriptionLine.html)
    });
  })
});
