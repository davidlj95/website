import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PositionComponent } from './position.component'
import { Position } from './position'
import { NgOptimizedImage } from '@angular/common'

describe('PositionComponent', () => {
  let component: PositionComponent
  let fixture: ComponentFixture<PositionComponent>
  const fakePosition = new Position({
    imageUrl: new URL('https://example.com/fake.jpg'),
    company: 'Fake company',
    companyWebsite: new URL('https://fake.example.org'),
    role: 'Fake role',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-10-10'),
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PositionComponent],
      imports: [NgOptimizedImage],
    })
    fixture = TestBed.createComponent(PositionComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    component.position = fakePosition
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })
})
