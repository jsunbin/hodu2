import React, { useEffect, useState } from 'react';
import Input from './Input';
import styles from './Mail.module.css';

const EMAIL_DOMAIN_LIST = [
  '선택하기',
  'naver.com',
  'google.com',
  'kakao.com',
  'nate.com',
  'yahoo.com',
  'hanmail.net',
  'hotmail.com',
];

function Mail({ onChange }) {
  const [email, setEmail] = useState({ user: '', domain: '' });
  const [selected, setSelected] = useState('선택하기');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmail((prevEmail) => ({ ...prevEmail, [name]: value }));
  };

  const handleSelect = (event) => {
    const { value } = event.target;
    setSelected(value);
    handleChange(event);
  };

  useEffect(() => {
    const nextEmail = `${email.user}@${email.domain}`;
    onChange('email', nextEmail);
  }, [email]);

  return (
    <>
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
        name="user"
        className={styles.input}
        title="주문자 이메일 주소를 입력해주세요."
        onChange={handleChange}
      />
      @
      <select
        id="ordManEmailAddrDmn_select"
        className={styles.select}
        title="주문자 이메일 주소 도메인을 선택해주세요."
        name="domain"
        onChange={handleSelect}
        value={selected}
      >
        {EMAIL_DOMAIN_LIST.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}

export default Mail;
