import styles from "../../styles/common-styles.module.css";

export const giveColor = (value: number): string => {
  if (value > 0) {
    return styles.increase;
  } else if (value < 0) {
    return styles.decrease;
  }
  return styles.neutral;
};
