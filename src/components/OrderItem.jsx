import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../lib/axios';
import styles from './OrderItem.module.css';
import mock583 from '../data/product583Mock.json';

function OrderItem({ cartItemId, productId, quantity }) {
  console.log(productId);
  // const item = mock583;
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getItem = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/products/${productId}/`);
      const nextItem = res.data;

      console.log(res);

      setItem(nextItem);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <tr key={productId} className={styles['order-item']}>
      <td colSpan={2}>
        <div className={styles.product}>
          <Link to={`/#`}>
            <img src={item.image} alt="상품이미지" />
          </Link>
          <div className={styles['product-info']}>
            <div className={styles.brand}>{item.store_name}</div>
            <Link to={`/#`}>
              <strong className={styles.title}>{item.product_name}</strong>
            </Link>
            <div className={styles.amount}>수량: {quantity}개</div>
          </div>
        </div>
      </td>
      <td>
        <div>-</div>
      </td>
      <td>
        <div>{item.shipping_fee}</div>
      </td>
      <td>
        <div className={styles['total-price']}>
          {item.price * quantity + item.shipping_fee}원
        </div>
      </td>
    </tr>
  );
}

export default OrderItem;
