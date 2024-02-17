import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { useModal } from '../contexts/ModalProvider';
import axios from '../lib/axios';
import Button from '../components/Button';
import Price from '../components/Price';
import HorizontalRule from '../components/HorizontalRule';
import Amount from '../components/Amount';
import TabMenu from '../components/TabMenu';
import styles from './ProductDetailsPage.module.css';

function ProductDetailsPage() {
  const [item, setItem] = useState({});
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { productId } = useParams();
  const { token } = useAuth();
  const { modal } = useModal();

  const handleCartClick = async () => {
    const res = await getCartList();
    const { results } = res;

    if (!results) return;

    const isItemsInResults = results.find(
      (v) => v.product_id === Number(productId),
    );

    if (isItemsInResults) {
      modal({
        isOpen: true,
        message: (
          <span>
            이미 장바구니에 있는 상품입니다. <br />
            장바구니로 이동하시겠습니까?
          </span>
        ),
        btnTxt: { no: '아니오', yes: '예' },
        onClick: () => {
          navigate('/cart');
        },
      });
    } else {
      await addItemToCart();
      modal({
        type: 'confirm',
        isOpen: true,
        message: '장바구니에 상품이 담겼습니다',
      });
    }
  };

  const getItem = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/products/${productId}/`);
      const nextItem = res.data;

      setItem(nextItem);
      setPrice(nextItem.price);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCartList = async () => {
    const res = await axios.get('/cart/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    });

    return res.data;
  };

  const addItemToCart = async (check) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        '/cart/',
        { product_id: productId, quantity: amount, check: check },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
        },
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { price } = item;
    const nextPrice = price * amount;
    setPrice(nextPrice);
  }, [amount]);

  useEffect(() => {
    getItem();
  }, []);

  return (
    !isLoading && (
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
              <Button
                className="button"
                size="mid"
                style={{ width: 416 + 'px' }}
              >
                바로구매
              </Button>
              <Button
                className="button"
                size="mid"
                appearance="dark"
                onClick={handleCartClick}
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
    )
  );
}

export default ProductDetailsPage;
