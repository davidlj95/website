import { Item } from '@/common/item'

export const makeItemFactory =
  <T, NewObjArg extends object>(
    klass: Item<T, NewObjArg>,
    baseArgs: NewObjArg,
  ) =>
  (overrides?: Partial<NewObjArg>) =>
    new klass({ ...baseArgs, ...overrides })

export type ItemFactoryOverrides<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends abstract new (args: any) => unknown,
> = Partial<ConstructorParameters<T>[0]>
