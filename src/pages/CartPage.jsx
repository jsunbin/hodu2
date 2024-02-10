import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import axios from '../lib/axios';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import styles from './CartPage.module.css';
import mock2 from '../data/cartMock.json';

function CartPage() {
  // const { count, results } = mock2;
  const [items, setItems] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const [isAllCheck, setIsAllCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const getCartItems = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('/cart/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      });
      console.log(res);
      const nextItems = res.data.results;
      setItems(nextItems);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAllCheck = (event) => {
    console.log('-> isAllCheck', isAllCheck);
    event.preventDefault();
    if (!isAllCheck) {
      // false: true로 바꿀 거니깐 체크리스트 전부 추가
      console.log(isAllCheck);
      setCheckItems(items.map((item) => item.product_id));
    } else {
      // true: false로 바꿀 거니깐, 체크리스트 초기화
      setCheckItems([]);
    }
    setIsAllCheck(!isAllCheck);
  };

  // 개별 체크
  const handleItemCheck = (id, isChecked) => {
    console.log(id, isChecked);

    if (!isChecked) {
      console.log(isChecked);
      setCheckItems((prev) => [...prev, id]);
    } else {
      console.log(isChecked);
      setCheckItems(checkItems.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    console.log(checkItems);
  }, [checkItems]);

  useEffect(() => {
    getCartItems();
  }, []);

  if (!token) {
    return null;
  }

  return (
    <>
      <h2 className={styles['title-page']}>장바구니</h2>
      {!isLoading && (
        <div>
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
                        checked={checkItems.length === items.length}
                        readOnly
                      />
                      <button
                        className={styles['check-box']}
                        onClick={handleAllCheck}
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
                          {checkItems.length === items.length && (
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
            {!isLoading && items.length !== 0 ? (
              <tbody className={styles.content}>
                {items.map((item) => (
                  <tr key={item.product_id}>
                    <td colSpan={5}>
                      <CartItem
                        cartItemId={item['cart_item_id']}
                        productId={item.product_id}
                        quantity={item.quantity}
                        checked={checkItems.includes(item.product_id)}
                        handleCheck={handleItemCheck}
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
      )}

      {items.length !== 0 ? (
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
