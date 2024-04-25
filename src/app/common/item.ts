export type Item<T, NewObjArg extends object> = { new (obj: NewObjArg): T }
