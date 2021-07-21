export interface ApiHandler<T = object> {
  save: (data: T) => Promise<boolean>;
}
