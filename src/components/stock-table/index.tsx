import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StockTableRow from "../stock-table-row";
import styles from "./styles.module.css";
import commonStyles from "../../styles/common-styles.module.css";
import Stock from "../../models/stock";
import StockTableHead from "../stock-table-head";

type StockTableProps = {
  data: Stock[];
  loading: boolean;
};

const StockTable: React.FC<StockTableProps> = ({ data, loading }) => {
  const tableHead = useRef<HTMLTableSectionElement | null>(null);
  const navigate = useNavigate();

  const onClickHandler = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    stock: Stock,
  ): void => {
    e.preventDefault();
    const symbol = stock.symbol;
    navigate(`/stockDetails/${symbol}`, { state: { stock } });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    if ((e.target as HTMLDivElement).scrollTop > 0) {
      tableHead.current?.classList.add(styles["scrolled"]);
    } else {
      tableHead.current?.classList.remove(styles["scrolled"]);
    }
  };

  if (loading) {
    return (
      <div
        className={`${commonStyles["loading-container"]} ${styles["loading-container"]}`}
        data-testid="loading"
      >
        <img
          src={`${process.env.PUBLIC_URL}/loading-spinner-dark.svg`}
          alt="loading"
        />
      </div>
    );
  }
  return (
    <div className={styles.container} onScroll={(e) => handleScroll(e)}>
      <table className={styles.table}>
        <StockTableHead tableHead={tableHead} />
        <tbody className={styles["table-body"]}>
          {data.map((stock) => (
            <StockTableRow
              stock={stock}
              key={stock.id}
              onClickHandler={(e) => onClickHandler(e, stock)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
