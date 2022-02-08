import { SendImageUsingFile, SendImageUsingUrl } from "../../useCases";
import { Controller, Provider, Validator } from "../../protocols";

type CreateSendImage = (params: {
  validation: Validator.Result;
  onAfterValid: () => Promise<Provider.Result>;
}) => Promise<Provider.Result>;

export class GatinhoSenderController implements Controller {
  constructor(
    private provider: Provider,
    private imageValidation: Validator<File>,
    private urlValidator: Validator<string>
  ) {}

  private createSendImage: CreateSendImage = async ({
    validation,
    onAfterValid,
  }) => {
    try {
      const { valid, reason } = validation;
      if (!valid) return { error: new Error(reason) };

      return await onAfterValid();
    } catch {
      return { error: new Error("Erro ao enviar imagem") };
    }
  };

  public async sendImageUsingFile({ file, nsfw }: SendImageUsingFile.Params) {
    return this.createSendImage({
      validation: this.imageValidation.validate(file),
      onAfterValid: () => this.provider.save({ file, nsfw }),
    });
  }

  public async sendImageUsingUrl({ url, nsfw }: SendImageUsingUrl.Params) {
    return this.createSendImage({
      validation: this.urlValidator.validate(url),
      onAfterValid: () => this.provider.save({ url, nsfw }),
    });
  }
}
