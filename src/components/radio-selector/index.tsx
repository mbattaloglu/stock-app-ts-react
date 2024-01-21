import { useCallback, useRef } from "react";
import styles from "./styles.module.css";
import radioButtons from "../../data/radioButtons";
import ChartType from "../../models/chart-types";

type RadioSelectorProps = {
  setChartType: (chartType: ChartType) => void;
};

const RadioSelector: React.FC<RadioSelectorProps> = ({ setChartType }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      let inputElement = e.target as HTMLInputElement;
      setChartType(inputElement.value as ChartType);
    },
    [setChartType],
  );

  const showOnClick = useCallback(() => {
    containerRef.current?.classList.add(styles["show-radio-button-container"]);
  }, []);

  const closeOnClickOutside = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (formRef.current?.contains(e.target as Node)) return;
      containerRef.current?.classList.remove(
        styles["show-radio-button-container"],
      );
    },
    [],
  );

  return (
    <>
      <button className={styles["button-collapse"]} onClick={showOnClick}>
        &#x2630;
      </button>
      <div
        className={styles["radio-button-container"]}
        ref={containerRef}
        onClick={(e) => closeOnClickOutside(e)}
      >
        <form className={styles["chart-type-selector"]} ref={formRef}>
          {radioButtons.map((radioButton, index) => {
            return (
              <label htmlFor={radioButton.type} key={radioButton.id}>
                <input
                  type="radio"
                  name="chart-type"
                  id={radioButton.type}
                  value={radioButton.type}
                  onChange={(e) => handleOnChange(e)}
                  key={radioButton.id}
                  defaultChecked={index === 0}
                  className={styles["hidden-radio"]}
                />
                <p className={styles["custom-radio"]}>{radioButton.name}</p>
              </label>
            );
          })}
        </form>
      </div>
    </>
  );
};

export default RadioSelector;
