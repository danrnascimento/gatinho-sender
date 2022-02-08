import { SendImageUsingFile, SendImageUsingUrl, SendImage } from "../useCases";

export interface Provider {
  save: (data: Provider.Params) => Promise<Provider.Result>;
}

export namespace Provider {
  export type Params = SendImageUsingFile.Params & SendImageUsingUrl.Params;
  export type Result = SendImage.Result;
}
