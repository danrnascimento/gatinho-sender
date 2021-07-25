import { ValidateUrlString } from ".";

const WRONG_URL = "test";
const CORRECT_URL = "http://test.com.br";

describe("Validators: ValidateUrlString", () => {
  it("should return true if string is a url", () => {
    const validation = new ValidateUrlString();

    const isValid = validation.validate(CORRECT_URL);

    expect(isValid).toBe(true);
  });

  it("should return false if string isn't a url", () => {
    const validation = new ValidateUrlString();

    const isValid = validation.validate(WRONG_URL);

    expect(isValid).toBe(false);
  });
});
