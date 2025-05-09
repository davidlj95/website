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

    const svgText = svgPattern.query(By.css('text')).nativeElement as Element
    const textWidth = svgText.clientWidth

    expect(textWidth).withContext('text width heuristic').toBeGreaterThan(100)

    expect(svgPattern.attributes['width'])
      .withContext('width')
      .toEqual(textWidth.toString())

    const textHeight = svgText.clientHeight

    expect(textHeight).withContext('text height heuristic').toBeGreaterThan(100)

    expect(svgPattern.attributes['height'])
      .withContext('height')
      .toEqual((textHeight + HEIGHT_OFFSET).toString())
  })
})
