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

  private async sendImageWrappper<Value = string | File>({
    validator,
    onSuccess,
    valueToCheck,
  }: {
    validator: Validator<Value>["validate"];
    onSuccess: () => GatinhoSenderProvider.Result;
    valueToCheck?: Value;
  }) {
    try {
      if (!valueToCheck) return false;

      const valueIsValid = validator(valueToCheck);
      if (!valueIsValid) return false;

      return onSuccess();
    } catch {
      return false;
    }
  }

  public async sendImageUsingFile({ file, nsfw }: SendImageUsingFile.Params) {
    return this.sendImageWrappper({
      valueToCheck: file,
      validator: this.imageValidation.validate,
      onSuccess: () => this.provider.save({ file, nsfw }),
    });
  }

  public async sendImageUsingUrl({ url, nsfw }: SendImageUsingUrl.Params) {
    return this.sendImageWrappper({
      valueToCheck: url,
      validator: this.urlValidator.validate,
      onSuccess: () => this.provider.save({ url, nsfw }),
    });
  }
}
