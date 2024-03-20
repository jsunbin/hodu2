import React from 'react';
import { Link } from 'react-router-dom';
import Price from './Price';
import styles from './Card.module.css';

function Card({ productId, title, price, image, seller, size = 'regular' }) {
  return (
    <article className={`${styles.card} ${styles[size]}`}>
      <Link
        to={`/goods/${productId}`}
        className="product-link"
        rel="noreferrer"
      >
        <div className={`${styles.thumbnail} ${styles[size]}`}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.info}>
          <span className={styles.seller}>{seller}</span>
          <h3 className={styles.title}>{title}</h3>
          <Price price={price} size={size} />
        </div>
      </Link>
    </article>
  );
}

export default Card;
