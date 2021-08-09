import { GatinhoSenderController } from ".";

const TEST_FILE = new File(["(⌐□_□)"], "file.png", {
  type: "image/png",
});

describe("Controllers: GatinhoSenderController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("sendImageUsingFile", () => {
    it("should return false if file is falsy and shouldn't call the provider and validator", async () => {
      const save = jest.fn();
      const validate = jest.fn();

      const controller = new GatinhoSenderController(
        { save },
        { validate },
        { validate: jest.fn() }
      );

      const result = await controller.sendImageUsingFile({
        file: undefined,
        nsfw: false,
      });

      expect(result).toBe(false);
      expect(save).not.toHaveBeenCalled();
      expect(validate).not.toHaveBeenCalled();
    });

    it("should return false if file is invalid and shouldn't call the provider", async () => {
      const save = jest.fn();
      const validate = jest.fn().mockReturnValueOnce(false);

      const controller = new GatinhoSenderController(
        { save },
        { validate },
        { validate: jest.fn() }
      );

      const result = await controller.sendImageUsingFile({
        file: TEST_FILE,
        nsfw: false,
      });

      expect(result).toBe(false);
      expect(save).not.toHaveBeenCalled();
    });

    it("should return false if upload fail", async () => {
      const save = jest.fn().mockRejectedValueOnce(false);
      const validate = jest.fn().mockReturnValueOnce(true);

      const controller = new GatinhoSenderController(
        { save },
        { validate },
        { validate: jest.fn() }
      );

      const result = await controller.sendImageUsingFile({
        file: TEST_FILE,
        nsfw: false,
      });

      expect(result).toBe(false);
    });

    it("should call the provider with correct values return true if upload works and file is valid", async () => {
      const save = jest.fn().mockResolvedValueOnce(true);
      const validate = jest.fn().mockReturnValueOnce(true);

      const controller = new GatinhoSenderController(
        { save },
        { validate },
        { validate: jest.fn() }
      );

      const result = await controller.sendImageUsingFile({
        file: TEST_FILE,
        nsfw: false,
      });

      expect(result).toBe(true);
      expect(save).toHaveBeenCalledWith({ file: TEST_FILE, nsfw: false });
    });
  });

  describe("sendImageUsingUrl", () => {
    it("should return false if url is falsy and shouldn't call the provider and validator", async () => {
      const save = jest.fn();
      const validate = jest.fn();

      const controller = new GatinhoSenderController(
        { save },
        { validate },
        { validate: jest.fn() }
      );

      const result = await controller.sendImageUsingUrl({
        url: undefined,
        nsfw: false,
      });

      expect(result).toBe(false);
      expect(save).not.toHaveBeenCalled();
      expect(validate).not.toHaveBeenCalled();
    });

    it("should return false if url is invalid and shouldn't call the provider", async () => {
      const save = jest.fn();
      const validate = jest.fn().mockReturnValueOnce(false);

      const controller = new GatinhoSenderController(
        { save },
        { validate: jest.fn() },
        { validate }
      );

      const result = await controller.sendImageUsingUrl({
        url: "url_test",
        nsfw: false,
      });

      expect(result).toBe(false);
      expect(save).not.toHaveBeenCalled();
    });

    it("should return false if upload fail", async () => {
      const save = jest.fn().mockRejectedValueOnce(false);
      const validate = jest.fn().mockReturnValueOnce(true);

      const controller = new GatinhoSenderController(
        { save },
        { validate: jest.fn() },
        { validate }
      );

      const result = await controller.sendImageUsingUrl({
        url: "url_test",
        nsfw: false,
      });

      expect(result).toBe(false);
    });

    it("should call the provider with correct values and return true if upload works and url is valid", async () => {
      const save = jest.fn().mockResolvedValueOnce(true);
      const validate = jest.fn().mockReturnValueOnce(true);

      const controller = new GatinhoSenderController(
        { save },
        { validate: jest.fn() },
        { validate }
      );

      const result = await controller.sendImageUsingUrl({
        url: "url_test",
        nsfw: false,
      });

      expect(result).toBe(true);
      expect(save).toHaveBeenCalledWith({ url: "url_test", nsfw: false });
    });
  });
});
