'use client';
import React, { useState } from 'react';
import styles from './LoginForm.module.css';

function validateEmail(email: string) {
  if (!email) return 'נא להזין אימייל';
  if (!/^\S+@\S+\.\S+$/.test(email)) return 'כתובת אימייל אינה תקינה';
  return '';
}

function validatePassword(pw: string) {
  if (!pw) return 'נא להזין סיסמה';
  if (pw.length < 6) return 'הסיסמה חייבת להיות באורך 6 תווים לפחות';
  return '';
}

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // שגיאות שדה
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // שגיאת שרת/רשת כללית
  const [formError, setFormError] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // נלחץ הכפתור?

  const onEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setEmail(v);
    setEmailErr(validateEmail(v));
  };

  const onPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setPassword(v);
    setPasswordErr(validatePassword(v));
  };

  const showErr = (err: string, value: string) => (submitted || value) && err;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setFormError('');

    const ee = validateEmail(email);
    const pe = validatePassword(password);
    setEmailErr(ee);
    setPasswordErr(pe);

    if (ee || pe) return;

    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setFormError(data.message || 'שגיאה בהתחברות');
      } else {
        setFormError('');
        alert('התחברת בהצלחה!');
        // אפשר כאן לבצע redirect אם תרצי, למשל:
        // window.location.href = '/dashboard';
      }
    } catch {
      setFormError('שגיאת רשת');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.centeredPage}>
      <div className={styles.card}>
      <h2 className={styles.title}>התחברות</h2>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label htmlFor="email" className={styles.label}>אימייל</label>
        <input
          id="email"
          type="email"
          className={styles.input}
          value={email}
          onChange={onEmail}
          autoComplete="email"
          aria-invalid={!!showErr(emailErr, email)}
          aria-describedby="email-error"
        />
        {showErr(emailErr, email) && (
          <div id="email-error" className={styles.error}>{emailErr}</div>
        )}

        <label htmlFor="password" className={styles.label}>סיסמה</label>
        <input
          id="password"
          type="password"
          className={styles.input}
          value={password}
          onChange={onPassword}
          autoComplete="current-password"
          aria-invalid={!!showErr(passwordErr, password)}
          aria-describedby="password-error"
        />
        {showErr(passwordErr, password) && (
          <div id="password-error" className={styles.error}>{passwordErr}</div>
        )}

        {formError && <div className={styles.error}>{formError}</div>}

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? 'בתהליך...' : 'התחבר'}
        </button>
      </form>

      <div className={styles.registerLink}>
        אין לך חשבון? <a href="/register">הרשמה</a>
      </div>
    </div>
    </div>
    
  );
}
