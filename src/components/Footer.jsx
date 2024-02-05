import React from 'react';
import styles from './Footer.module.css';

export function MoreList() {
  const type = 'login';

  const items = {
    primary: [
      { title: '호두샵 소개', url: '/#' },
      { title: '이용약관', url: '/#' },
      { title: '개인정보처리방침', url: '/#' },
      { title: '전자금융거래약관', url: '/#' },
      { title: '청소년보호정책', url: '/#' },
      { title: '제휴문의', url: '/#' },
    ],
    login: [
      { title: '회원가입', url: '/register' },
      { title: '비밀번호 찾기', url: '/#' },
    ],
  };

  return (
    <ul className={`${styles.ul} ${styles[type]}`}>
      {items[type].map((item) => {
        return (
          <li key={item.title}>
            {item.title === '개인정보처리방침' ? (
              <a href="/#">
                <strong>{item.title}</strong>
              </a>
            ) : (
              <a href={item.url}>{item.title}</a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.more}>
          <MoreList />
          <div>
            <a
              href="https://www.instagram.com/weniv_official/"
              className={`${styles.sns} instagram`}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="15.5"
                  fill="#767676"
                  stroke="#767676"
                />
                <g clipPath="url(#clip0_3945_4341)">
                  <path
                    d="M20.167 7.66675H11.8337C9.53247 7.66675 7.66699 9.53223 7.66699 11.8334V20.1667C7.66699 22.4679 9.53247 24.3334 11.8337 24.3334H20.167C22.4682 24.3334 24.3337 22.4679 24.3337 20.1667V11.8334C24.3337 9.53223 22.4682 7.66675 20.167 7.66675Z"
                    stroke="#F2F2F2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.3337 15.475C19.4366 16.1685 19.3181 16.8769 18.9952 17.4992C18.6723 18.1215 18.1614 18.6262 17.5351 18.9414C16.9088 19.2566 16.1991 19.3663 15.5069 19.2549C14.8147 19.1436 14.1752 18.8167 13.6794 18.321C13.1837 17.8252 12.8569 17.1857 12.7455 16.4935C12.6341 15.8013 12.7438 15.0916 13.059 14.4653C13.3742 13.8391 13.8789 13.3281 14.5012 13.0052C15.1236 12.6823 15.8319 12.5638 16.5254 12.6667C17.2328 12.7716 17.8878 13.1012 18.3935 13.6069C18.8992 14.1126 19.2288 14.7676 19.3337 15.475Z"
                    stroke="#F2F2F2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.583 11.4167H20.5913"
                    stroke="#F2F2F2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3945_4341">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(6 6)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/Jejucoding/"
              className={`${styles.sns} facebook`}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="16" fill="#767676" />
                <rect
                  width="20"
                  height="20"
                  transform="translate(5 6)"
                  fill="#767676"
                />
                <path
                  d="M19.9997 7.66669H17.4997C16.3946 7.66669 15.3348 8.10567 14.5534 8.88708C13.772 9.66848 13.333 10.7283 13.333 11.8334V14.3334H10.833V17.6667H13.333V24.3334H16.6663V17.6667H19.1663L19.9997 14.3334H16.6663V11.8334C16.6663 11.6123 16.7541 11.4004 16.9104 11.2441C17.0667 11.0878 17.2787 11 17.4997 11H19.9997V7.66669Z"
                  fill="#F2F2F2"
                />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@jejucodingcamp"
              className={`${styles.sns} youtube`}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="16" fill="#767676" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24.199 10.2994C24.4829 10.5921 24.6845 10.9544 24.7835 11.3499C25.0478 12.8155 25.1762 14.3024 25.1668 15.7916C25.1721 17.2585 25.0438 18.7229 24.7835 20.1666C24.6845 20.5621 24.4829 20.9244 24.199 21.2171C23.9152 21.5097 23.5591 21.7223 23.1668 21.8333C21.7335 22.2166 16.0002 22.2166 16.0002 22.2166C16.0002 22.2166 10.2668 22.2166 8.83348 21.8333C8.44917 21.7281 8.09847 21.5256 7.81527 21.2453C7.53207 20.965 7.32595 20.6165 7.21682 20.2333C6.95246 18.7677 6.82413 17.2808 6.83348 15.7916C6.82618 14.3135 6.9545 12.8379 7.21682 11.3833C7.31581 10.9878 7.51741 10.6254 7.80127 10.3328C8.08513 10.0401 8.44119 9.82757 8.83348 9.71659C10.2668 9.33325 16.0002 9.33325 16.0002 9.33325C16.0002 9.33325 21.7335 9.33325 23.1668 9.68325C23.5591 9.79424 23.9152 10.0068 24.199 10.2994ZM18.9168 15.7917L14.1251 18.5167V13.0667L18.9168 15.7917Z"
                  fill="#F2F2F2"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.details}>
          <strong>(주)HODU SHOP</strong>
          <span>제주특별자치도 제주시 동광고 137</span>
          <span>
            제주코딩베이스캠프 사업자 번호 : 000-0000-0000 | 통신판매업
          </span>
          <span>대표 : 김호두</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
