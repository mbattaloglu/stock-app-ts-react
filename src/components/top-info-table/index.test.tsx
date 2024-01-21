import { render, screen } from "@testing-library/react";
import TopInfoTable from "./index";
import { gainers } from "../../mock/gainers";
import { losers } from "../../mock/losers";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("TopInfoTable", () => {
  it("gainers should be ordered correctly", () => {
    let correctly: boolean = true;
    for (let i = 0; i < gainers.length - 1; i++) {
      if (gainers[i].changePercent < gainers[i + 1].changePercent) {
        correctly = false;
      }
    }
    expect(correctly).toBeTruthy();
  });
  it("losers should be ordered correctly", () => {
    let correctly: boolean = true;
    for (let i = 0; i < losers.length - 1; i++) {
      if (losers[i].changePercent > losers[i + 1].changePercent) {
        correctly = false;
      }
    }
    expect(correctly).toBeTruthy();
  });
  it("should render successfully", () => {
    const { container } = render(
      <TopInfoTable data={gainers} loading={false} />,
    );
    expect(container).toBeTruthy();
  });
  it("should render loading component when loading is true", () => {
    render(<TopInfoTable data={gainers} loading={true} />);
    const loading = screen.getByTestId("loading");
    expect(loading).toBeTruthy();
  });
  it("gainers.length should be equal to topInfoTableRows.length", () => {
    render(<TopInfoTable data={gainers} loading={false} />);
    const topInfoTableBody = screen.getAllByTestId("top-info-table-row");
    expect(topInfoTableBody.length).toEqual(gainers.length);
  });
});
