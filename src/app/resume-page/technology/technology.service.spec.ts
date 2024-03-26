import { EXTRA_DISPLAY_NAMES, TechnologyService } from './technology.service'
import SIMPLE_ICONS_JSON from './simple-icons.json'
import { serviceTestSetup } from '@test/helpers/service-test-setup'
import { EXTRA_ICONS } from './extra-icons'
import { MockProvider } from 'ng-mocks'
import { DomSanitizer } from '@angular/platform-browser'
import { IDENTITY } from '@test/helpers/identity'

describe('TechnologyService', () => {
  let sut: TechnologyService
  const SIMPLE_ICON = SIMPLE_ICONS_JSON[0]
  const EXTRA_ICON = EXTRA_ICONS[0]
  const EXTRA_DISPLAY_NAME_ENTRY = [...EXTRA_DISPLAY_NAMES.entries()][0]
  const EXTRA_DISPLAY_NAME_SLUG = EXTRA_DISPLAY_NAME_ENTRY[0]
  const EXTRA_DISPLAY_NAME = EXTRA_DISPLAY_NAME_ENTRY[1]
  it('should be created', () => {
    sut = makeSut()
    expect(sut).toBeTruthy()
  })

  describe('icon', () => {
    it('should return icon sanitized SVG and color in hex form from simple icons JSON given a technology slug', () => {
      const domSanitizer: Partial<DomSanitizer> = {
        bypassSecurityTrustHtml: jasmine.createSpy().and.callFake(IDENTITY),
      }
      sut = makeSut({ domSanitizer })
      const icon = sut.getIcon(SIMPLE_ICON.slug)

      expect(icon!.svg).toEqual(SIMPLE_ICON.svg)
      expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledOnceWith(
        SIMPLE_ICON.svg,
      )
      expect(icon!.color).toEqual(`#${SIMPLE_ICON.hex}`)
    })

    it('should return icon sanitized SVG and color in hex form from extra icons given a technology slug', () => {
      const domSanitizer: Partial<DomSanitizer> = {
        bypassSecurityTrustHtml: jasmine.createSpy().and.callFake(IDENTITY),
      }
      sut = makeSut({ domSanitizer })

      const icon = sut.getIcon(EXTRA_ICON.slug)

      expect(icon!.svg).toEqual(EXTRA_ICON.svg)
      expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledOnceWith(
        EXTRA_ICON.svg,
      )
      expect(icon!.color).toEqual(`#${EXTRA_ICON.hex}`)
    })

    it('should return null when icon does not exist', () => {
      sut = makeSut()
      const nonExistentIconSlug = 'nonExistentIconSlug'
      const icon = sut.getIcon(nonExistentIconSlug)

      expect(icon).toBeNull()
    })
  })

  describe('display name', () => {
    it('should return display name from simple icons JSON given a technology slug', () => {
      sut = makeSut()

      const displayName = sut.getDisplayName(SIMPLE_ICON.slug)

      expect(displayName).toEqual(SIMPLE_ICON.title)
    })

    it('should return display name from extra icons given a technology slug', () => {
      sut = makeSut()

      const displayName = sut.getDisplayName(EXTRA_ICON.slug)

      expect(displayName).toEqual(EXTRA_ICON.title)
    })

    it('should return display name from extra display names given a technology slug', () => {
      sut = makeSut()

      const displayName = sut.getDisplayName(EXTRA_DISPLAY_NAME_SLUG)

      expect(displayName).toEqual(EXTRA_DISPLAY_NAME)
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
