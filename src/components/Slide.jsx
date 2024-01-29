import React from 'react';
import styles from './Slide.module.css';

function Pagination() {
  return (
    <div className={styles.pagination}>
      <span className={`${styles.bullet} ${styles.active}`}></span>
      <span className={styles.bullet}></span>
      <span className={styles.bullet}></span>
    </div>
  );
}

function Slide() {
  return (
    <section className={styles.section}>
      <ul className={styles.slides}>
        <li className="banner">1</li>
        <li className="banner">2</li>
        <li className="banner">3</li>
      </ul>

      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
      ></button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
      ></button>

      <Pagination />
    </section>
  );
}

export default Slide;
