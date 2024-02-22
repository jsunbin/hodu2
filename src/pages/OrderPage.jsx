import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useOrder } from '../contexts/OrderItemProvider';
import Mail from '../components/Mail';
import OrderItem from '../components/OrderItem';
import Button from '../components/Button';
import Input from '../components/Input';
import HorizontalRule from '../components/HorizontalRule';
import styles from './OrderPage.module.css';
import mock from '../data/cartItemListMock.json';

const INITIAL_VALUES = {
  product_id: 0,
  quantity: 0,
  order_kind: 'direct_order',
  receiver: '',
  receiver_phone_number: '',
  address: '',
  address_message: '',
  payment_method: '',
  total_price: 0,
};

function OrderPage() {
  // const items = mock;
  const { orders, totalPrice } = useOrder();
  const [items, setItems] = useState([]);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [phone, setPhone] = useState(['', '', '']);
  const [address, setAddress] = useState({
    postal: '',
    address1: '',
    address2: '',
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');

  const handleChangeValues = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    handleChangeValues(name, value);
  };

  const handleChangePhoneNumber = (event) => {
    const { name, value } = event.target;

    const nextPhone = [...phone];

    if (name === 'phone1') {
      nextPhone[0] = value;
    } else if (name === 'phone2') {
      nextPhone[1] = value;
    } else if (name === 'phone3') {
      nextPhone[2] = value;
    }

    setPhone(nextPhone);
    handleChangeValues('receiver_phone_number', nextPhone.join(''));
  };

  const handlePostal = (event) => {
    event.preventDefault();
  };

  const handleChangeAddress = (event) => {
    const { name, value } = event.target;

    setAddress((prev) => ({ ...prev, [name]: value }));
    handleChangeValues('address', `${address.address1}, ${address.address2}`);
  };

  useEffect(() => {
    setItems(orders || []);
  }, [orders]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <>
      <h2 className={styles['title-page']}>주문/결제하기</h2>
      <div className={styles.contents}>
        <table className={styles.table}>
          <caption className="a11y-hidden">주문내역</caption>
          <thead>
            <tr>
              <th scope="col" colSpan={2}>
                상품정보
              </th>
              <th scope="col">할인</th>
              <th scope="col">배송비</th>
              <th scope="col">주문금액</th>
            </tr>
          </thead>
          {items && items.length !== 0 && (
            <tbody className={styles.products}>
              {items.map((item) => (
                <OrderItem
                  cartItemId={item['cart_item_id']}
                  productId={item.productId}
                  quantity={item.amount}
                />
              ))}
            </tbody>
          )}
        </table>

        <div className={styles['total-price']}>
          총 주문금액
          <strong>{totalPrice}원</strong>
        </div>

        <form className={styles['order-form']}>
          <h3 className={styles['sub-title']}>배송정보</h3>
          <HorizontalRule />
          <h4 className={styles['sub-title2']}>주문자 정보</h4>
          <table className={styles['input-table']}>
            <tbody>
              <tr>
                <th scope="row">이름</th>
                <td>
                  <Input className={styles.input} appearance="order" />
                </td>
              </tr>
              <tr>
                <th scope="row">휴대폰</th>
                <td>
                  <Input className={styles.input} appearance="number" />
                  -
                  <Input className={styles.input} appearance="number" />
                  -
                  <Input className={styles.input} appearance="number" />
                </td>
              </tr>

              <tr>
                <th scope="row">이메일</th>
                <td>
                  <Mail onChange={handleChangeValues} />
                </td>
              </tr>
            </tbody>
          </table>
          <h4 className={styles['sub-title2']}>배송지 정보</h4>
          <table className={styles['input-table']}>
            <tbody>
              <tr>
                <th scope="row">수령인</th>
                <td>
                  <Input
                    className={styles.input}
                    id="receiver"
                    name="receiver"
                    value={values.name}
                    onChange={handleChange}
                    appearance="order"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">휴대폰</th>
                <td>
                  <Input
                    className={styles.input}
                    id="phone1"
                    name="phone1"
                    maxLength={3}
                    onChange={handleChangePhoneNumber}
                    appearance="number"
                  />
                  -
                  <Input
                    className={styles.input}
                    id="phone2"
                    name="phone2"
                    maxLength={4}
                    onChange={handleChangePhoneNumber}
                    appearance="number"
                  />
                  -
                  <Input
                    className={styles.input}
                    id="phone3"
                    name="phone3"
                    maxLength={4}
                    onChange={handleChangePhoneNumber}
                    appearance="number"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">배송주소</th>
                <td className={styles.address}>
                  <Input
                    className={styles.input}
                    id="postal"
                    name="postal"
                    value={address.postal}
                    onClick={handleChangeAddress}
                    appearance="number"
                  />
                  <Button size="sm" onClick={handlePostal}>
                    우편번호 조회
                  </Button>
                  <div className={styles['address-box']}>
                    <Input
                      className={styles.input}
                      appearance="long"
                      type="hidden"
                      readOnly
                    />
                    <Input
                      className={styles['address-txt']}
                      name="address1"
                      value={address.address1}
                      onChange={handleChangeAddress}
                      appearance="long"
                    />
                  </div>
                  <Input
                    className={styles.input}
                    name="address2"
                    value={address.address2}
                    onChange={handleChangeAddress}
                    appearance="long"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">배송메시지</th>
                <td>
                  <Input
                    className={styles.input}
                    name="address_message"
                    onChange={handleChange}
                    appearance="long"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className={styles['order-payment-box']}>
            <div className={styles.left}>
              <h3 className={styles['sub-title']}>결제수단</h3>
              <ul className={styles['pay-method']}>
                <li>
                  <input
                    type="radio"
                    id="payMethodCard"
                    value="CARD"
                    name="select-pay-method"
                  />
                  <label htmlFor="payMethodCard">신용/체크카드</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="payMethodBank"
                    value="DEPOSIT"
                    name="select-pay-method"
                  />
                  <label htmlFor="payMethodBank">무통장 입금</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="payMethodPhone"
                    value="PHONE_PAYMENT"
                    name="select-pay-method"
                  />
                  <label htmlFor="payMethodPhone">휴대폰 결제</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="payMethodNaverPay"
                    value="NAVERPAY"
                    name="select-pay-method"
                  />
                  <label htmlFor="payMethodNaverPay">네이버페이</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="payMethodKakaoPay"
                    value="KAKAOPAY"
                    name="select-pay-method"
                  />
                  <label htmlFor="payMethodKakaoPay">카카오페이</label>
                </li>
              </ul>
            </div>

            <div className={styles.right}>
              <h3 className={styles['sub-title']}>최종 결제정보</h3>
              <div className={styles['total-payment-box']}>
                <ul className={styles['total-order']}>
                  <li>
                    <span className={styles['txt-title']}>총 상품금액</span>
                    <span className={styles['txt-cont']}>
                      <strong className={styles['txt-num']}>45000</strong>원
                    </span>
                  </li>
                  <li>
                    <span className={styles['txt-title']}>할인금액</span>
                    <span className={styles['txt-cont']}>
                      <strong className={styles['txt-num']}>0</strong>원
                    </span>
                  </li>
                  <li className={styles.delivery}>
                    <span className={styles['txt-title']}>배송비</span>
                    <span className={styles['txt-cont']}>
                      <strong className={styles['txt-num']}>5000</strong>원
                    </span>
                  </li>
                  <HorizontalRule />
                  <li className={styles.total}>
                    <span className={styles['txt-title']}>최종 결제금액</span>
                    <span className={styles['txt-cont']}>
                      <strong className={styles['txt-num']}>50000</strong>원
                    </span>
                  </li>
                </ul>
                <div className={styles.pay}>
                  <div className={styles['agree-box']}>
                    <input
                      type="checkbox"
                      id="agreeAll"
                      className="a11y-hidden"
                      readOnly
                    />
                    <label htmlFor="agreeAll" className={styles['check-label']}>
                      <p className={styles['agree-text']}>
                        주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
                      </p>
                    </label>
                  </div>

                  <Button size="large" disabled>
                    결제하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default OrderPage;
