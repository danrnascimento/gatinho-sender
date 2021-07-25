import { SendImageUsingFile, SendImageUsingUrl } from "../../domain";
import { ApiCommunication, Validator } from "../../infra";

export class GatinhoSenderController
  implements SendImageUsingFile, SendImageUsingUrl
{
  constructor(
    private apiCommunication: ApiCommunication,
    private imageValidation: Validator<File>,
    private urlValidator: Validator<string>
  ) {}

  async sendImageUsingFile(file: File, nsfw: boolean) {
    try {
      const imageIsValid = this.imageValidation.validate(file);
      if (!imageIsValid) {
        return false;
      }

      const fileAs64 = await this.fileToBase64(file);
      const success = this.apiCommunication.save({ file: fileAs64, nsfw });
      return success;
    } catch {
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

  async sendImageUsingUrl(url: string, nsfw: boolean) {
    try {
      const urlIsValid = this.urlValidator.validate(url);
      if (!urlIsValid) {
        return false;
      }

      const success = this.apiCommunication.save({ url, nsfw });
      return success;
    } catch {
      return false;
    }
  }
}
