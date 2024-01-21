import { render, screen } from "@testing-library/react";
import {
  neutralStock,
  decreasedStock,
  increasedStock,
  stock,
} from "../../mock/stocks";
import InfoBox from "./index";
import Stock from "../../models/stock";

const testInfoBoxRender = (stock: Stock) => {
  const { container } = render(<InfoBox stock={stock} />);
  expect(container).toBeTruthy();
};

const testInfoBoxColor = (
  stock: Stock,
  className: "neutral" | "increase" | "decrease",
) => {
  const changePercentElement = screen.getByText(
    new RegExp(`^${stock.changePercent.toFixed(2)}%$`, "i"),
  );
  expect(changePercentElement).toHaveClass(className);
};

describe("Info Box Test Suite", () => {
  it("should render the info box", () => {
    testInfoBoxRender(stock);
  });
  it("should render the info box with neutral color", () => {
    testInfoBoxRender(neutralStock);
    testInfoBoxColor(neutralStock, "neutral");
  });
  it("should render the info box with increased color", () => {
    testInfoBoxRender(increasedStock);
    testInfoBoxColor(increasedStock, "increase");
  });
  it("should render the info box with decreased color", () => {
    testInfoBoxRender(decreasedStock);
    testInfoBoxColor(decreasedStock, "decrease");
  });
});
