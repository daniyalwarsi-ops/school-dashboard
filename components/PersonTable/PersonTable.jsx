import Avatar from "@/components/Avatar/Avatar";
import RegisterButton from "@/components/RegisterButton/RegisterButton";
import styles from "./PersonTable.module.css";

function formatDate(iso) {
  const date = new Date(iso);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function PersonTable({ title, roleLabel, people, onRegister }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <RegisterButton label={`Register ${roleLabel}`} onClick={onRegister} />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>{roleLabel}</th>
            <th>Email</th>
            <th>Register at</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id} className={styles.row}>
              <td>
                <div className={styles.person}>
                  <Avatar name={person.name} photo={person.photo} />
                  <span className={styles.name}>{person.name}</span>
                  <svg
                    className={styles.linkIcon}
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
              </td>
              <td className={styles.email}>{person.email}</td>
              <td className={styles.timestamp}>{formatDate(person.registeredAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
