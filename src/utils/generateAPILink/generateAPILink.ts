export const API_ENDPOINT_ROOT: string =
  "https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=";

type StockName =
  | "AAPL"
  | "AMGN"
  | "AMZN"
  | "AXP"
  | "AZN"
  | "BA"
  | "CAT"
  | "CSCO"
  | "CVX"
  | "DOW"
  | "EBAY"
  | "GS"
  | "HD"
  | "HON"
  | "IBM"
  | "ILMN"
  | "INTC"
  | "JD"
  | "JNJ"
  | "JPM"
  | "KO"
  | "MCD"
  | "MMM"
  | "TSLA"
  | "TTD"
  | "WYNN"
  | "PLUG"
  | "U"
  | "F"
  | "NU"
  | "MSFT"
  | "PFE"
  | "NVDA";

const stockList: StockName[] = [
  "AAPL",
  "AMGN",
  "AMZN",
  "AXP",
  "AZN",
  "BA",
  "CAT",
  "CSCO",
  "CVX",
  "DOW",
  "EBAY",
  "GS",
  "HD",
  "HON",
  "IBM",
  "ILMN",
  "INTC",
  "JD",
  "JNJ",
  "JPM",
  "KO",
  "MCD",
  "MMM",
  "TSLA",
  "TTD",
  "WYNN",
  "PLUG",
  "U",
  "F",
  "NU",
  "MSFT",
  "PFE",
  "NVDA",
];

export const generateAPILink = (sybols: StockName[]) => {
  if (sybols.length === 0) {
    return null;
  }
  return API_ENDPOINT_ROOT + encodeURIComponent(sybols.join(","));
};

const REACT_APP_API_ENDPOINT: string | null = generateAPILink(stockList);

export default REACT_APP_API_ENDPOINT;
