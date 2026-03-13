import styles from "./Spinner.module.scss";

export function Spinner() {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner} />
    </div>
  );
}
