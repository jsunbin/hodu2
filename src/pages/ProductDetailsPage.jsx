import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Price from '../components/Price';
import HorizontalRule from '../components/HorizontalRule';
import Amount from '../components/Amount';
import TabMenu from '../components/TabMenu';
import styles from './ProductDetailsPage.module.css';
import mock from '../data/productDetailsMock.json';

function ProductDetailsPage() {
  const item = mock;
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(item.price);

  useEffect(() => {
    const { price } = item;
    const nextPrice = price * amount;
    setPrice(nextPrice);
  }, [amount]);

  return (
    <>
      <section className={styles.info}>
        <div className={styles.image}>
          <img src={item.image} alt={item.product_name} />
        </div>
        <div>
          <div className={styles.basics}>
            <span className={styles.seller}>{item.store_name}</span>
            <h3 className={styles.title}>{item.product_name}</h3>
            <Price price={item.price} size="large" />
          </div>
          <div className={styles.delivery}>
            {item.shipping_method} /{' '}
            {item.shipping_fee === 0 ? '무료배송' : item.shipping_fee}
          </div>
          <HorizontalRule />
          <div className={styles.wrap}>
            <Amount amount={amount} setAmount={setAmount} max={item.stock} />
          </div>
          <HorizontalRule />
          <div className={styles.total}>
            <span className={styles.title}>총 상품 금액</span>
            <div className={styles.ordered}>
              <span className={styles.amount}>
                총 수량 <strong>{amount}</strong>개
              </span>
              <Price price={price} size="large" appearance="secondary" />
            </div>
          </div>

          <div className={styles.buttons}>
            <Button className="button" size="mid" style={{ width: 416 + 'px' }}>
              바로구매
            </Button>
            <Button
              className="button"
              size="mid"
              appearance="dark"
              style={{ width: 200 + 'px' }}
            >
              장바구니
            </Button>
          </div>
        </div>
      </section>
      <section className={styles.details}>
        <TabMenu />
        <div className="contents"></div>
      </section>
    </>
  );
}

export default ProductDetailsPage;
