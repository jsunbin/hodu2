import React from 'react';
import styles from './Amount.module.css';

function Amount({ amount = 1, setAmount = () => {}, max = 1 }) {
  const minusClickHandler = () => {
    if (amount > 1) {
      setAmount((prevAmount) => prevAmount - 1);
    }
  };

  const plusClickHandler = () => {
    if (amount < max) {
      setAmount((prevAmount) => prevAmount + 1);
    }
  };

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={`${styles.button} ${styles.minus}`}
        onClick={minusClickHandler}
      >
        <span className="a11y-hidden">수량 빼기</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 10H20" stroke="#C4C4C4" strokeWidth="2" />
        </svg>
      </button>
      <strong className={styles.amount}>{amount}</strong>
      <button
        type="button"
        className={`${styles.button} ${styles.plus}`}
        onClick={plusClickHandler}
      >
        <span className="a11y-hidden">수량 추가</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 9.5H20" stroke="#C4C4C4" strokeWidth="2" />
          <path d="M10 20L10 0" stroke="#C4C4C4" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}

export default Amount;
