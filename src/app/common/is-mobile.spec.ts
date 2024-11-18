import { TestBed } from '@angular/core/testing'
import { IS_MOBILE } from '@/common/is-mobile'
import { WINDOW } from '@/common/injection-tokens'

describe('isMobile', () => {
  describe('when screen is a mobile one', () => {
    // https://gs.statcounter.com/screen-resolution-stats/mobile/worldwide
    const SCREEN_SIZE: ScreenSize = { width: 360, height: 800 }
    whenInRegularOrRotatedOrientation(SCREEN_SIZE, (screenSize) => {
      it('should return true', () => {
        const sut = makeSut({ screenSize })

        expect(sut()).toBeTrue()
      })
    })

    const screenSize = SCREEN_SIZE
    whenUserAgentIsADesktopOneIt({ screenSize, shouldReturn: true })
    whenUserAgentIsAMobileOneItShouldReturnTrue({ screenSize })
  })

  describe('when screen is a desktop one', () => {
    // https://gs.statcounter.com/screen-resolution-stats/desktop/worldwide
    const SCREEN_SIZE: ScreenSize = { width: 1920, height: 1080 }

    whenInRegularOrRotatedOrientation(SCREEN_SIZE, (screenSize) => {
      it('should return false', () => {
        const sut = makeSut({ screenSize })

        expect(sut()).toBeFalse()
      })
    })

    const screenSize = SCREEN_SIZE
    whenUserAgentIsADesktopOneIt({ screenSize, shouldReturn: false })
    whenUserAgentIsAMobileOneItShouldReturnTrue({ screenSize })
  })

  function whenUserAgentIsAMobileOneItShouldReturnTrue({
    screenSize,
  }: {
    screenSize: ScreenSize
  }) {
    describe('when user agent is a mobile one', () => {
      const MOBILE_USER_AGENT =
        'Mozilla/5.0 (Linux; Android 11; SM-A217F Build/RP1A.200720.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/102.0.5005.99 Mobile Safari/537.36'

      // eslint-disable-next-line jasmine/no-spec-dupes
      it('should return true', () => {
        const sut = makeSut({
          userAgent: MOBILE_USER_AGENT,
          screenSize,
        })

        expect(sut()).toBeTrue()
      })
    })
  }

  function whenUserAgentIsADesktopOneIt({
    screenSize,
    shouldReturn,
  }: {
    screenSize: ScreenSize
    shouldReturn: boolean
  }) {
    describe('when user agent is a desktop one', () => {
      const DESKTOP_USER_AGENT =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.9029.333 Safari/537.36'

      it(`should return ${shouldReturn}`, () => {
        const sut = makeSut({
          userAgent: DESKTOP_USER_AGENT,
          screenSize,
        })

        expect(sut()).toBe(shouldReturn)
      })
    })
  }
})

const makeSut = ({
  screenSize,
  userAgent,
}: {
  screenSize: ScreenSize
  userAgent?: string
}) => {
  TestBed.configureTestingModule({})
  const window = TestBed.inject(WINDOW)
  spyOnProperty(window, 'screen').and.returnValue(screenSize as Screen)
  if (userAgent) {
    spyOnProperty(window.navigator, 'userAgent').and.returnValue(userAgent)
  }
  return TestBed.inject(IS_MOBILE)
}

function whenInRegularOrRotatedOrientation(
  screenSize: ScreenSize,
  fn: (screenSize: ScreenSize) => void,
) {
  describe('when in regular orientation', () => {
    fn(screenSize)
  })

  describe('when in rotated orientation', () => {
    // noinspection JSSuspiciousNameCombination
    fn({
      width: screenSize.height,
      height: screenSize.width,
    })
  })
}

type ScreenSize = Pick<Screen, 'width' | 'height'>
