import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useModal } from '../contexts/ModalProvider';
import { useOrder } from '../contexts/OrderItemProvider';
import axios from '../lib/axios';
import Amount from './Amount';
import Button from './Button';
import styles from './CartItem.module.css';
import mock581 from '../data/productDetailsMock.json';
import mock583 from '../data/product583Mock.json';

function CartItem({
  cartItemId,
  productId,
  quantity,
  checked,
  allChecked,
  handleDelete,
  handleCheck,
  handleChange,
}) {
  // const item = productId === 271 ? mock581 : mock583;
  const [item, setItem] = useState({});
  const [isChecked, setIsChecked] = useState(checked);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { modal } = useModal();
  const { setOrderItems } = useOrder();

  const handleOrderClick = (event) => {
    setOrderItems([
      {
        productId,
        amount: quantity,
        price: item?.price,
        shippingFee: item.shipping_fee === 0 ? '무료배송' : item.shipping_fee,
      },
    ]);

    const query = `type=cart_one&product=${productId}`;
    navigate(`/order?${query}`);
  };

  const handleCheckBoxClick = (event) => {
    event.preventDefault();
    handleCheck(
      {
        productId,
        quantity,
        price: item?.price,
        shippingFee: item?.shipping_fee,
      },
      checked,
    );
    setIsChecked(!isChecked);
  };

  const handleDeleteClick = (event) => {
    event.preventDefault();
    modal({
      isOpen: true,
      message: '상품을 삭제하시겠습니까?',
      btnTxt: {
        no: '취소',
        yes: '확인',
      },
      onClick: () => handleDelete(productId, cartItemId),
    });
  };

  const getItem = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/products/${productId}/`);
      const nextItem = res.data;

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

  useEffect(() => {
    // 체크 되어 잇을 때만!
    if (checked) {
      handleChange(productId, item?.price, item?.shipping_fee);
    }
  }, [allChecked, checked]);

  return (
    !isLoading && (
      <article className={styles['cart-item']}>
        <div className={styles.product}>
          <div className={styles.check}>
            <label>
              <input
                title={`${item.product_name}을 결제상품으로 설정`}
                type="checkbox"
                className="a11y-hidden"
                checked={checked}
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
                  {checked && <circle cx="10" cy="10" r="6" fill="#21BF48" />}
                </svg>
              </button>
            </label>
          </div>

          <div className={styles['product-img']}>
            <Link to={`/goods/${productId}`}>
              <img src={item.image} alt={item.product_name} />
            </Link>
          </div>

          <div className={styles['product-name']}>
            <div className={styles.brand}>{item.store_name}</div>
            <div className={styles.title}>
              <Link to={`/goods/${productId}`}>{item.product_name}</Link>
            </div>
            <div className={styles.price}>{item.price}</div>
            <div className={styles.delivery}>
              {item.shipping_method} /{' '}
              {item.shipping_fee === 0 ? '무료배송' : item.shipping_fee}
            </div>
          </div>

          <div className={styles['product-amount']}>
            <Amount amount={quantity} max={item.stock} />
          </div>

          <div className={styles['product-total']}>
            <div className={styles.price}>{quantity * item?.price}원</div>
            <Button size="sm" onClick={handleOrderClick}>
              주문하기
            </Button>
          </div>
        </div>
        <div className={styles['btn-delete']}>
          <button type="button" onClick={handleDeleteClick}>
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
    )
  );
}

export default CartItem;
