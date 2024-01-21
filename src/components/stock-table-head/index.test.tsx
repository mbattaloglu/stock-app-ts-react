import StockTableHead from ".";
import { render, screen } from "@testing-library/react";

describe("stock table header test suite", () => {
  it("should render the table head", () => {
    const { container } = render(
      <table>
        <StockTableHead tableHead={null} />
      </table>
    );
    expect(container).toBeTruthy();
  });
});
