import React, { useState } from 'react';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import styles from './CartPage.module.css';
import mock2 from '../data/cartMock.json';

function CartPage() {
  const { count, results } = mock2;
  console.log(results);
  const [items, setItems] = useState(results);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxClick = (event) => {
    event.preventDefault();

    setIsChecked(!isChecked);
  };

  return (
    <>
      <h2 className={styles['title-page']}>장바구니</h2>
      <div>
        {/*@TODO 장바구니에 담은 상품*/}
        <table className={styles.table}>
          <caption className="a11y-hidden">장바구니</caption>
          <thead>
            <tr>
              <th scope="col">
                <div className={styles.check}>
                  <label>
                    <input
                      title="전체 상품을 결제상품으로 설정"
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
                        {isChecked && (
                          <circle cx="10" cy="10" r="6" fill="#21BF48" />
                        )}
                      </svg>
                    </button>
                  </label>
                </div>
              </th>
              <th scope="col">
                <div className={styles['info-txt']}>상품정보</div>
              </th>
              <th scope="col">
                <div className={styles['amount-txt']}>수량</div>
              </th>
              <th scope="col">
                <div className={styles['price-txt']}>상품금액</div>
              </th>
            </tr>
          </thead>
          {count !== 0 ? (
            <tbody className={styles.content}>
              {items.map((item) => (
                <tr key={item.product_id}>
                  <td colSpan={5}>
                    <CartItem
                      cartItemId={item['cart_item_id']}
                      productId={item.product_id}
                      quantity={item.quantity}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className={styles.content}>
              <tr>
                <td colSpan={5}>
                  <div className={styles.empty}>
                    <strong>장바구니에 담긴 상품이 없습니다.</strong>
                    <span>원하는 상품을 장바구니에 담아보세요!</span>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {count !== 0 ? (
        <>
          <section className={styles['total-price-info']}>
            <div>
              총 상품금액
              <span>
                <strong>10000</strong>원
              </span>
            </div>
            <span className={`${styles.sign} ${styles.minus}`}></span>
            <div>
              상품 할인
              <span>
                <strong>0</strong>원
              </span>
            </div>
            <span className={`${styles.sign} ${styles.plus}`}></span>
            <div>
              배송비
              <span>
                <strong>5000</strong>원
              </span>
            </div>
            <div className={styles['sum-price']}>
              결제 예정 금액
              <span>
                <strong>15000</strong>원
              </span>
            </div>
          </section>
          <Button size="large">주문하기</Button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default CartPage;
