import { MdLinksPipe } from './md-links.pipe'
import { TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { By } from '@angular/platform-browser'

describe('MdLinksPipe', () => {
  let sut: MdLinksPipe

  beforeEach(() => {
    TestBed.runInInjectionContext(() => {
      sut = new MdLinksPipe()
    })
  })

  it('create an instance', () => {
    expect(sut).toBeTruthy()
  })

  it('should transform markdown links into HTML links', () => {
    @Component({
      template: '<p [innerHTML]="text | mdLinks"></p>',
      imports: [MdLinksPipe],
    })
    class HostComponent {
      text = 'some [text](url) and [other text](another URL)'
    }

    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const p = fixture.debugElement.query(By.css('p'))

    expect((p.nativeElement as HTMLParagraphElement).innerHTML).toEqual(
      'some <a href="url">text</a> and <a href="another URL">other text</a>',
    )
  })
})
