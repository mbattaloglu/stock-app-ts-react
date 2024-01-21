import { generateAPILink, API_ENDPOINT_ROOT } from "./generateAPILink";

describe("API Link Generator Test Suite", () => {
  it("Should encode the symbols correctly", () => {
    const link = generateAPILink(["AAPL", "AMGN"]);
    expect(link).toBe(`${API_ENDPOINT_ROOT}${encodeURIComponent("AAPL,AMGN")}`);
  });
  it("Should encode when there is only one symbol", () => {
    const link = generateAPILink(["AAPL"]);
    expect(link).toBe(`${API_ENDPOINT_ROOT}${encodeURIComponent("AAPL")}`);
  });
  it("Should return null when there is no symbol", () => {
    const link = generateAPILink([]);
    expect(link).toBe(null);
  });
});
