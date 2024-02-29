import React from 'react';
import { Link } from 'react-router-dom';
import styles from './OrderSuccessPage.module.css';

function OrderSuccessPage() {
  return (
    <div className={styles.wrapper}>
      <span className={styles['order-txt']}>주문이 완료되었습니다 :)</span>
      <Link to="/" className={styles.link}>
        더 둘러보러 가기
      </Link>
    </div>
  );
}

export default OrderSuccessPage;
