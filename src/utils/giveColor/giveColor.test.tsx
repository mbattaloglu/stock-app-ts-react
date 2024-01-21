import { render, screen } from "@testing-library/react";
import { giveColor } from "./giveColor";

describe("giveColor Function Test Suite", () => {
  // Unit Test
  it("Should return increase(green color) when the number is positive", () => {
    const color = giveColor(1);
    expect(color).toBe("increase");
  });
  it("Should return decrease(red color) when the number is negative", () => {
    const color = giveColor(-1);
    expect(color).toBe("decrease");
  });
  it("Should return neutral(gray color) when the number is 0", () => {
    const color = giveColor(0);
    expect(color).toBe("neutral");
  });
  // UI Test
  it("should colored green when the number is positive", () => {
    render(<span className={giveColor(1)}>1</span>);
    const span = screen.getByText("1");
    expect(span).toHaveClass("increase");
  });
  it("should colored red when the number is negative", () => {
    render(<span className={giveColor(-1)}>-1</span>);
    const span = screen.getByText("-1");
    expect(span).toHaveClass("decrease");
  });
  it("should colored gray when the number is 0", () => {
    render(<span className={giveColor(0)}>0</span>);
    const span = screen.getByText("0");
    expect(span).toHaveClass("neutral");
  });
});
