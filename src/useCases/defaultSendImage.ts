export interface SendImage<
  Params = SendImage.Params,
  Result = SendImage.Result
> {
  (data: Params): Result;
}

export namespace SendImage {
  export type Params = { nsfw: boolean };
  export type Result = { data?: Boolean | Object; error?: Error };
}
