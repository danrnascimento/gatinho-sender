import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { SwitchComponentProps, Switch } from ".";

describe("Component: Switch", () => {
  const defaultProps: SwitchComponentProps = {
    id: "switch_id",
    name: "switch_name",
    onChange: jest.fn(),
  };

  it("should init unchecked", () => {
    render(<Switch {...defaultProps}>testing</Switch>);

    const switchComponent = screen.getByRole("switch");

    expect(switchComponent).not.toBeChecked();
  });

  it("should init checked", () => {
    render(
      <Switch {...defaultProps} checked>
        testing
      </Switch>
    );

    const switchComponent = screen.getByRole("switch");

    expect(switchComponent).toBeChecked();
  });

  it("should change the checked state", () => {
    render(<Switch {...defaultProps}>testing</Switch>);

    const switchComponent = screen.getByRole("switch");
    userEvent.click(switchComponent);

    expect(switchComponent).toBeChecked();
  });

  it("should call the onChange with the new checked value when user change the state", () => {
    render(<Switch {...defaultProps}>testing</Switch>);

    const switchComponent = screen.getByRole("switch");
    userEvent.click(switchComponent);

    expect(defaultProps.onChange).toHaveBeenCalledWith(true);

    userEvent.click(switchComponent);

    expect(defaultProps.onChange).toHaveBeenCalledWith(false);
  });
});
