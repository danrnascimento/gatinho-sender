import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GatinhoSenderFormTwo } from ".";

const TEST_FILE = new File(["(⌐□_□)"], "file.png", {
  type: "image/png",
});

describe("Components: GatinhoSenderFormTwo", () => {
  const submitHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <GatinhoSenderFormTwo
        onSubmit={submitHandler}
        fileToUrlParser={() => "testing.png"}
      />
    );
  });

  describe("url field", () => {
    it("should update the preview with used url after blur the input", async () => {
      const input = await screen.findByPlaceholderText(
        "Cole aqui a URL da imagem de gatinho"
      );

      userEvent.type(input, "https://testing.com");
      fireEvent.blur(input);

      const preview = await screen.findByRole("img", {
        name: "selected cat image",
      });

      expect(preview).toHaveAttribute("src", "https://testing.com");
    });
  });

  describe("file field", () => {
    it("should show the uploaded file in the preview", async () => {
      const button = screen.getByRole("button", { name: /Add/g });
      userEvent.click(button);

      const input = screen.getByTestId("upload_input");
      userEvent.upload(input, TEST_FILE);

      const preview = await screen.findByRole("img", {
        name: "selected cat image",
      });

      expect(preview).toHaveAttribute("src", "testing.png");
    });

    it("should clear the url after click to upload using file", async () => {
      const input = await screen.findByPlaceholderText(
        "Cole aqui a URL da imagem de gatinho"
      );
      expect(input).toBeInTheDocument();

      const button = screen.getByRole("button", { name: /Add/g });
      userEvent.click(button);

      const fileInput = screen.getByTestId("upload_input");
      userEvent.upload(fileInput, TEST_FILE);

      await waitFor(() => expect(input).toHaveValue(""));
    });
  });

  describe("submit", () => {
    it("should submit using image with nfsw as false", () => {
      const button = screen.getByRole("button", { name: /Add/g });
      userEvent.click(button);

      const input = screen.getByTestId("upload_input");
      userEvent.upload(input, TEST_FILE);

      const sendButton = screen.getByRole("button", { name: "Enviar" });
      userEvent.click(sendButton);

      expect(submitHandler).toHaveBeenCalledWith({
        file: TEST_FILE,
        nsfw: false,
        url: null,
      });
    });

    it("should submit using image with nfsw as true", () => {
      const switchButton = screen.getByRole("switch");
      userEvent.click(switchButton);

      const button = screen.getByRole("button", { name: /Add/g });
      userEvent.click(button);

      const input = screen.getByTestId("upload_input");
      userEvent.upload(input, TEST_FILE);

      const sendButton = screen.getByRole("button", { name: "Enviar" });
      userEvent.click(sendButton);

      expect(submitHandler).toHaveBeenCalledWith({
        file: TEST_FILE,
        nsfw: true,
        url: null,
      });
    });

    it("should submit using url with nfsw as false", async () => {
      const input = await screen.findByPlaceholderText(
        "Cole aqui a URL da imagem de gatinho"
      );
      userEvent.type(input, "https://testing.com");
      fireEvent.blur(input);

      const sendButton = screen.getByRole("button", { name: "Enviar" });
      userEvent.click(sendButton);

      expect(submitHandler).toHaveBeenCalledWith({
        file: null,
        nsfw: false,
        url: "https://testing.com",
      });
    });

    it("should submit using url with nfsw as true", async () => {
      const switchButton = screen.getByRole("switch");
      userEvent.click(switchButton);

      const input = await screen.findByPlaceholderText(
        "Cole aqui a URL da imagem de gatinho"
      );
      userEvent.type(input, "https://testing.com");
      fireEvent.blur(input);

      const sendButton = screen.getByRole("button", { name: "Enviar" });
      userEvent.click(sendButton);

      expect(submitHandler).toHaveBeenCalledWith({
        file: null,
        nsfw: true,
        url: "https://testing.com",
      });
    });
  });
});
