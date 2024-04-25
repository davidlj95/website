import { TechnologyService } from './technology.service'
import SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES from './simple-icons-display-name-and-color-entries.json'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { CUSTOM_DISPLAY_NAME_AND_COLOR_ENTRIES } from './custom-display-name-and-color-entries'
import { MockProvider } from 'ng-mocks'
import { DomSanitizer } from '@angular/platform-browser'

describe('TechnologyService', () => {
  let sut: TechnologyService
  const SIMPLE_ICONS_ENTRIES = SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES[0]
  const SIMPLE_ICON_SLUG = SIMPLE_ICONS_ENTRIES[0]
  const SIMPLE_ICON_DISPLAY_NAME = SIMPLE_ICONS_ENTRIES[1]
  const CUSTOM_ENTRY = CUSTOM_DISPLAY_NAME_AND_COLOR_ENTRIES[0]
  const CUSTOM_SLUG = CUSTOM_ENTRY[0]
  const CUSTOM_DISPLAY_NAME = CUSTOM_ENTRY[1]

  it('should be created', () => {
    sut = makeSut()
    expect(sut).toBeTruthy()
  })

  describe('icon', () => {
    //it('should return icon sanitized SVG and color in hex form from simple icons JSON given a technology slug', () => {
    //  const domSanitizer: Partial<DomSanitizer> = {
    //    bypassSecurityTrustHtml: jasmine.createSpy().and.callFake(IDENTITY),
    //  }
    //  sut = makeSut({ domSanitizer })
    //  const icon = sut.getIcon(SIMPLE_ICON.slug)

    //  expect(icon!.svg).toEqual(SIMPLE_ICON.svg)
    //  expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledOnceWith(
    //    SIMPLE_ICON.svg,
    //  )
    //  expect(icon!.color).toEqual(`#${SIMPLE_ICON.hex}`)
    //})

    //it('should return icon sanitized SVG and color in hex form from extra icons given a technology slug', () => {
    //  const domSanitizer: Partial<DomSanitizer> = {
    //    bypassSecurityTrustHtml: jasmine.createSpy().and.callFake(IDENTITY),
    //  }
    //  sut = makeSut({ domSanitizer })

    //  const icon = sut.getIcon(EXTRA_ICON.slug)

    //  expect(icon!.svg).toEqual(EXTRA_ICON.svg)
    //  expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledOnceWith(
    //    EXTRA_ICON.svg,
    //  )
    //  expect(icon!.color).toEqual(`#${EXTRA_ICON.hex}`)
    //})

    it('should return null when icon does not exist', () => {
      sut = makeSut()
      const nonExistentIconSlug = 'nonExistentIconSlug'
      const icon = sut.getIcon(nonExistentIconSlug)

      expect(icon).toBeNull()
    })
  })

  describe('display name', () => {
    it('should return display name from simple icons info given a slug', () => {
      sut = makeSut()

      const displayName = sut.getDisplayName(SIMPLE_ICON_SLUG)

      expect(displayName).toEqual(SIMPLE_ICON_DISPLAY_NAME)
    })

    it('should return display name from custom info given a slug', () => {
      sut = makeSut()

      const displayName = sut.getDisplayName(CUSTOM_SLUG)

      expect(displayName).toEqual(CUSTOM_DISPLAY_NAME)
    })

    it('should return null if name cannot be found', () => {
      sut = makeSut()
      const nonExistentIconSlug = 'nonExistentIconSlug'

      const displayName = sut.getDisplayName(nonExistentIconSlug)

      expect(displayName).toBeNull()
    })
  })
})

function makeSut(opts: { domSanitizer?: Partial<DomSanitizer> } = {}) {
  return serviceTestSetup(TechnologyService, {
    providers: [MockProvider(DomSanitizer, opts.domSanitizer)],
  })
}
