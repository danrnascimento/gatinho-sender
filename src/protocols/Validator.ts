export interface Validator<T extends any> {
  validate: (data?: T) => Validator.Result;
}

export namespace Validator {
  export type Result = { valid: boolean; reason?: string };
}
