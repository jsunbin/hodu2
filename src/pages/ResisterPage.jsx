import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './ResisterPage.module.css';

function ResisterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');

  const handleTypeChange = (userType) => {
    setSearchParams({ type: userType });
  };

  return (
    <div className={styles['auth-form-wrap']}>
      <ul className={styles['option-ul']} role="tablist">
        <li role="tab">
          <button
            className={`${styles['option-buyer']} ${styles['on']}`}
            onClick={() => handleTypeChange(`user`)}
          >
            <span className={styles['option-text']}>구매회원가입</span>
          </button>
        </li>
        <li role="tab">
          <button
            className={styles['option-seller']}
            onClick={() => handleTypeChange(`seller`)}
          >
            <span className={styles['option-text']}>판매회원가입</span>
          </button>
        </li>
      </ul>
      <form className={styles['resister-form']}>
        <div className={styles['form-section']}>
          <div className={styles['form-list']}>
            <div className={`${styles.item} ${styles.confirm}`}>
              <Label htmlFor="id">아이디</Label>
              <Input
                id="id"
                className={`${styles.input} ${styles.confirm}`}
                name="id"
                type="text"
              />
              <Button className={`${styles.button} button`} size="ms">
                중복확인
              </Button>
            </div>
            <div className={`${styles.item} ${styles.filled}`}>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                className={styles.input}
                name="password"
                type="password"
                autoComplete="off"
              />
              <span className={styles.filled}></span>
            </div>
            <div className={`${styles.item} ${styles.filled}`}>
              <Label htmlFor="confirmPassword">비밀번호 재확인</Label>
              <Input
                id="confirmPassword"
                className={styles.input}
                name="confirmPassword"
                type="password"
                autoComplete="off"
              />
              <span className={styles.filled}></span>
            </div>
          </div>

          <div className={styles['form-list']}>
            <div className={styles.item}>
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                className={styles.input}
                name="name"
                type="text"
                maxLength="20"
              />
            </div>
            <div className={styles.item}>
              <Label htmlFor="phoneNo">휴대폰번호</Label>
              <Input
                id="phoneNo"
                className={styles.input}
                name="phoneNo"
                type="tel"
                maxLength="16"
              />
            </div>
            <div className={styles.item}>
              <Label htmlFor="email">이메일</Label>
              <div className={styles['input-group']}>
                <Input
                  id="email"
                  className={`${styles.input} ${styles.domain}`}
                  name="email"
                  type="tel"
                  maxLength="16"
                />
                <span>@</span>
                <label>
                  <select className={styles['domain-select']}>
                    <option value>선택해주세요.</option>
                    <option value="naver.com">naver.com</option>
                    <option value="hanmail.net">hanmail.net</option>
                    <option value="daum.net">daum.net</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="nate.com">nate.com</option>
                    <option value="_manual">직접입력</option>
                  </select>
                </label>
                <button
                  className={`${styles['domain-expand']}`}
                  aria-label="초기화"
                  type="button"
                  tabIndex="-1"
                >
                  <svg
                    className="icon"
                    width="10"
                    height="10"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path fillRule="evenodd" d="M0 3l5 5 5-5z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={styles['agree-box']}>
            <input
              type="checkbox"
              id="agreeAll"
              className="a11y-hidden"
              readOnly
            />
            <label htmlFor="agreeAll" className={styles['check-label']}>
              <p className={styles['agree-text']}>
                호두샵의 <Link to="/#">이용약관</Link> 및{' '}
                <Link to="/#">개인정보처리방침</Link>에 대한 내용을 확인하였고
                동의합니다.
              </p>
            </label>
          </div>

          <Button className="button" size="mid" disabled={true}>
            가입하기
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResisterPage;
