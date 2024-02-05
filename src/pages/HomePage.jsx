import React from 'react';
import Card from '../components/Card';
import styles from './HomePage.module.css';
import mock from '../data/productsMock.json';

function HomePage() {
  const items = mock.results;

  return (
    <section className={styles.section}>
      <ul className={styles.items}>
        {items.map((item) => {
          return (
            <li key={item.product_id}>
              <Card
                productId={item.product_id}
                title={item.product_name}
                price={item.price}
                image={item.image}
                seller={item.store_name}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default HomePage;
