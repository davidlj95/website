import type RESUME from '@/data/resume.json'

export type JsonResumeBasics = typeof RESUME.basics
export type JsonResumeWork = typeof RESUME.work
/** @visibleForTesting */
export type JsonResumeWorkItem = JsonResumeWork[number]
export type JsonResumeEducation = typeof RESUME.education
/** @visibleForTesting */
export type JsonResumeEducationItem = JsonResumeEducation[number]
export type JsonResumeProjects = typeof RESUME.projects
/** @visibleForTesting */
export type JsonResumeProject = JsonResumeProjects[number]
export type JsonResumeLanguages = typeof RESUME.languages
/** @visibleForTesting */
export type JsonResumeLanguage = JsonResumeLanguages[number]
