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

    const lastSvgTspan = svgPattern.query(By.css('tspan:last-child'))
      .nativeElement as SVGTSpanElement
    const {
      width: expectedWidth,
      height: lineHeight,
      y,
    } = lastSvgTspan.getBBox()

    expect(expectedWidth)
      .withContext('text width heuristic')
      .toBeGreaterThan(100)

    expect(parseInt(svgPattern.attributes['width']!))
      .withContext('width')
      .toBe(Math.floor(expectedWidth))

    const expectedHeight = y + lineHeight + HEIGHT_OFFSET

    expect(expectedHeight)
      .withContext('text height heuristic')
      .toBeGreaterThan(100)

    const actualHeight = parseInt(svgPattern.attributes['height']!)

    //👇 A 1 px variation can exist depending if running on CI/CD or locally
    expect(
      actualHeight - 1 <= expectedHeight && actualHeight <= expectedHeight + 1,
    )
      .withContext('height')
      .toBeTrue()
  })
})
