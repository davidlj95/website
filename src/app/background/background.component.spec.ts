import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BackgroundComponent } from './background.component'
import { By } from '@angular/platform-browser'

describe('BackgroundComponent', () => {
  let component: BackgroundComponent
  let fixture: ComponentFixture<BackgroundComponent>

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
    const svgText = svgPattern.query(By.css('text'))

    expect(svgPattern.attributes['width'])
      .withContext('width')
      .toEqual((svgText.nativeElement as Element).clientWidth.toString())

    expect(svgPattern.attributes['height'])
      .withContext('height')
      .toEqual((svgText.nativeElement as Element).clientHeight.toString())
  })
})
