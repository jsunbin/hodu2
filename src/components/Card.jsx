import React from 'react';
import styles from './Card.module.css';
import Price from './Price';
import { Link } from 'react-router-dom';
function Card({ productId, title, price, image, seller }) {
  return (
    <article className={styles.card}>
      <Link
        to={`/goods/${productId}`}
        className="product-link"
        rel="noreferrer"
      >
        <div className={styles.thumbnail}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.info}>
          <span className={styles.seller}>{seller}</span>
          <h3 className={styles.title}>{title}</h3>
          <Price price={price} />
        </div>
      </Link>
    </article>
  );
}

export default Card;
