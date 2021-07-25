export interface SendImageUsingUrl {
  sendImageUsingUrl: (url: string, nsfw: boolean) => Promise<boolean>;
}
