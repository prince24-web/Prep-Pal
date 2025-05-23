// app/upload/loading.js
import styles from './loading.module.css';

export default function Loader() {
  return (
    
    <div className={styles.loaderWrapper}>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </div>

  );
}
