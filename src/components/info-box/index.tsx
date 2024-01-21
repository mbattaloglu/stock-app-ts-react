import Stock from "../../models/stock";
import styles from "./styles.module.css";
import { giveColor } from "../../utils/giveColor/giveColor";

type InfoBoxProps = {
  stock: Stock;
};

const InfoBox: React.FC<InfoBoxProps> = ({ stock }) => {
  return (
    <div className={styles["info-box"]}>
      <h1>{stock.symbol}</h1>
      <p className={styles.title}>{stock.name}</p>
      <h2>{stock.price.toFixed(2)}</h2>
      <h3 className={giveColor(stock.changePercent)}>
        {stock.changePercent.toFixed(2)}%
      </h3>
      <h4>{new Date(stock.time).toLocaleTimeString()}</h4>
    </div>
  );
};

export default InfoBox;
