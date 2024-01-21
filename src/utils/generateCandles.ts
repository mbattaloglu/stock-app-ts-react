import { generateCandlesData } from "@devexperts/dxcharts-lite/dist";
import Candle from "../models/candle";

const QUANTITY: number = 1000;

export const candles: Candle[] = generateCandlesData({
  quantity: QUANTITY,
  withVolume: true,
});

export const heikinAshiCandles: Candle[] = candles.map((candle, i) => {
  return generateHeikinAshiCandle(candles[i - 1], candle);
});

function generateHeikinAshiCandle(
  previousCandle: Candle | null,
  currentCandle: Candle,
): Candle {
  if (previousCandle) {
    const heikinAshiCandle: Candle = {
      open: (previousCandle.open + previousCandle.close) / 2,
      hi: Math.max(currentCandle.hi, currentCandle.open, currentCandle.close),
      lo: Math.min(currentCandle.lo, currentCandle.open, currentCandle.close),
      close:
        (currentCandle.open +
          currentCandle.close +
          currentCandle.hi +
          currentCandle.lo) /
        4,
      timestamp: currentCandle.timestamp,
      volume: currentCandle.volume,
    };
    return heikinAshiCandle;
  }
  return currentCandle;
}
