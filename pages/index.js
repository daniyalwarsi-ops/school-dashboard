import Head from "next/head";
import { useState } from "react";
import PersonTable from "@/components/PersonTable/PersonTable";
import RegisterModal from "@/components/RegisterModal/RegisterModal";
import { students as initialStudents } from "@/data/students";
import { teachers as initialTeachers } from "@/data/teachers";
import styles from "@/styles/Home.module.css";

function fallbackAvatar(name) {
  return `https://ui-avatars.com/api/?background=e7e9fb&color=5b6ee8&name=${encodeURIComponent(
    name
  )}`;
}

export default function Home() {
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUserType, setModalUserType] = useState("Student");

  function openModal(userType) {
    setModalUserType(userType);
    setModalOpen(true);
  }

  function handleRegister({ name, email, userType, photo }) {
    const newPerson = {
      id: `${userType.toLowerCase()}-${Date.now()}`,
      name,
      email,
      registeredAt: new Date().toISOString(),
      photo: photo || fallbackAvatar(name),
    };

    if (userType === "Student") {
      setStudents((prev) => [newPerson, ...prev]);
    } else {
      setTeachers((prev) => [newPerson, ...prev]);
    }

    setModalOpen(false);
  }

  return (
    <>
      <Head>
        <title>New Registrations</title>
        <meta name="description" content="Student and teacher registration registry" />
      </Head>

      <div className={styles.wrapper}>
        <main className={styles.card}>
          <PersonTable
            title="New Registered students"
            roleLabel="Student"
            people={students}
            onRegister={() => openModal("Student")}
          />

          <PersonTable
            title="New Registered Teachers"
            roleLabel="Teacher"
            people={teachers}
            onRegister={() => openModal("Teacher")}
          />
        </main>
      </div>

      <RegisterModal
        isOpen={modalOpen}
        userType={modalUserType}
        onClose={() => setModalOpen(false)}
        onSubmit={handleRegister}
      />
    </>
  );
}
