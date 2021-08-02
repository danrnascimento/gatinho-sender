import { SendImageUsingFile, SendImageUsingUrl } from "../../domain";
import { ApiCommunication, Validator } from "../../infra";
import { GatinhoSenderFormState } from "../ui/components/GatinhoSenderForm/hooks";

export class GatinhoSenderController
  implements SendImageUsingFile, SendImageUsingUrl
{
  constructor(
    private apiCommunication: ApiCommunication<GatinhoSenderFormState>,
    private imageValidation: Validator<File>,
    private urlValidator: Validator<string>
  ) {}

  async sendImageUsingFile(file: File, nsfw: boolean) {
    try {
      const imageIsValid = this.imageValidation.validate(file);
      if (!imageIsValid) {
        return false;
      }

      const success = this.apiCommunication.save({ file, nsfw });
      return success;
    } catch {
      return false;
    }
  }

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
