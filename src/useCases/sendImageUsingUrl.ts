import { SendImage } from "./defaultSendImage";

export interface SendImageUsingUrl {
  sendImageUsingUrl: SendImage<
    SendImageUsingUrl.Params,
    Promise<SendImageUsingUrl.Result>
  >;
}

export namespace SendImageUsingUrl {
  export type Params = { url?: string } & SendImage.Params;
  export type Result = SendImage.Result;
}
