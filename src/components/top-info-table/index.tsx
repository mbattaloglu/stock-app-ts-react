import TopInfoTableRow from "../top-info-table-row";
import styles from "./styles.module.css";
import commonStyles from "../../styles/common-styles.module.css";
import { useNavigate } from "react-router-dom";
import Stock from "../../models/stock";

type TopInfoTableProps = {
  data: Stock[];
  loading: boolean;
};

const TopInfoTable: React.FC<TopInfoTableProps> = ({ data, loading }) => {
  const navigate = useNavigate();

  const onClickHandler = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    stock: Stock,
  ): void => {
    e.preventDefault();
    const symbol = stock.symbol;
    navigate(`/stockDetails/${symbol}`, { state: { stock } });
  };

  return (
    <div className={styles["table-container"]}>
      {loading ? (
        <div
          className={`${commonStyles["loading-container"]} ${styles["loading-container"]}`}
          data-testid="loading"
        >
          <img
            src={`${process.env.PUBLIC_URL}/loading-spinner-dark.svg`}
            alt="loading"
          />
        </div>
      ) : (
        <table className={styles.table}>
          <tbody className={styles["table-body"]}>
            {data.map((stock) => (
              <TopInfoTableRow
                stock={stock}
                key={stock.id}
                onClickHandler={(e) => onClickHandler(e, stock)}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopInfoTable;
