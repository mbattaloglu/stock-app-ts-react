import Stock from "../../models/stock";
import commonStyles from "../../styles/common-styles.module.css";
import styles from "./styles.module.css";
import { giveColor } from "../../utils/giveColor/giveColor";

type StockTableRowProps = {
  stock: Stock;
  onClickHandler: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  ) => void;
};

const StockTableRow: React.FC<StockTableRowProps> = ({
  stock,
  onClickHandler,
}) => {
  return (
    <tr onClick={(e) => onClickHandler(e)} data-testid="stock-table-row">
      <td>
        {stock.name}
        <span className={`${commonStyles.silent} ${styles.silent}`}>
          {stock.symbol}
        </span>
      </td>
      <td>{stock.previousClose.toFixed(2)}</td>
      <td>{stock.price.toFixed(2)}</td>
      <td className={giveColor(stock.changePercent)}>
        {stock.changePercent.toFixed(2)}%
      </td>
      <td className={giveColor(stock.change)}>{stock.change.toFixed(2)}</td>
      <td>{new Date(stock.time).toLocaleTimeString()}</td>
    </tr>
  );
};

export default StockTableRow;
