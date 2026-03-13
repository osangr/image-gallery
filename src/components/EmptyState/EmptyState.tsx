import styles from "./EmptyState.module.scss";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className={styles.emptyState}>
      <p>{message}</p>
    </div>
  );
}
