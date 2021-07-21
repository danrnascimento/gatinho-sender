import { Validator } from "../protocols";

export class ValidateImageFile implements Validator<File> {
  validate = (file: File) => {
    return file.size <= 5000000; //5Mb
  };
}
