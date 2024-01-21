import { useState, useEffect, useCallback } from "react";
import { Chart as DXChart, createChart } from "@devexperts/dxcharts-lite/dist";
import { candles, heikinAshiCandles } from "../../utils/generateCandles";
import styles from "./styles.module.css";
import InfoBox from "../info-box";
import RadioSelector from "../radio-selector";
import Stock from "../../models/stock";
import ChartType from "../../models/chart-types";

type ChartProps = {
  stock: Stock;
};

const Chart: React.FC<ChartProps> = ({ stock }) => {
  const [chart, setChart] = useState<DXChart | null>(null);
  const [isHeikinAshi, setHeikinAshi] = useState<boolean>(false);

  useEffect(() => {
    chart?.setData({
      candles: candles,
    });
  }, [chart]);

  const changeChartType = useCallback(
    (chartType: ChartType): void => {
      if (!chart) return;
      if (chartType === "heikinAshi") {
        setHeikinAshi(true);
        chart.setData({
          candles: heikinAshiCandles,
        });
        chart.setChartType("candle");
      } else {
        if (isHeikinAshi) {
          chart.setData({
            candles: candles,
          });
          setHeikinAshi(false);
        }
        chart.setChartType(chartType);
      }
    },
    [chart, isHeikinAshi],
  );

  const setRef = useCallback((node: HTMLElement | null) => {
    node &&
      setChart(createChart(node, { scale: { autoScaleOnCandles: false } }));
  }, []);

  return (
    <>
      <div className={styles["chart-container"]} ref={setRef}></div>
      <InfoBox stock={stock} />
      <RadioSelector setChartType={changeChartType} />
    </>
  );
};

export default Chart;
