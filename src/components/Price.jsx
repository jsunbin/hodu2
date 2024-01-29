import React from 'react';
import styles from './Price.module.css';

function Price({ price = 0, size = 'mid', appearance = 'primary' }) {
  return (
    <div className={`${styles.price} ${styles[size]} ${styles[appearance]}`}>
      {price}
    </div>
  );
}

export default Price;
