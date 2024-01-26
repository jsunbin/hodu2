import React from 'react';
import styles from './Label.module.css';

function Label({ className = '', children, ...rest }) {
  return (
    <label className={`${styles.label} ${className}`} {...rest}>
      {children}
    </label>
  );
}

export default Label;
