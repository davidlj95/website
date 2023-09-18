import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MATERIAL_SYMBOLS_CLASS } from '../../../../test/constants';
import { getComponentSelector } from '../../../../test/helpers/component-testers';
import { Build, Code, History } from '../../../material-symbols';
import { DescriptionLineComponent } from './description-line.component';

describe('DescriptionLineComponent', () => {
  let component: DescriptionLineComponent;
  let fixture: ComponentFixture<DescriptionLineComponent>;
  const fakeChildrenLines = [
    {symbol: History, html: 'Line 1.1 HTML', text: 'Line 1.1 Text'},
    {symbol: Code, html: 'Line 1.2 HTML', text: 'Line 1.2 Text'},
  ]
  const fakeDescriptionLine =
    {symbol: Build, html: 'Line 1 HTML', text: 'Line 1 Text', lines: fakeChildrenLines}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionLineComponent],
    });
    fixture = TestBed.createComponent(DescriptionLineComponent);
    component = fixture.componentInstance;
    component.line = fakeDescriptionLine;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display symbol', () => {
    const symbolElement = fixture.debugElement.query(By.css('.symbol'))

    expect(symbolElement.classes[MATERIAL_SYMBOLS_CLASS]).toBeTrue()
    expect(symbolElement.nativeElement.textContent).toEqual(fakeDescriptionLine.symbol)
  })

  it('should display html content', () => {
    const contentElement = fixture.debugElement.query(By.css('.content'))

    expect(contentElement.nativeElement.innerHTML).toEqual(fakeDescriptionLine.html)
  })


  describe('when no children lines present', () => {
    beforeEach(() => {
      component.line = {
        ...fakeDescriptionLine,
        lines: undefined,
      }
      fixture.detectChanges()
    })
    it('should not include any list', () => {
      const listElement = fixture.debugElement.query(By.css('ul'))

      expect(listElement).toBeNull()
    })
  })

  describe('when children lines empty', () => {
    beforeEach(() => {
      component.line = {
        ...fakeDescriptionLine,
        lines: [],
      }
      fixture.detectChanges()
    })
    it('should not include any list', () => {
      const listElement = fixture.debugElement.query(By.css('ul'))

      expect(listElement).toBeNull()
    })
  })

  describe('when children lines exist', () => {
    let fakeIndentLevel: number;
    beforeEach(() => {
      fakeIndentLevel = 4;
      component.line = {
        ...fakeDescriptionLine,
        lines: fakeChildrenLines,
      }
      component.indentLevel = fakeIndentLevel;
      fixture.detectChanges()
    })
    it('should render them using self component and augmenting indentation level', () => {
      const childrenLineElements = fixture.debugElement.queryAll(
        By.css(getComponentSelector(DescriptionLineComponent)),
      )

      expect(childrenLineElements.length).toBe(fakeChildrenLines.length)
      childrenLineElements.forEach((childLineElement, index) => {
        const childLine = fakeChildrenLines[index];
        expect(childLineElement.componentInstance.line).withContext(`child line ${index}`).toEqual(childLine)
        expect(childLineElement.componentInstance.indentLevel).withContext(`child line ${index} indent`).toEqual(fakeIndentLevel+1)
      })
    })
  })
});
