import { render, screen } from "@testing-library/react";
import StockTable from "./index";
import { stock } from "../../mock/stockArray";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("StockTable", () => {
  it("should render successfully", () => {
    const { container } = render(<StockTable data={stock} loading={false} />);
    expect(container).toBeTruthy();
  });
  it("stock.length should be equal to stockTableRows.length", () => {
    render(<StockTable data={stock} loading={false} />);
    const stockTableRows = screen.getAllByTestId("stock-table-row");
    expect(stockTableRows.length).toEqual(stock.length);
  });
  it("should render loading component when loading is true", () => {
    render(<StockTable data={stock} loading={true} />);
    const loading = screen.getByTestId("loading");
    expect(loading).toBeTruthy();
  });
});
