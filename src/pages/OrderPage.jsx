import React from 'react';
import OrderItem from '../components/OrderItem';
import Button from '../components/Button';
import Input from '../components/Input';
import HorizontalRule from '../components/HorizontalRule';
import styles from './OrderPage.module.css';
import mock from '../data/cartItemListMock.json';

function OrderPage() {
  const items = mock;
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
          <tbody className={styles.products}>
            {items.map((item) => (
              <OrderItem
                cartItemId={item['cart_item_id']}
                productId={item.product_id}
                quantity={item.quantity}
              />
            ))}
          </tbody>
        </table>

        <div className={styles['total-price']}>
          총 주문금액
          <strong>20000원</strong>
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
                  <Input
                    type="hidden"
                    id="ordManEmailAddr"
                    name="ordManEmailAddr"
                    title="주문자 이메일 주소를 입력해주세요."
                  />
                  <Input
                    appearance="email"
                    type="text"
                    id="ordManEmailAddrId"
                    className={styles.input}
                    title="주문자 이메일 주소를 입력해주세요."
                  />
                  @{' '}
                  <select
                    id="ordManEmailAddrDmn_select"
                    className={styles.select}
                    title="주문자 이메일 주소 도메인을 선택해주세요."
                  >
                    <option value="">직접 입력하기</option>
                    <option value="naver.com" selected="selected">
                      naver.com
                    </option>
                    <option value="hanmail.net">hanmail.net</option>
                    <option value="nate.com">nate.com</option>
                    <option value="yahoo.co.kr">yahoo.co.kr</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="hotmail.com">hotmail.com</option>
                  </select>
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
                <th scope="row">배송주소</th>
                <td className={styles.address}>
                  <Input className={styles.input} appearance="email" />
                  <Button size="sm">우편번호 조회</Button>
                  <div className={styles['address-box']}>
                    <Input
                      className={styles.input}
                      appearance="long"
                      type="hidden"
                      readOnly
                    />
                    <p className={styles['address-txt']}>서울특별시</p>
                  </div>
                  <Input className={styles.input} appearance="long" />
                </td>
              </tr>
              <tr>
                <th scope="row">배송메시지</th>
                <td>
                  <Input className={styles.input} appearance="long" />
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
