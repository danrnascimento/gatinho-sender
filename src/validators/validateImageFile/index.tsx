import { Validator } from "@app/protocols";

export const DEFAULT_MAX_ALLOWED_SIZE = 5000000; //5Mb

export class ValidateImageFile implements Validator<File> {
  private maxAllowedSizeInBytes: number = DEFAULT_MAX_ALLOWED_SIZE;

  validate = (file?: File) => {
    if (!file) {
      return {
        valid: false,
        error: new Error("Um arquivo é necessário"),
      };
    }

    if (file.size > this.maxAllowedSizeInBytes) {
      return {
        valid: false,
        error: new Error("O arquivo é maior que o permitido"),
      };
    }

    return { valid: true };
  };
}
