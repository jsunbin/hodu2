import React from 'react';
import styles from './Card.module.css';
import Price from './Price';
function Card({ productId, title, price, image, seller }) {
  return (
    <article className={styles.card}>
      <a href={`/#/${productId}`} className="product-link" rel="noreferrer">
        <div className={styles.thumbnail}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.info}>
          <span className={styles.seller}>{seller}</span>
          <h3 className={styles.title}>{title}</h3>
          <Price price={price} />
        </div>
      </a>
    </article>
  );
}

export default Card;
