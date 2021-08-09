export interface SendImageUsingFile {
  sendImageUsingFile: (
    data: SendImageUsingFile.Params
  ) => SendImageUsingFile.Result;
}

export namespace SendImageUsingFile {
  export type Params = { file?: File; nsfw: boolean };
  export type Result = Promise<boolean>;
}
