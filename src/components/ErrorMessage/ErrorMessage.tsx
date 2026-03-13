import styles from "./ErrorMessage.module.scss";

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className={styles.errorMessage} role="alert">
      ⚠️ {message}
    </div>
  );
}
