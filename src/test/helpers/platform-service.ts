import { PlatformService } from '@/common/platform.service'

export const MOCK_SERVER_PLATFORM_SERVICE = new PlatformService(false)

export const MOCK_BROWSER_PLATFORM_SERVICE = new PlatformService(true)
