import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import styles from './ModalProvider.module.css';

const ModalContext = createContext(undefined);

function ConfirmModal({ message, closeModal }) {
  return (
    <div className={styles['modal-wrapper']}>
      <article className={styles.modal}>
        <p className={styles['modal-txt']}>{message}</p>
        <div className={styles['btn-group']}>
          <Button
            size="sm"
            appearance="extra"
            className={styles.button}
            onClick={closeModal}
          >
            확인
          </Button>
          <button type="button" className={styles.close} onClick={closeModal}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.14258 18.2842L18.2847 4.14204"
                stroke="#C4C4C4"
                strokeWidth="2"
              />
              <path
                d="M18.1426 18.1421L4.00044 3.99996"
                stroke="#C4C4C4"
                strokeWidth="2"
              />
            </svg>

            <span className="a11y-hidden">닫기</span>
          </button>
        </div>
      </article>
    </div>
  );
}

function Modal({ message, btnTxt, closeModal, onClick }) {
  const { no, yes } = btnTxt;
  return (
    <div className={styles['modal-wrapper']}>
      <article className={styles.modal}>
        <p className={styles['modal-txt']}>{message}</p>
        <div className={styles['btn-group']}>
          <Button
            size="sm"
            appearance="white"
            className={styles.button}
            onClick={closeModal}
          >
            {no}
          </Button>
          <Button
            size="sm"
            appearance="extra"
            className={styles.button}
            onClick={onClick}
          >
            {yes}
          </Button>

          <button type="button" className={styles.close} onClick={closeModal}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.14258 18.2842L18.2847 4.14204"
                stroke="#C4C4C4"
                strokeWidth="2"
              />
              <path
                d="M18.1426 18.1421L4.00044 3.99996"
                stroke="#C4C4C4"
                strokeWidth="2"
              />
            </svg>

            <span className="a11y-hidden">닫기</span>
          </button>
        </div>
      </article>
    </div>
  );
}

export function ModalProvider({ children }) {
  const [values, setValues] = useState({
    type: 'primary',
    isOpen: true,
    message: '',
    btnTxt: {},
    onClick: () => {},
  });
  const location = useLocation();

  const openModal = (type, message, btnTxt, onClick) => {
    setValues({
      type: type,
      isOpen: true,
      message: message,
      btnTxt,
      onClick: onClick,
    });
  };

  const closeModal = () => {
    setValues({
      isOpen: false,
      message: '',
      btnTxt: {},
      onClick: () => {},
    });
  };

  function modal({ isOpen, type, message, btnTxt, onClick }) {
    if (isOpen) {
      openModal(type, message, btnTxt, onClick);
    } else {
      closeModal();
    }
  }

  useEffect(() => {
    setValues({
      isOpen: false,
      message: '',
      btnTxt: {},
      onClick: () => {},
    });
  }, [location]);

  return (
    <ModalContext.Provider value={{ modal }}>
      {children}
      {values.isOpen &&
        (values.type === 'confirm' ? (
          <ConfirmModal message={values.message} closeModal={closeModal} />
        ) : (
          <Modal
            message={values.message}
            btnTxt={values.btnTxt}
            closeModal={closeModal}
            onClick={values.onClick}
          />
        ))}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const modal = useContext(ModalContext);

  if (!modal) {
    throw new Error('반드시 ModalProvider 안에서 사용해야 합니다.');
  }

  return modal;
}
