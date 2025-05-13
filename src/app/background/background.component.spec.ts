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
    const lastSvgTspanBbox = lastSvgTspan.getBBox()
    const expectedWidth = Math.floor(lastSvgTspanBbox.width)

    expect(expectedWidth)
      .withContext('text width heuristic')
      .toBeGreaterThan(100)

    //👇 A 1 px variation can exist depending if running on CI/CD or locally
    const actualWidth = parseInt(svgPattern.attributes['width']!)

    expect(expectedWidth - 1 <= actualWidth && actualWidth <= expectedWidth + 1)
      .withContext(
        `actual width ${actualWidth} not into +-1px range of expected width ${expectedWidth}`,
      )
      .toBeTrue()

    const expectedHeight =
      lastSvgTspanBbox.y + lastSvgTspanBbox.height + HEIGHT_OFFSET

    expect(expectedHeight)
      .withContext('text height heuristic')
      .toBeGreaterThan(100)

    expect(parseInt(svgPattern.attributes['height']!))
      .withContext('height')
      .toBe(expectedHeight)
  })
})
