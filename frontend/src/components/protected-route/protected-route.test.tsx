import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../__jest__/render-with-redux";
import { ProtectedRoute } from "./protected-route";
import { Route, Routes } from "react-router-dom";

describe("ProtectedRoute component tests", () => {
  it("Display children if user", () => {
    renderWithProviders(
      <ProtectedRoute authenticated={true} isUser={true}>
        <p>children</p>
      </ProtectedRoute>
    );

    expect(screen.getByText("children")).toBeVisible();
  });

  it("Navigate to / url if not authenticated", () => {
    window.history.pushState({}, "About", "/protected-route");

    renderWithProviders(
      <Routes>
        <Route path="/" element={<p>Hello</p>} />
        <Route
          path="protected-route"
          element={
            <ProtectedRoute authenticated={false} isUser={false}>
              <p>children</p>
            </ProtectedRoute>
          }
        />
      </Routes>
    );

    expect(screen.getByText("Hello")).toBeVisible();
  });

  it("Navigate to / url if admin authenticated", () => {
    window.history.pushState({}, "About", "/protected-route");

    renderWithProviders(
      <Routes>
        <Route path="/" element={<p>Hello</p>} />
        <Route
          path="protected-route"
          element={
            <ProtectedRoute authenticated={true} isUser={false}>
              <p>children</p>
            </ProtectedRoute>
          }
        />
      </Routes>
    );

    expect(screen.getByText("Hello")).toBeVisible();
  });
});
