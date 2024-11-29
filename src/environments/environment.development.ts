import { Environment } from '.'

export const environment: Environment = {
  production: false,
  // ⚠️ When locally serving production SSR, server will run at http://localhost:4000 by default
  //    However, given was built with production profile, app base URL will be production's one.
  //    Nothing too bad happens right now given it's used just for SEO metadata. But to bear in mind.
  appBaseUrl: new URL('http://localhost:4200'),
}
