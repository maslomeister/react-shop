import { render, screen } from "@testing-library/react";
import { ShowAuthenticatedProduct } from "./show-authenticated-product";

describe("ShowAuthenticatedProduct component tests", () => {
  it("Show for authenticated user", () => {
    render(
      <ShowAuthenticatedProduct authenticated={true} isUser={true} inStock={5}>
        <p>this is children</p>
      </ShowAuthenticatedProduct>
    );

    expect(screen.getByText("this is children")).toBeVisible();
  });

  it("Show for unauthenticated user", () => {
    render(
      <ShowAuthenticatedProduct authenticated={false} isUser={false} inStock={5}>
        <p>this is children</p>
      </ShowAuthenticatedProduct>
    );

    expect(screen.getByText("Войдите чтобы добавить в корзину")).toBeVisible();
  });

  it("inStock is 0", () => {
    render(
      <ShowAuthenticatedProduct authenticated={true} isUser={true} inStock={0}>
        <p>this is children</p>
      </ShowAuthenticatedProduct>
    );

    expect(screen.getByText("НЕТ В НАЛИЧИИ")).toBeVisible();
  });
});
