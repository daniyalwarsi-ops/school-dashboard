import styles from "./Avatar.module.css";

export default function Avatar({ name, photo }) {
  return <img className={styles.avatar} src={photo} alt={name} />;
}
