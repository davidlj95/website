import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BackgroundComponent } from './background.component'
import { By } from '@angular/platform-browser'

describe('BackgroundComponent', () => {
  let component: BackgroundComponent
  let fixture: ComponentFixture<BackgroundComponent>
  // 👇 SVG text size offset so that there's not empty space between repetitions
  const HEIGHT_OFFSET = -5

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(BackgroundComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it("should apply the SVG's text size to the SVG's pattern size", () => {
    const svgPattern = fixture.debugElement.query(By.css('svg pattern'))

    const flooredString = (x: number) => Math.floor(x).toString()

    // 👇 After applying `white-space: pre`, the `text` takes larger width than all of `tspan`
    //    Not sure why
    const svgTspan = svgPattern.query(By.css('tspan'))
    const tSpanWidth = (
      svgTspan.nativeElement as Element
    ).getBoundingClientRect().width

    expect(tSpanWidth).withContext('tspan width heuristic').toBeGreaterThan(100)

    expect(svgPattern.attributes['width'])
      .withContext('width')
      .toEqual(flooredString(tSpanWidth))

    const svgText = svgPattern.query(By.css('text'))
    const textHeight = (svgText.nativeElement as Element).clientHeight

    expect(textHeight).withContext('text height heuristic').toBeGreaterThan(100)

    expect(svgPattern.attributes['height'])
      .withContext('height')
      .toEqual(flooredString(textHeight + HEIGHT_OFFSET))
  })
})
