import { useEffect, useRef, useState } from "react";
import styles from "./RegisterModal.module.css";

const DEFAULT_FORM = { fullName: "", email: "" };

export default function RegisterModal({ isOpen, userType, onClose, onSubmit }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [selectedType, setSelectedType] = useState(userType);
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);

  // Reset the form each time the modal is opened for a (possibly new) user type.
  useEffect(() => {
    if (isOpen) {
      setForm(DEFAULT_FORM);
      setSelectedType(userType);
      setPhoto(null);
    }
  }, [isOpen, userType]);

  if (!isOpen) return null;

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.fullName.trim() || !form.email.trim()) return;

    onSubmit({
      name: form.fullName.trim(),
      email: form.email.trim(),
      userType: selectedType,
      photo,
    });
  }

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.head}>
          <div>
            <h2 className={styles.title}>Register {selectedType}</h2>
            <p className={styles.subtitle}>Add a new {selectedType.toLowerCase()}.</p>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.uploadBox}>
            <div className={styles.avatarPreview}>
              {photo ? (
                <img src={photo} alt="Selected avatar" className={styles.avatarImg} />
              ) : (
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
                </svg>
              )}
            </div>
            <div>
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Image
              </button>
              <p className={styles.uploadHint}>PNG, JPG or WEBP. Max 2MB.</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className={styles.fileInput}
                onChange={handleFileChange}
              />
            </div>
          </div>

          <label className={styles.label} htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            className={styles.input}
            placeholder="Enter full name"
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
          />

          <label className={styles.label} htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            placeholder="Enter email address"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />

          <label className={styles.label} htmlFor="userType">
            User Type
          </label>
          <select
            id="userType"
            className={styles.select}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Register {selectedType}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
