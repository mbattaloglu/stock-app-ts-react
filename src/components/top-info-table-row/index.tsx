import Stock from "../../models/stock";
import commonStyles from "../../styles/common-styles.module.css";
import { giveColor } from "../../utils/giveColor/giveColor";
import styles from "./styles.module.css";

type TopInfoTableRowProps = {
  stock: Stock;
  onClickHandler: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  ) => void;
};

const TopInfoTableRow: React.FC<TopInfoTableRowProps> = ({
  stock,
  onClickHandler,
}) => {
  return (
    <tr onClick={(e) => onClickHandler(e)} data-testid="top-info-table-row">
      <td>
        <div>
          <h3>{stock.symbol}</h3>
          <p className={`${commonStyles.silent} ${styles.silent}`}>
            {stock.name}
          </p>
        </div>
      </td>
      <td>
        <div>
          <h3 className={giveColor(stock.changePercent)}>
            {stock.changePercent.toFixed(2)}%
          </h3>
          <p className={`${commonStyles.silent} ${styles.silent}`}>
            {stock.price.toFixed(2)}
          </p>
        </div>
      </td>
    </tr>
  );
};

export default TopInfoTableRow;
