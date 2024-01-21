import { fireEvent, render, screen } from "@testing-library/react";
import {
  stock,
  decreasedStock,
  increasedStock,
  neutralStock,
} from "../../mock/stocks";
import StockTableRow from "./index";
import Stock from "../../models/stock";

const testStockRow = (
  stock: Stock,
  className: "neutral" | "increase" | "decrease"
) => {
  const { container } = render(
    <table>
      <tbody>
        <StockTableRow stock={stock} onClickHandler={() => {}} />
      </tbody>
    </table>
  );
  expect(container).toBeTruthy();
};

const testStockRowColor = (
  stock: Stock,
  className: "neutral" | "increase" | "decrease"
) => {
  const changeElement = screen.getByText(
    new RegExp(`^${stock.change.toFixed(2)}$`, "i")
  );
  const changePercentElement = screen.getByText(
    new RegExp(`^${stock.changePercent.toFixed(2)}%$`, "i")
  );
  expect(changeElement).toHaveClass(className);
  expect(changePercentElement).toHaveClass(className);
};

const testStockRowOnClick = () => {
  const onClickHandler = jest.fn();
  render(
    <table>
      <tbody>
        <StockTableRow stock={stock} onClickHandler={onClickHandler} />
      </tbody>
    </table>
  );
  const rowElement = screen.getByText(new RegExp(stock.name, "i"));
  fireEvent.click(rowElement);
  expect(onClickHandler).toBeCalledTimes(1);
};

describe("Stock Row Test Suite", () => {
  it("should render stock", () => {
    testStockRow(stock, "neutral");
  });
  it("should call onClickHandler when clicked", () => {
    testStockRowOnClick();
  });
  it("should render the stock row with neutral color", () => {
    testStockRow(neutralStock, "neutral");
    testStockRowColor(neutralStock, "neutral");
  });

  it("should render the stock row with increased color", () => {
    testStockRow(increasedStock, "increase");
    testStockRowColor(increasedStock, "increase");
  });

  it("should render the stock row with decreased color", () => {
    testStockRow(decreasedStock, "decrease");
    testStockRowColor(decreasedStock, "decrease");
  });
});
