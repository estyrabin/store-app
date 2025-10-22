'use client';
import React, { useState } from 'react';
import styles from './RegisterForm.module.css';

function validateFullName(name: string) {
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return 'יש להזין שם מלא (לפחות שתי מילים)';
  if (words.some(w => /^\d/.test(w))) return 'שום מילה בשם לא יכולה להתחיל בספרה';
  return '';
}
function validatePhone(phone: string) {
  if (phone && !/^[0-9]+$/.test(phone)) return 'יש להזין ספרות בלבד';
  return '';
}
function validateEmail(email: string) {
  if (email && !/^\S+@\S+\.\S+$/.test(email)) return 'כתובת אימייל אינה תקינה';
  return '';
}
function validateDob(dob: string) {
  if (!dob) return 'יש להזין תאריך לידה';
  const d = new Date(dob); const now = new Date();
  const age = now.getFullYear() - d.getFullYear();
  const over18 = age > 18 || (age === 18 && (now.getMonth() > d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() >= d.getDate())));
  if (!over18) return 'חייבים להיות מעל גיל 18';
  return '';
}

export default function RegisterForm() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');

  const [fullNameErr, setFullNameErr] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [dobErr, setDobErr] = useState('');
  const [submitMsg, setSubmitMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  function handleFullName(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setFullName(v);
    setFullNameErr(validateFullName(v));
  }
  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setPhone(v);
    setPhoneErr(validatePhone(v));
  }
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setEmail(v);
    setEmailErr(validateEmail(v));
  }
  function handleDob(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setDob(v);
    setDobErr(validateDob(v));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const fe = validateFullName(fullName);
    const pe = validatePhone(phone);
    const ee = validateEmail(email);
    const de = validateDob(dob);
    setFullNameErr(fe); setPhoneErr(pe); setEmailErr(ee); setDobErr(de);
    setSubmitMsg('');
    if (fe || pe || ee || de) return;

    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phone, email, dob })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitMsg(data.message || 'נרשמת בהצלחה!');
      } else {
        setSubmitMsg(data.errors ? Object.values(data.errors).join(' | ') : (data.message || 'שגיאה'));
      }
    } catch {
      setSubmitMsg('שגיאת רשת');
    } finally {
      setLoading(false);
    }
  }
  const showErr = (err: string, value: string) => (submitted || value) && err;

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>טופס הרשמה</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="fullName" className={styles.label}>שם מלא</label>
        <input id="fullName" type="text" className={styles.input} value={fullName} onChange={handleFullName} />
        {showErr(fullNameErr, fullName) && <div className={styles.error}>{fullNameErr}</div>}

        <label htmlFor="phone" className={styles.label}>טלפון</label>
        <input id="phone" type="text" className={styles.input} value={phone} onChange={handlePhone} />
        {showErr(phoneErr, phone) && <div className={styles.error}>{phoneErr}</div>}

        <label htmlFor="email" className={styles.label}>אימייל</label>
        <input id="email" type="email" className={styles.input} value={email} onChange={handleEmail} />
        {showErr(emailErr, email) && <div className={styles.error}>{emailErr}</div>}

        <label htmlFor="dob" className={styles.label}>תאריך לידה</label>
        <input id="dob" type="date" className={styles.input} value={dob} onChange={handleDob} />
        {showErr(dobErr, dob) && <div className={styles.error}>{dobErr}</div>}

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? 'בתהליך...' : 'הרשם'}
        </button>
      </form>

      {submitMsg && (
        <div className={submitMsg.includes('בהצלחה') ? styles.success : styles.error}>
          {submitMsg}
        </div>
      )}


       <div className={styles.logLink}>
        איש לך חשבון? <a href="/login">התחברות</a>
      </div>
    </div>
  );
}
