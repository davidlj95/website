import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent, MockProvider } from 'ng-mocks';
import { getComponentSelector } from '../../../test/helpers/component-testers';
import { METADATA } from '../../common/injection-tokens';
import { Build, Code, History } from '../../material-symbols';
import { DescriptionLine, Metadata } from '../../metadata';
import { DescriptionLineComponent } from './description-line/description-line.component';

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
  const fakeMetadata: Metadata = ({
    descriptionLines: fakeDescriptionLines,
  } as Pick<Metadata, 'descriptionLines'>) as Metadata;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DescriptionComponent,
        MockComponent(DescriptionLineComponent),
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

  it('should render all parent description lines with the component', () => {
    const lineElements = fixture.debugElement.queryAll(By.css(getComponentSelector(DescriptionLineComponent)));
    expect(lineElements.length).toBe(fakeDescriptionLines.length);
    lineElements.forEach((lineElement, index) => {
      expect(lineElement.componentInstance.line).withContext(`line ${index}`).toEqual(fakeDescriptionLines[index])
    });
  })
});
