import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Label from '../components/Label.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { MoreList } from '../components/Footer';
import styles from './LoginPage.module.css';

function LoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');

  const handleTypeChange = (userType) => {
    setSearchParams({ type: userType });
  };

  return (
    <>
      <div className={styles['auth-form-wrap']}>
        <ul className={styles['option-ul']} role="tablist">
          <li role="tab">
            <button
              className={`${styles['option-buyer']} ${styles['on']}`}
              onClick={() => handleTypeChange(`user`)}
            >
              <span className={styles['option-text']}>구매회원 로그인</span>
            </button>
          </li>
          <li role="tab">
            <button
              className={styles['option-seller']}
              onClick={() => handleTypeChange(`seller`)}
            >
              <span className={styles['option-text']}>판매회원 로그인</span>
            </button>
          </li>
        </ul>
        <form className={styles['login-form']}>
          <Label className="a11y-hidden" htmlFor="id">
            아이디
          </Label>
          <Input
            id="id"
            className={styles.input}
            name="id"
            type="text"
            placeholder="아이디"
            page={'login'}
          />

          <Label className="a11y-hidden" htmlFor="password">
            비밀번호
          </Label>
          <Input
            id="password"
            className={styles.input}
            name="password"
            type="password"
            placeholder="비밀번호"
            page={'login'}
          />
          <Button className="button" size="mid">
            로그인
          </Button>
        </form>
      </div>
      <div>
        <MoreList type="login" />
      </div>
    </>
  );
}

export default LoginPage;
