export interface SendImageUsingFile {
  sendImageUsingFile: (file: File, nsfw: boolean) => Promise<boolean>;
}
