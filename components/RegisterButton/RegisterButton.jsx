import styles from "./RegisterButton.module.css";

export default function RegisterButton({ label, onClick }) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      + {label}
    </button>
  );
}
