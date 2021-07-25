export interface ApiCommunication<T = object> {
  save: (data: T) => Promise<boolean>;
}
