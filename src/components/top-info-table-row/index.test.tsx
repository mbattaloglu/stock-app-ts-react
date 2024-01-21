import { fireEvent, render, screen } from "@testing-library/react";
import {
  neutralStock,
  decreasedStock,
  increasedStock,
  stock,
} from "../../mock/stocks";
import TopInfoTableRow from "./index";
import Stock from "../../models/stock";

const testTopInfoTableRow = (stock: Stock) => {
  render(
    <table>
      <tbody>
        <TopInfoTableRow stock={stock} onClickHandler={() => {}} />
      </tbody>
    </table>,
  );
  const symbolElement = screen.getByText(new RegExp(stock.symbol, "i"));
  const nameElement = screen.getByText(new RegExp(stock.name, "i"));
  const priceElement = screen.getByText(
    new RegExp(`^${stock.price.toFixed(2)}$`, "i"),
  );
  const changePercentElement = screen.getByText(
    new RegExp(`^${stock.changePercent.toFixed(2)}%$`, "i"),
  );
  expect(symbolElement).toBeInTheDocument();
  expect(nameElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
  expect(changePercentElement).toBeInTheDocument();
};

const testTopInfoTableRowColor = (
  stock: Stock,
  className: "neutral" | "increase" | "decrease",
) => {
  const changePercentElement = screen.getByText(
    new RegExp(`^${stock.changePercent.toFixed(2)}%$`, "i"),
  );
  expect(changePercentElement).toHaveClass(className);
};

const testTopInfoTableRowOnClick = () => {
  const onClickHandler = jest.fn();
  render(
    <table>
      <tbody>
        <TopInfoTableRow stock={stock} onClickHandler={onClickHandler} />
      </tbody>
    </table>,
  );
  const rowElement = screen.getByText(new RegExp(stock.name, "i"));
  fireEvent.click(rowElement);
  expect(onClickHandler).toBeCalledTimes(1);
};

describe("Top Info Table Row Test Suite", () => {
  it("should render top info table row", () => {
    testTopInfoTableRow(stock);
  });
  it("should call onclick function when clicked", () => {
    testTopInfoTableRowOnClick();
  });
  it("should render top info table row with neutral color", () => {
    testTopInfoTableRow(neutralStock);
    testTopInfoTableRowColor(neutralStock, "neutral");
  });
  it("should render top info table row with increased color", () => {
    testTopInfoTableRow(increasedStock);
    testTopInfoTableRowColor(increasedStock, "increase");
  });
  it("should render top info table row with decreased color", () => {
    testTopInfoTableRow(decreasedStock);
    testTopInfoTableRowColor(decreasedStock, "decrease");
  });
});
