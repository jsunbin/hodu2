import React from 'react';
import styles from './Input.module.css';

function Input({ className = '', children, ...rest }) {
  return (
    <input className={`${styles.input} ${className}`} {...rest}>
      {children}
    </input>
  );
}

export default Input;
