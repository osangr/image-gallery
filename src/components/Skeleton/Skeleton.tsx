import styles from "./Skeleton.module.scss";

export function Skeleton() {
  return (
    <ul className={styles.skeletonGrid}>
      {Array.from({ length: 30 }).map((_, i) => (
        <li key={i} className={styles.skeletonItem} />
      ))}
    </ul>
  );
}
