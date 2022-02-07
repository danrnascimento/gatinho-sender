import { Validator } from "../../protocols";

export class ValidateUrlString implements Validator<string> {
  private pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  validate = (url?: string) => {
    if (!url) {
      return {
        valid: false,
        error: new Error("Um Link é necessário"),
      };
    }

    const patterResult = !!this.pattern.test(url);

    if (!patterResult) {
      return {
        valid: false,
        error: new Error("O Link é inválido"),
      };
    }

    return { valid: true };
  };
}
