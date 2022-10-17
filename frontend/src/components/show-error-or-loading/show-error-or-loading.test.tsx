import { screen, render } from "@testing-library/react";
import { ShowErrorOrLoading } from "./show-error-or-loading";

describe("ShowErrorOrLoading component tests", () => {
  it("Show children", () => {
    render(
      <ShowErrorOrLoading loading={false} error="">
        <p>hi</p>
      </ShowErrorOrLoading>
    );

    const children = screen.getByText("hi");

    expect(children).toBeVisible();
  });

  it("Show loading", () => {
    render(
      <ShowErrorOrLoading loading={true} error="" dataTestId="spinner">
        <p>hi</p>
      </ShowErrorOrLoading>
    );

    const loading = screen.getByTestId("spinner");

    expect(loading).toBeVisible();
  });

  it("Show error", () => {
    render(
      <ShowErrorOrLoading loading={false} error="error">
        <p>hi</p>
      </ShowErrorOrLoading>
    );

    const error = screen.getByText("error");

    expect(error).toBeVisible();
  });
});
