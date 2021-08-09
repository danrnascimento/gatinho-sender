import { SendImageUsingFile, SendImageUsingUrl } from "../useCases";

export interface GatinhoSenderProvider {
  save: (data: GatinhoSenderProvider.Params) => GatinhoSenderProvider.Result;
}

export namespace GatinhoSenderProvider {
  export type Params = SendImageUsingFile.Params & SendImageUsingUrl.Params;
  export type Result = Promise<boolean>;
}
