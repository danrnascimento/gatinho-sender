import { SendImageUsingFile, SendImageUsingUrl } from "../../../useCases";
import { GatinhoSenderProvider, Validator } from "../../../protocols";

export class GatinhoSenderController
  implements SendImageUsingFile, SendImageUsingUrl
{
  constructor(
    private provider: GatinhoSenderProvider,
    private imageValidation: Validator<File>,
    private urlValidator: Validator<string>
  ) {}

  async sendImageUsingFile({ file, nsfw }: SendImageUsingFile.Params) {
    try {
      if (!file) {
        return false;
      }

      const imageIsValid = this.imageValidation.validate(file);
      if (!imageIsValid) {
        return false;
      }

      const success = await this.provider.save({ file, nsfw });
      return success;
    } catch {
      return false;
    }
  }

  async sendImageUsingUrl({ url, nsfw }: SendImageUsingUrl.Params) {
    try {
      if (!url) {
        return false;
      }

      const urlIsValid = this.urlValidator.validate(url);
      if (!urlIsValid) {
        return false;
      }

      const success = await this.provider.save({ url, nsfw });
      return success;
    } catch {
      return false;
    }
  }
}
