import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { useModal } from '../contexts/ModalProvider';
import { useOrder } from '../contexts/OrderItemProvider';
import axios from '../lib/axios';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import styles from './CartPage.module.css';
import mock2 from '../data/cartMock.json';

function CartPage() {
  // const { count, results } = mock2;
  const [items, setItems] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isAllCheck, setIsAllCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { modal } = useModal();
  const { setOrderItems } = useOrder();

  const handleOrderClick = async (event) => {
    event.preventDefault();
    setOrderItems(checkedItems);

    const query = `type=cart`;
    navigate(`/order?${query}`);
  };

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
    event.preventDefault();

    if (items.length !== 0 && checkedItems.length !== items.length) {
      // 현재: 체크 안됨 -> 체크 V
      setCheckItems(items.map((item) => item.product_id));

      setCheckedItems(
        items.map((item) => ({
          productId: item.product_id,
          amount: item.quantity,
          price: item?.price,
          shippingFee: item?.shippingFee,
        })),
      );
    } else {
      // 현재: 체크 -> 체크 해제
      setCheckItems([]);
      setCheckedItems([]);
    }
    setIsAllCheck(!isAllCheck);
  };

  // 개별 체크
  const handleItemCheck = (item, isChecked) => {
    const { productId, quantity, price, shippingFee } = item;
    if (!isChecked) {
      // 현재: 체크 안됨 -> 체크 V
      setCheckItems((prev) => [...prev, productId]);
      setCheckedItems((prevState) => [
        ...prevState,
        {
          productId: productId,
          amount: quantity,
          price: price,
          shippingFee: shippingFee,
        },
      ]);
    } else {
      setCheckItems(checkItems.filter((item) => item !== productId));
      setCheckedItems(
        checkedItems.filter((item) => item.productId !== productId),
      );
    }
  };

  const updateCheckedItemsById = (productId, newPrice, newShippingFee) => {
    setCheckedItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.productId === productId) {
          return { ...item, price: newPrice, shippingFee: newShippingFee };
        }
        return item;
      });
    });
  };

  // 상품 삭제
  const handleDeleteItemClick = (productId, cartItemId) => {
    deleteCartItem(cartItemId).then(modal({ isOpen: false }));
    setItems((prevItem) =>
      prevItem.filter((v) => v['product_id'] !== productId),
    );
    setCheckItems((prevItem) => [...prevItem.filter((v) => v !== productId)]);
    setCheckedItems((prevItem) => [
      ...prevItem.filter((v) => v.productId !== productId),
    ]);
  };

  const deleteCartItem = async (cartItemId) => {
    try {
      const res = await axios.delete(`/cart/${cartItemId}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const [total, setTotal] = useState({ product: 0, shippingFee: 0, toPay: 0 });

  useEffect(() => {
    console.log(checkItems);
    console.log(checkedItems);

    const productTotal = checkedItems.reduce((acc, item) => {
      return acc + item.amount * item.price;
    }, 0);

    const shippingFeeTotal = checkedItems.reduce((acc, item) => {
      return acc + item.shippingFee;
    }, 0);

    const toPayTotal = productTotal + shippingFeeTotal;

    setTotal({
      product: productTotal,
      shippingFee: shippingFeeTotal,
      toPay: toPayTotal,
    });
  }, [checkedItems]);

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
                        checked={checkedItems.length === items.length}
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
                          {checkedItems.length === items.length && (
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
                        checked={checkedItems.some(
                          (el) => el.productId === item.product_id,
                        )}
                        allChecked={checkedItems.length === items.length}
                        handleDelete={handleDeleteItemClick}
                        handleCheck={handleItemCheck}
                        handleChange={updateCheckedItemsById}
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
                <strong>{total.product || 0}</strong>원
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
                <strong>{total.shippingFee || 0}</strong>원
              </span>
            </div>
            <div className={styles['sum-price']}>
              결제 예정 금액
              <span>
                <strong>{total.toPay || 0}</strong>원
              </span>
            </div>
          </section>
          <Button size="large" onClick={handleOrderClick}>
            주문하기
          </Button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default CartPage;
