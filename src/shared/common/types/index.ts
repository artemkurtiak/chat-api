export type ObjectValuesType<T extends object> = T[keyof T];
export type Constructor<T = object> = new (...args: any[]) => T;
export type Wrapper<T = object> = { new (): T & any; prototype: T };

export type AuthenticationCookiesType = {
  refreshToken: string;
  accessToken: string;
};
export type ApiSchemaDecorator = <T extends Constructor>(options: {
  name: string;
}) => (constructor: T) => Wrapper<T>;
