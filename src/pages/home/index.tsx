import useFetch from "../../hooks/useFetch";
import StockTable from "../../components/stock-table";
import styles from "./styles.module.css";
import TopInfoTable from "../../components/top-info-table";
import { useState } from "react";

const Home: React.FC = () => {
  const [refresh, setRefresh] = useState<number>(0);
  let { loading, refreshLoading, data, biggestGainers, biggestLosers, error } =
    useFetch(refresh);

  const refreshOnClick = () => {
    // setRefresh to a new value to trigger a re-render
    setRefresh((prev) => prev + 1);
  };

  if (loading)
    return (
      <div className={styles["error-container"]}>
        <h1>Loading...</h1>
        <img
          src={`${process.env.PUBLIC_URL}/loading-spinner-dark.svg`}
          alt="loading"
        />
      </div>
    );

  return (
    <>
      {!data || data.length <= 0 || !Array.isArray(data) ? (
        <div className={styles["error-container"]}>
          <h2>Something Went Wrong &#128529;</h2>
          <h3>Please Try Again Later</h3>
          <p>If the problem is still occurs, contact us via email.</p>
          <p>Error:{error}</p>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles["title-container"]}>
              <h2 className={styles["title-letter-space"]}>
                Realtime Prices for Dow Jones Stocks
              </h2>
              <button onClick={refreshOnClick}>&#10227;</button>
            </div>
            <StockTable data={data} loading={refreshLoading} />
            <p className={`${styles["last-updated-text"]}`}>
              Last Updated: {new Date().toLocaleString()}
            </p>
          </div>
          <div className={styles.right}>
            <div className={styles["top-table-container"]}>
              <h2
                className={`${styles["table-title"]} ${styles["title-letter-space"]} ${styles["top-title"]}`}
              >
                Biggest Gainers
              </h2>
              <TopInfoTable data={biggestGainers} loading={refreshLoading} />
            </div>
            <div className={styles["top-table-container"]}>
              <h2
                className={`${styles["table-title"]} ${styles["title-letter-space"]} ${styles["top-title"]}`}
              >
                Biggest Losers
              </h2>
              <TopInfoTable data={biggestLosers} loading={refreshLoading} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
