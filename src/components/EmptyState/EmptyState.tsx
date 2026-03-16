import styles from "./EmptyState.module.scss";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className={styles.emptyState} role="status">
      <p>{message}</p>
    </div>
  );
}
