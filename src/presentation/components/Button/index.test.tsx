import React from "react";
import { render, screen } from "@testing-library/react";
import { ReactComponent as LinkIcon } from "../../../resources/icons/link.svg";

import { Button } from ".";

describe("Component: Button", () => {
  it("should render the button with icon", () => {
    render(<Button icon={<LinkIcon role="img">testing</LinkIcon>} />);

    const img = screen.getByRole("img");

    expect(img).toBeInTheDocument();
  });
});
