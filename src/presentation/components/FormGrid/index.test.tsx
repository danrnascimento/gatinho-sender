import React from "react";
import { render, screen } from "@testing-library/react";
import {
  ALT_IMAGE_WHEN_SRC_EXISTS,
  ALT_IMAGE_WHEN_SRC_NOT_EXISTS,
  PLACEHOLDER_IMAGE,
  FormGrid,
} from ".";

describe("Component: FormGrid", () => {
  it("should start with default image", () => {
    render(<FormGrid />);

    const imagePreview = screen.getByRole("img");

    expect(imagePreview).toHaveAttribute("alt", ALT_IMAGE_WHEN_SRC_NOT_EXISTS);
    expect(imagePreview).toHaveAttribute("src", PLACEHOLDER_IMAGE);
  });

  it("should start with selected image", () => {
    render(<FormGrid src="image.png" />);

    const imagePreview = screen.getByRole("img");

    expect(imagePreview).toHaveAttribute("alt", ALT_IMAGE_WHEN_SRC_EXISTS);
    expect(imagePreview).toHaveAttribute("src", "image.png");
  });

  it("should render the buttons passed trought the props", () => {
    render(
      <FormGrid>
        <button key="1">test 1</button>
        <button key="2">test 2</button>
      </FormGrid>
    );

    const buttonOne = screen.getByRole("button", { name: "test 1" });
    const buttonTwo = screen.getByRole("button", { name: "test 2" });

    expect(buttonOne).toBeInTheDocument();
    expect(buttonTwo).toBeInTheDocument();
  });
});
