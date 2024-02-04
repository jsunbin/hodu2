import React from 'react';
import styles from './OrderItem.module.css';
import mock583 from '../data/product583Mock.json';

function OrderItem({ cartItemId, productId, quantity }) {
  const item = mock583;

  return (
    <tr key={productId} className={styles['order-item']}>
      <td colSpan={2}>
        <div className={styles.product}>
          <a href={`/#`}>
            <img src={item.image} alt="상품이미지" />
          </a>
          <div className={styles['product-info']}>
            <div className={styles.brand}>{item.store_name}</div>
            <a href={`/#`}>
              <strong className={styles.title}>{item.product_name}</strong>
            </a>
            <div className={styles.amount}>수량: {quantity}개</div>
          </div>
        </div>
      </td>
      <td>
        <div>-</div>
      </td>
      <td>
        <div>2500</div>
      </td>
      <td>
        <div className={styles['total-price']}>10000원</div>
      </td>
    </tr>
  );
}

export default OrderItem;
