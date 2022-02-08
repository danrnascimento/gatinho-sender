import { SendImage } from "./defaultSendImage";

export interface SendImageUsingFile {
  sendImageUsingFile: SendImage<
    SendImageUsingFile.Params,
    Promise<SendImageUsingFile.Result>
  >;
}

export namespace SendImageUsingFile {
  export type Params = { file?: File } & SendImage.Params;
  export type Result = SendImage.Result;
}
