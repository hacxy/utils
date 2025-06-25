export type ObjectKeys<T extends object> = `${Exclude<keyof T, symbol>}`;
export const objectKeys = Object.keys as <Type extends object>(value: Type) => Array<ObjectKeys<Type>>;
