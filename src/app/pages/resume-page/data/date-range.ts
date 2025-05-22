export interface DateRange {
  readonly start: Date
  readonly end?: Date
}

export const dateRangeFromStrings = (start: string, end?: string) => ({
  start: new Date(start),
  end: end ? new Date(end) : undefined,
})
