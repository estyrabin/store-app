import styles from "./Header.module.css";
import Link from "next/link";


export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/Hadasim_logo.png" className={styles.logoImg} alt="logo" />
      </div>
      <div className={styles.actions}>
        <Link href="/login" className={styles.actionBtn}>התחברות</Link>
        <Link href="/register" className={styles.actionBtnAlt}>הרשמה</Link>
      </div>
    
    </header>
  );
}



