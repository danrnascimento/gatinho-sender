import { Validator } from "../../protocols";

export const DEFAULT_MAX_ALLOWED_SIZE = 5000000; //5Mb

export class ValidateImageFile implements Validator<File> {
  constructor(
    private maxAllowedSizeInBytes: number = DEFAULT_MAX_ALLOWED_SIZE
  ) {}

  validate = (file: File) => {
    return file.size <= this.maxAllowedSizeInBytes;
  };
}
