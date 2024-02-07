import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import Label from './Label';
import LogoImg from '../assets/Logo-hodu.svg';
import styles from './Nav.module.css';

function Nav() {
  /** @TODO 서버에서 정보 가져오기 */
  const { token } = useAuth();
  const page = false;

  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.start}>
          <Link to="/#">
            <img className={styles.logo} src={LogoImg} alt="호두" />
          </Link>
          <form className={styles.search}>
            <Label className="a11y-hidden" htmlFor="search">
              상품 검색
            </Label>
            <input id="search" type="text" placeholder="상품을 검색해보세요!" />
            <button className="btn-search" type="submit">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8333 22.1667C17.988 22.1667 22.1667 17.988 22.1667 12.8333C22.1667 7.67868 17.988 3.5 12.8333 3.5C7.67868 3.5 3.5 7.67868 3.5 12.8333C3.5 17.988 7.67868 22.1667 12.8333 22.1667Z"
                  stroke="#21BF48"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24.4998 24.5L19.4248 19.425"
                  stroke="#21BF48"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="a11y-hidden">검색하기</span>
            </button>
          </form>
        </div>
        <div className={styles['menu-list']}>
          {token ? (
            <>
              <Link
                to="cart"
                className={`${styles.menu} ${styles.cart} ${
                  page ? styles.active : ''
                }`}
              >
                장바구니
              </Link>
              <Link
                to="/#"
                className={`${styles.menu} ${styles.user} ${
                  page ? styles.active : ''
                }`}
              >
                마이페이지
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/cart"
                className={`${styles.menu} ${styles.cart} ${styles.active}`}
              >
                장바구니
              </Link>
              <Link to="/login" className={`${styles.menu} ${styles.login}`}>
                로그인
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Nav;
