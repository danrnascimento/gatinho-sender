import { SendImageUsingFile, SendImageUsingUrl } from "../../useCases";
import { Controller, Provider, Validator } from "../../protocols";

export class GatinhoSenderController implements Controller {
  constructor(
    private provider: Provider,
    private imageValidation: Validator<File>,
    private urlValidator: Validator<string>
  ) {}

  private async sendImageWrappper<Value = string | File>({
    validator,
    onSuccess,
    valueToCheck,
  }: {
    validator: Validator<Value>["validate"];
    onSuccess: () => Provider.Result;
    valueToCheck?: Value;
  }) {
    try {
      const { valid, reason } = validator(valueToCheck);
      if (!valid) return { error: reason };

      return await onSuccess();
    } catch {
      return { error: new Error("Erro ao enviar imagem") };
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
