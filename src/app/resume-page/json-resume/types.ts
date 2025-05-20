import type RESUME from '@/data/resume.json'

export type JsonResumeBasics = typeof RESUME.basics
export type JsonResumeWork = typeof RESUME.work
export type JsonResumeWorkItem = JsonResumeWork[number]
export type JsonResumeEducation = typeof RESUME.education
export type JsonResumeEducationItem = JsonResumeEducation[number]
export type JsonResumeProjects = typeof RESUME.projects
export type JsonResumeProject = JsonResumeProjects[number]
export type JsonResumeLanguages = typeof RESUME.languages
export type JsonResumeLanguage = JsonResumeLanguages[number]
