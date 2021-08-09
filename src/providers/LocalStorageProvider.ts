import { GatinhoSenderProvider } from "../protocols";

export class LocalStorageProvider implements GatinhoSenderProvider {
  async save({ url, file, nsfw }: GatinhoSenderProvider.Params) {
    try {
      let dataAsString = "";

      if (file) {
        const fileAs64 = await this.fileToBase64(file);
        dataAsString = JSON.stringify({ nsfw, file: fileAs64 });
      } else {
        dataAsString = JSON.stringify({ nsfw, url });
      }

      window.localStorage.setItem("__image", dataAsString);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private fileToBase64 = (file: File) =>
    new Promise<string | undefined>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString());
      reader.onerror = (error) => reject(error);
    });
}
