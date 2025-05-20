import type RESUME from '@/data/resume.json'

export type JsonResumeBasics = typeof RESUME.basics
export type JsonResumeWork = typeof RESUME.work
export type JsonResumeWorkItem = JsonResumeWork[number]
export type JsonResumeEducation = typeof RESUME.education
export type JsonResumeEducationItem = JsonResumeEducation[number]
