import type RESUME from '@/data/resume.json'

export type JsonResumeBasics = typeof RESUME.basics
export type JsonResumeWork = typeof RESUME.work
export type JsonResumeWorkItem = (typeof RESUME.work)[number]
