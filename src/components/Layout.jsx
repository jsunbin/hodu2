import React from 'react';
import { Outlet } from 'react-router-dom';
import LogoImg from '../assets/Logo-hodu.svg';
import styles from './Layout.module.css';

export default function AuthLayout() {
  return (
    <main className={styles['auth-layout']}>
      <h1 className={styles.header}>
        <a className={styles.logo} href="/#">
          <img src={LogoImg} alt="호두" />
        </a>
      </h1>
      <Outlet />
    </main>
  );
}
