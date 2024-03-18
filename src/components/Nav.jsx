import React, { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import Label from './Label';
import LogoImg from '../assets/Logo-hodu.svg';
import styles from './Nav.module.css';

function MyPage({ onClick }) {
  const handleLogoutClick = () => {
    onClick();
  };
  return (
    <div className={styles['my-page']}>
      <div className={styles.arrow}></div>

      <ul className={styles.list}>
        <li>
          <span>마이페이지</span>
        </li>
        <li>
          <span onClick={handleLogoutClick}>로그아웃</span>
        </li>
      </ul>
    </div>
  );
}

function Nav() {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [isUserOpen, setIsUserOpen] = useState(false);
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const location = useLocation();
  const cart = location.pathname === '/cart';

  const handleChange = (event) => {
    event.preventDefault();

    const { value } = event.target;
    setSearchValue(value);
  };

  const handleSearchClick = (event) => {
    event.preventDefault();

    if (searchValue && searchValue !== '') {
      navigate(`/search?query=${searchValue}`);
    }
  };

  const handleMyPageClick = () => {
    setIsUserOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
    navigate('/#');
  };

  useEffect(() => {
    const initQuery = searchParams.get('query');
    setSearchValue(initQuery);
  }, [searchParams]);

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
            <input
              id="search"
              value={searchValue}
              type="text"
              placeholder="상품을 검색해보세요!"
              autoComplete="off"
              onChange={handleChange}
            />
            <button
              className="btn-search"
              type="submit"
              onClick={handleSearchClick}
            >
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
                  cart ? styles.active : ''
                }`}
              >
                장바구니
              </Link>
              <button
                className={`${styles.menu} ${styles.user} ${
                  isUserOpen ? styles.active : ''
                }`}
                onClick={handleMyPageClick}
              >
                마이페이지
              </button>
              {isUserOpen && <MyPage onClick={handleLogout} />}
            </>
          ) : (
            <>
              <Link
                to="/cart"
                className={`${styles.menu} ${styles.cart} ${
                  cart ? styles.active : ''
                }`}
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
