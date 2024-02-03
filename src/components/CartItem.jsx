import React, { useState } from 'react';
import styles from './CartItem.module.css';
import Amount from './Amount';
import Button from './Button';
import mock581 from '../data/productDetailsMock.json';
import mock583 from '../data/product583Mock.json';

function CartItem({ cartItemId, productId, quantity }) {
  const [isChecked, setIsChecked] = useState(false);
  console.log(cartItemId, productId, quantity);
  const item = productId === 271 ? mock581 : mock583;

  const handleCheckBoxClick = (event) => {
    event.preventDefault();

    setIsChecked(!isChecked);
  };

  return (
    <article className={styles['cart-item']}>
      <div className={styles.product}>
        <div className={styles.check}>
          <label>
            <input
              title={`${item.product_name}을 결제상품으로 설정`}
              type="checkbox"
              className="a11y-hidden"
              checked={isChecked}
              readOnly
            />
            <button
              className={styles['check-box']}
              onClick={handleCheckBoxClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  stroke="#21BF48"
                  strokeWidth="2"
                />
                {isChecked && <circle cx="10" cy="10" r="6" fill="#21BF48" />}
              </svg>
            </button>
          </label>
        </div>

        <div className={styles['product-img']}>
          <a href="/#">
            <img src={item.image} alt={item.product_name} />
          </a>
        </div>

        <div className={styles['product-name']}>
          <div className={styles.brand}>{item.store_name}</div>
          <div className={styles.title}>{item.product_name}</div>
          <div className={styles.price}>{item.price}</div>
          <div className={styles.delivery}>
            {item.shipping_method} /{' '}
            {item.shipping_fee === 0 ? '무료배송' : item.shipping_fee}
          </div>
        </div>

        <div className={styles['product-amount']}>
          <Amount amount={quantity} />
        </div>

        <div className={styles['product-total']}>
          <div className={styles.price}>17500원</div>
          <Button size="sm">주문하기</Button>
        </div>
      </div>
      <div className={styles['btn-delete']}>
        <button type="button">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.14258 18.2842L18.2847 4.14204"
              stroke="#C4C4C4"
              strokeWidth="2"
            />
            <path
              d="M18.1426 18.1421L4.00044 3.99996"
              stroke="#C4C4C4"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default CartItem;
