import { render, screen } from "@testing-library/react";
import React from "react";
import { GatinhoFormOption, GatinhoSenderFormRenderer } from ".";

describe("Containers: GatinhoSenderFormRendererComponent", () => {
  it("should render the form one if the formOption is GatinhoFormOption.ONE", () => {
    render(
      <GatinhoSenderFormRenderer
        onSubmit={() => {}}
        fileToUrlParser={() => ""}
        formOption={GatinhoFormOption.ONE}
      />
    );

    const formOne = screen.queryByTestId("gatinhoSenderOne");
    const formTwo = screen.queryByTestId("gatinhoSenderTwo");
    const formThree = screen.queryByTestId("gatinhoSenderThree");

    expect(formOne).toBeInTheDocument();
    expect(formTwo).not.toBeInTheDocument();
    expect(formThree).not.toBeInTheDocument();
  });

  it("should render the form two if the formOption is GatinhoFormOption.TWO", () => {
    render(
      <GatinhoSenderFormRenderer
        onSubmit={() => {}}
        fileToUrlParser={() => ""}
        formOption={GatinhoFormOption.TWO}
      />
    );

    const formOne = screen.queryByTestId("gatinhoSenderOne");
    const formTwo = screen.queryByTestId("gatinhoSenderTwo");
    const formThree = screen.queryByTestId("gatinhoSenderThree");

    expect(formOne).not.toBeInTheDocument();
    expect(formTwo).toBeInTheDocument();
    expect(formThree).not.toBeInTheDocument();
  });

  it("should render the form three if the formOption is GatinhoFormOption.THREE", () => {
    render(
      <GatinhoSenderFormRenderer
        onSubmit={() => {}}
        fileToUrlParser={() => ""}
        formOption={GatinhoFormOption.THREE}
      />
    );

    const formOne = screen.queryByTestId("gatinhoSenderOne");
    const formTwo = screen.queryByTestId("gatinhoSenderTwo");
    const formThree = screen.queryByTestId("gatinhoSenderThree");

    expect(formOne).not.toBeInTheDocument();
    expect(formTwo).not.toBeInTheDocument();
    expect(formThree).toBeInTheDocument();
  });
});
