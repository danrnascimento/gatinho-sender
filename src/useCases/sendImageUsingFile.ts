import { DefaultSendImage } from "./defaultSendImage";

export interface SendImageUsingFile {
  sendImageUsingFile: DefaultSendImage<
    SendImageUsingFile.Params,
    SendImageUsingFile.Result
  >;
}

export namespace SendImageUsingFile {
  export type Params = { file?: File } & DefaultSendImage.Params;
  export type Result = DefaultSendImage.Result;
}
