import { useEffect, useState, useMemo } from "react";
import REACT_APP_API_ENDPOINT from "../utils/generateAPILink/generateAPILink";
import Stock from "../models/stock";
import {
  ApiError,
  ApiErrorInfo,
  ApiResponse,
  ApiResult,
  validateApiResult,
} from "../models/api-response";

const useFetch = (refresh: number) => {
  const [refreshLoading, setRefreshLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const data = useMemo<Stock[]>(() => {
    if (!response) return [];
    if (!response.quoteResponse) {
      setErrorMessage(response.message as string);
      return [];
    }
    if (response.quoteResponse.result.length <= 0) {
      setErrorMessage("No data found. Please try again later.");
      return [];
    }
    const arr: Stock[] = [];
    response.quoteResponse.result.map((item, index) => {
      const stock: Readonly<Stock> = {
        id: index,
        name: item.shortName,
        symbol: item.symbol,
        price: item.regularMarketPrice,
        previousClose: item.regularMarketPreviousClose,
        change: item.regularMarketChange,
        changePercent: item.regularMarketChangePercent,
        time: item.regularMarketTime,
      };
      return arr.push(stock);
    });
    return arr;
  }, [response]);

  const biggestGainers = useMemo<Stock[]>(() => {
    if (!data || !Array.isArray(data) || data.length <= 0) return [];
    const arr: Stock[] = [...data]
      .filter((item) => item.changePercent > 0)
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, 5);
    return arr;
  }, [data]);

  const biggestLosers = useMemo<Stock[]>(() => {
    if (!data || !Array.isArray(data) || data.length <= 0) return [];
    const arr: Stock[] = [...data]
      .filter((item) => item.changePercent < 0)
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, 5);
    return arr;
  }, [data]);

  useEffect(() => {
    const getData = async () => {
      setRefreshLoading(true);
      if (!REACT_APP_API_ENDPOINT) {
        stopLoading();
        setErrorMessage("API endpoint is not defined");
        return;
      }
      const apiKey = process.env.REACT_APP_API_KEY;
      if (!apiKey) {
        stopLoading();
        setErrorMessage("API key is not defined");
        return;
      }
      await fetch(`${REACT_APP_API_ENDPOINT}`, {
        headers: {
          "x-api-key": apiKey,
        },
      })
        .then((res) => res.json())
        .then((res: ApiResponse) => {
          if (res.quoteResponse) {
            const isValid = res.quoteResponse.result.every(
              (item: ApiResult) => {
                if (!validateApiResult(item)) {
                  return false;
                }
                return true;
              },
            );
            if (!isValid) {
              setErrorMessage("Invalid data received from the API");
              return;
            }
            setResponse(res);
          } else if (res.error) {
            const apiError: ApiError = res.error as ApiError;
            const apiErrorInfo = apiError.error as ApiErrorInfo;
            setErrorMessage(apiErrorInfo.description);
          } else {
            setErrorMessage(res.message as string);
          }
        })
        .catch((error) => {
          setErrorMessage(error.message);
          console.error(error);
        })
        .finally(() => {
          stopLoading();
        });
    };
    getData();
  }, [refresh]);

  const stopLoading = () => {
    setLoading(false);
    setRefreshLoading(false);
  };

  return {
    loading,
    refreshLoading,
    data,
    biggestGainers,
    biggestLosers,
    error: errorMessage,
  };
};

export default useFetch;
