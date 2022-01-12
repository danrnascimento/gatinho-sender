export interface DefaultSendImage<
  Params = DefaultSendImage.Params,
  Result = DefaultSendImage.Result
> {
  (data: Params): Result;
}

export namespace DefaultSendImage {
  export type Params = { nsfw: boolean };
  export type Result = Promise<boolean>;
}
