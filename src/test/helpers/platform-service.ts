import { PlatformService } from '@/common/platform.service'

export const MOCK_NON_BROWSER_PLATFORM_SERVICE = new PlatformService(false)

export const MOCK_BROWSER_PLATFORM_SERVICE = new PlatformService(true)
