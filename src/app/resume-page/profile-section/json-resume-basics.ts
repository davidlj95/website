import { InjectionToken } from '@angular/core'
import resume from '@/data/resume.json'

export const JSON_RESUME_BASICS = new InjectionToken<JsonResumeBasics>(
  'JSON Resume basics section',
  {
    factory: () => resume.basics,
  },
)
export type JsonResumeBasics = typeof resume.basics
