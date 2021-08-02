import { ApiCommunication } from "../../infra/protocols";
import { GatinhoSenderFormState } from "../../presentation/ui/components/GatinhoSenderForm/hooks";

export class LocalStorageAdapter
  implements ApiCommunication<GatinhoSenderFormState>
{
  async save({ url, file, nsfw }: GatinhoSenderFormState) {
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
