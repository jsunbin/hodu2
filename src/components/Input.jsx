import React from 'react';
import styles from './Input.module.css';

function Input({ className = '', appearance = 'primary', children, ...rest }) {
  return (
    <input
      className={`${styles.input} ${styles[appearance]} ${className}`}
      {...rest}
    >
      {children}
    </input>
  );
}

export default Input;
