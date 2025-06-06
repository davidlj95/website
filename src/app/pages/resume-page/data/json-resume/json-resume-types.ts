import type RESUME from '@/data/resume.json'

type JsonResume = typeof RESUME
export type JsonResumeBasics = JsonResume['basics']
export type JsonResumeWork = JsonResume['work']
/** @visibleForTesting */
export type JsonResumeWorkItem = JsonResumeWork[number]
export type JsonResumeEducation = JsonResume['education']
/** @visibleForTesting */
export type JsonResumeEducationItem = JsonResumeEducation[number]
export type JsonResumeProjects = JsonResume['projects']
/** @visibleForTesting */
export type JsonResumeProject = JsonResumeProjects[number]
export type JsonResumeLanguages = JsonResume['languages']
/** @visibleForTesting */
export type JsonResumeLanguage = JsonResumeLanguages[number]
