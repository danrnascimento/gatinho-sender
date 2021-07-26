import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GatinhoSenderFormThree } from ".";

const TEST_FILE = new File(["(⌐□_□)"], "file.png", {
  type: "image/png",
});

describe("Components: GatinhoSenderFormThree", () => {
  const submitHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <GatinhoSenderFormThree
        onSubmit={submitHandler}
        fileToUrlParser={() => "testing.png"}
      />
    );
  });

  describe("file field", () => {
    it("should show the uploaded file in the preview", async () => {
      const button = screen.getByRole("button", {
        name: /Selecione aqui a imagem de gatinho/g,
      });
      userEvent.click(button);

      const input = screen.getByTestId("upload_input");
      userEvent.upload(input, TEST_FILE);

      const preview = await screen.findByRole("img", {
        name: "selected cat image",
      });

      expect(preview).toHaveAttribute("src", "testing.png");
    });
  });

  describe("submit", () => {
    it("should submit using image with nfsw as false", () => {
      const button = screen.getByRole("button", {
        name: /Selecione aqui a imagem de gatinho/g,
      });
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

      const button = screen.getByRole("button", {
        name: /Selecione aqui a imagem de gatinho/g,
      });
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
  });
});
