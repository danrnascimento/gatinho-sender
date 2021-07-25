import { ValidateImageFile } from ".";

const SMALLER_TEST_FILE = new File(["(⌐□_□)"], "file.png", {
  type: "image/png",
});

const BIGGER_TEST_FILE = new File(Array(100).fill("(⌐□_□)"), "file.png", {
  type: "image/png",
});

describe("Validators: ValidateImageFile", () => {
  it("should return true if image is smaller than the max passed to validator", () => {
    const validation = new ValidateImageFile(100);

    const isValid = validation.validate(SMALLER_TEST_FILE);
    expect(isValid).toBe(true);
  });

  it("should return false if image is bigger than the max passed to validator", () => {
    const validation = new ValidateImageFile(100);

    const isValid = validation.validate(BIGGER_TEST_FILE);
    console.log(BIGGER_TEST_FILE.size);
    expect(isValid).toBe(false);
  });
});
