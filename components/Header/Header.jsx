import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.mark}>NR</div>
      <div className={styles.titleBlock}>
        <p className={styles.eyebrow}>Front office · Registry</p>
        <h1 className={styles.title}>New Registrations</h1>
      </div>
    </header>
  );
}
