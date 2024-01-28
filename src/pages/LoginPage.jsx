import React from 'react';
import Label from '../components/Label.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import LogoImg from '../assets/Logo-hodu.svg';
import styles from './LoginPage.module.css';

function LoginPage() {
  return (
    <main className={styles['login-layout']}>
      <h1 className={styles.header}>
        <a className={styles.logo} href="/#">
          <img src={LogoImg} alt="호두" />
        </a>
      </h1>

      <div className={styles['login-form-wrap']}>
        <ul className={styles['option-ul']} role="tablist">
          <li role="tab">
            <a
              href="/#none"
              className={`${styles['option-buyer']} ${styles['on']}`}
            >
              <span className={styles['option-text']}>구매회원 로그인</span>
            </a>
          </li>
          <li role="tab">
            <a href="/#none" className={styles['option-seller']}>
              <span className={styles['option-text']}>판매회원 로그인</span>
            </a>
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
          <Button className={'button'} appearance={'mid-button'}>
            로그인
          </Button>
        </form>
      </div>

      <div>
        <ul className={styles['more-ul']}>
          <li>
            <a href="/#">회원가입</a>
          </li>
          <li>
            <a href="/#">비밀번호 찾기</a>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default LoginPage;
