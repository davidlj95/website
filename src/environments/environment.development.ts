import { Environment } from './environment-interface'

export const environment: Environment = {
  production: false,
  mapJsonResumeImages: true,
  // ⚠️ When running locally production SSR version, server will run at http://localhost:4000 by default
  //    However, given was built with production profile, canonical URL will be production's one.
  //    Nothing too bad happens right now given it's used just for SEO metadata. But to bear in mind.
  canonicalUrl: new URL('http://localhost:4200'),
}
