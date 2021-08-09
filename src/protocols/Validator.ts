export interface Validator<T extends any> {
  validate: (data: T) => boolean;
}
