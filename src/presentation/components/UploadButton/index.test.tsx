import React from "react";
import { render, screen } from "@testing-library/react";
import UploadButton, { UploadButtonComponentProps } from ".";
import userEvent from "@testing-library/user-event";

const TEST_FILE = new File(["(⌐□_□)"], "file.png", {
  type: "image/png",
});

describe("Component: UploadButton", () => {
  const defaultProps: UploadButtonComponentProps = {
    id: "test_id",
    name: "file",
    onFileUploaded: jest.fn(),
    fileToUrlParser: () => "generated_url.png",
  };

  it("should dispatch the onFileUploaded with the generated URL and file object when upload a file", () => {
    render(<UploadButton {...defaultProps}>testing</UploadButton>);

    const button = screen.getByRole("button");
    const input = screen.getByTestId("upload_input");

    userEvent.click(button);
    userEvent.upload(input, TEST_FILE);

    expect(defaultProps.onFileUploaded).toHaveBeenCalledWith({
      url: "generated_url.png",
      file: TEST_FILE,
    });
  });
});
