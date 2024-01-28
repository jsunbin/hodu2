import React from 'react';
import styles from './Input.module.css';

function Input({ className = '', page = 'primary', children, ...rest }) {
  return (
    <input className={`${styles.input} ${styles[page]} ${className}`} {...rest}>
      {children}
    </input>
  );
}

export default Input;
