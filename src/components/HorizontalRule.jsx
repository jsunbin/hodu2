import React from 'react';
import styles from './HorizontalRule.module.css';

function HorizontalRule({ className = '' }) {
  return <hr className={`${styles.horizon} ${className}`} />;
}

export default HorizontalRule;
