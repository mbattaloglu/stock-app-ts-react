import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import commonStyles from "../../styles/common-styles.module.css";
import CustomChart from "../../components/chart";
import Stock from "../../models/stock";

const StockDetails: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const stock = location.state.stock;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // simulating load from network
  }, []);

  if (loading)
    return (
      <div
        className={`${styles["container"]} ${styles["loading-container"]} ${commonStyles["loading-container"]}`}
      >
        <h1>Loading...</h1>
        <img
          src={`${process.env.PUBLIC_URL}/loading-spinner-light.svg`}
          alt="loading"
        />
      </div>
    );

  if (!stock) {
    return (
      <div
        className={`${styles["container"]} ${styles["loading-container"]} ${commonStyles["loading-container"]}`}
      >
        <h2>Something Went Wrong &#128529;</h2>
        <h3>Please Try Again Later</h3>
        <p>If the problem is still occurs, contact us via email.</p>
        <Link to="/">Go Back</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <CustomChart stock={stock as Stock} />
    </div>
  );
};

export default StockDetails;
