export interface SendImageUsingUrl {
  sendImageUsingUrl: (
    data: SendImageUsingUrl.Params
  ) => SendImageUsingUrl.Result;
}

export namespace SendImageUsingUrl {
  export type Params = { url?: string; nsfw: boolean };
  export type Result = Promise<boolean>;
}
