import {
  SendImageUsingFile,
  SendImageUsingUrl,
  DefaultSendImage,
} from "../useCases";

export interface Provider {
  save: (data: Provider.Params) => Provider.Result;
}

export namespace Provider {
  export type Params = SendImageUsingFile.Params & SendImageUsingUrl.Params;
  export type Result = DefaultSendImage.Result;
}
