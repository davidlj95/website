import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import RESUME from '@/data/resume.json'
import { JsonResumeBasics, JsonResumeEducation, JsonResumeWork } from './types'

@Injectable({ providedIn: 'root' })
export class JsonResumeService {
  readonly getBasics = (): Observable<JsonResumeBasics> => of(RESUME.basics)
  readonly getWork = (): Observable<JsonResumeWork> => of(RESUME.work)
  readonly getEducation = (): Observable<JsonResumeEducation> =>
    of(RESUME.education)
}
