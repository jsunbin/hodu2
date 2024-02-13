import React from 'react';
import styles from './Button.module.css';

function Button({
  className = '',
  size = 'ms',
  appearance = 'primary',
  children,
  as: AsComponent,
  ...rest
}) {
  if (AsComponent) {
    return (
      <AsComponent
        className={`${styles.button} ${styles[size]} ${styles[appearance]} ${className}`}
        {...rest}
      >
        {children}
      </AsComponent>
    );
  }
  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[appearance]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
