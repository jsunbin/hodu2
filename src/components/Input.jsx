import React, { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(
  ({ className = '', appearance = 'primary', children, ...rest }, ref) => {
    return (
      <input
        className={`${styles.input} ${styles[appearance]} ${className}`}
        {...rest}
        ref={ref}
      >
        {children}
      </input>
    );
  },
);

export default Input;
