import { renderHook } from "@testing-library/react-hooks";
import { GatinhoSenderController } from "../../../../controllers";
import { useImageSubmission } from "./index";

describe("Hook: useImageSubmission", () => {
  const mockedController = (
    saveResult: boolean = false,
    validateImageResult: boolean = true,
    validateUrlResult: boolean = true
  ) =>
    new GatinhoSenderController(
      { save: jest.fn().mockResolvedValue(saveResult) },
      { validate: jest.fn().mockResolvedValue(validateImageResult) },
      { validate: jest.fn().mockResolvedValue(validateUrlResult) }
    );

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation();
  });

  it("should alert with an error message if url and image are empty", () => {
    const { result } = renderHook(() => useImageSubmission(mockedController()));

    const { handleSubmit } = result.current;

    handleSubmit({
      nsfw: false,
      file: undefined,
      url: undefined,
    });

    expect(window.alert).toHaveBeenCalledWith(
      "é necessário adicionar um arquivo ou uma url"
    );
  });

  describe("url", () => {
    it("should call the sendImageUsingUrl from controller when url exists", () => {
      const controller = mockedController();
      jest.spyOn(controller, "sendImageUsingUrl");

      const { result } = renderHook(() => useImageSubmission(controller));

      const { handleSubmit } = result.current;

      const expectedResult = {
        nsfw: true,
        url: "https://image.com.br",
      };

      handleSubmit({
        file: undefined,
        ...expectedResult,
      });

      expect(controller.sendImageUsingUrl).toHaveBeenCalledWith(expectedResult);
    });

    it("should alert with a success message if url exists and save returns success", async () => {
      const { result, waitFor } = renderHook(() =>
        useImageSubmission(mockedController(true))
      );

      const { handleSubmit } = result.current;

      handleSubmit({
        nsfw: false,
        file: undefined,
        url: "https://image.com.br",
      });

      await waitFor(() =>
        expect(window.alert).toHaveBeenCalledWith("sucesso ao salvar url")
      );
    });

    it("should alert with an error message if url exists but save returns error", async () => {
      const { result, waitFor } = renderHook(() =>
        useImageSubmission(mockedController(false))
      );

      const { handleSubmit } = result.current;

      handleSubmit({
        nsfw: false,
        file: undefined,
        url: "https://image.com.br",
      });

      await waitFor(() =>
        expect(window.alert).toHaveBeenCalledWith("erro ao salvar url")
      );
    });
  });

  describe("file", () => {
    const TEST_FILE = new File(["(⌐□_□)"], "file.png", {
      type: "image/png",
    });

    it("should call the sendImageUsingFile from controller with file and nsfw when file exists", () => {
      const controller = mockedController();
      jest.spyOn(controller, "sendImageUsingFile");

      const { result } = renderHook(() => useImageSubmission(controller));

      const { handleSubmit } = result.current;

      const expectedResult = {
        nsfw: true,
        file: TEST_FILE,
      };

      handleSubmit({
        url: undefined,
        ...expectedResult,
      });

      expect(controller.sendImageUsingFile).toHaveBeenCalledWith(
        expectedResult
      );
    });

    it("should alert with a success message if file exists and save returns success", async () => {
      const { result, waitFor } = renderHook(() =>
        useImageSubmission(mockedController(true))
      );

      const { handleSubmit } = result.current;

      handleSubmit({
        nsfw: false,
        url: undefined,
        file: TEST_FILE,
      });

      await waitFor(() =>
        expect(window.alert).toHaveBeenCalledWith("sucesso ao salvar imagem")
      );
    });

    it("should alert with an error message if url exists but save returns error", async () => {
      const { result, waitFor } = renderHook(() =>
        useImageSubmission(mockedController(false))
      );

      const { handleSubmit } = result.current;

      handleSubmit({
        nsfw: false,
        url: undefined,
        file: TEST_FILE,
      });

      await waitFor(() =>
        expect(window.alert).toHaveBeenCalledWith("erro ao salvar imagem")
      );
    });
  });
});
