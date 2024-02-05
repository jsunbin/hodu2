import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Nav from './Nav';
import Slide from './Slide';
import Footer from './Footer';
import LogoImg from '../assets/Logo-hodu.svg';
import styles from './Layout.module.css';

export function AuthLayout() {
  return (
    <main className={styles['auth-layout']}>
      <h1 className={styles.header}>
        <Link className={styles.logo} to="/#">
          <img src={LogoImg} alt="호두" />
        </Link>
      </h1>
      <Outlet />
    </main>
  );
}

export function SlideLayout() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div>
          <Slide />
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export function WrapLayout() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className={styles.wrap}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export function FullLayout() {
  return (
    <>
      <Nav />
      <main className={styles['full-main']}>
        <div>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
