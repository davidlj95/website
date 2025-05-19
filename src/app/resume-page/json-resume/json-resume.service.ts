import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import RESUME from '@/data/resume.json'

@Injectable({ providedIn: 'root' })
export class JsonResumeService {
  readonly getBasics = (): Observable<typeof RESUME.basics> => of(RESUME.basics)
}

export type JsonResumeBasics = typeof RESUME.basics
