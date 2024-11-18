import { ComponentFixture } from '@angular/core/testing'

import { CalendarPageComponent } from './calendar-page.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { By } from '@angular/platform-browser'

describe('CalendarPageComponent', () => {
  let component: CalendarPageComponent
  let fixture: ComponentFixture<CalendarPageComponent>

  beforeEach(() => {
    ;[fixture, component] = makeSut()
  })

  it('should create', () => {
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should include iframe pointing to Google Calendar', () => {
    fixture.detectChanges()

    const iframe = fixture.debugElement.query(By.css('iframe'))

    expect(iframe).not.toBeNull()
    const iframeSource = iframe.attributes['src']

    expect(iframeSource).toEqual(
      jasmine.stringMatching(/^https:\/\/calendar.google.com/),
    )
  })
})

const makeSut = () => componentTestSetup(CalendarPageComponent)
