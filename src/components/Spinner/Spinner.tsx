import styles from "./Spinner.module.scss";

export function Spinner() {
  return (
    <div className={styles.spinnerWrapper} role="status" aria-label="Cargando">
      <div className={styles.spinner} />
    </div>
  );
}
