import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import RESUME from '@/data/resume.json'

@Injectable({ providedIn: 'root' })
export class JsonResumeService {
  readonly getBasics = (): Observable<JsonResumeBasics> => of(RESUME.basics)
  readonly getWork = (): Observable<readonly JsonResumeWorkItem[]> =>
    of(RESUME.work)
}

export type JsonResumeBasics = typeof RESUME.basics
/** @visibleForTesting */
export type JsonResumeWork = typeof RESUME.work
export type JsonResumeWorkItem = (typeof RESUME.work)[number]
