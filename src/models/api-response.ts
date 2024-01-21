export interface ApiResponse {
  quoteResponse?: {
    result: Array<ApiResult>;
  };
  error?: ApiError;
  message?: string;
}

export interface ApiResult {
  shortName: string;
  symbol: string;
  regularMarketPrice: number;
  regularMarketPreviousClose: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: number;
}

export interface ApiError {
  error: ApiErrorInfo;
}

export interface ApiErrorInfo {
  code: string;
  description: string;
}

export function validateApiResult(a: object): boolean {
  return (
    typeof a === "object" &&
    a.hasOwnProperty("shortName") &&
    a.hasOwnProperty("symbol") &&
    a.hasOwnProperty("regularMarketPrice") &&
    a.hasOwnProperty("regularMarketPreviousClose") &&
    a.hasOwnProperty("regularMarketChange") &&
    a.hasOwnProperty("regularMarketChangePercent") &&
    a.hasOwnProperty("regularMarketTime")
  );
}
