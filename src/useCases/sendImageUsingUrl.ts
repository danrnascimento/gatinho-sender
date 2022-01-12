import { DefaultSendImage } from "./defaultSendImage";

export interface SendImageUsingUrl {
  sendImageUsingUrl: DefaultSendImage<
    SendImageUsingUrl.Params,
    SendImageUsingUrl.Result
  >;
}

export namespace SendImageUsingUrl {
  export type Params = { url?: string } & DefaultSendImage.Params;
  export type Result = DefaultSendImage.Result;
}
