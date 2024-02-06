import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import axios from '../lib/axios';
import Card from '../components/Card';
import styles from './HomePage.module.css';
import mock from '../data/productsMock.json';

function HomePage() {
  // const items = mock.results;
  const [items, setItems] = useState([]);
  const [endpoint, setEndpoint] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView();

  const getItems = async () => {
    const query = `page=${endpoint.toString()}`;
    try {
      setIsLoading(true);
      const res = await axios.get(`/products/?${query}`);
      const nextItems = res.data.results;
      const next = res.data.next;

      setItems((prevItems) => [...prevItems, ...nextItems]);

      if (next) {
        setEndpoint((prevState) => prevState + 1);
      } else {
        setEndpoint(0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getItemsMore = () => {
    getItems(endpoint);
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (inView && endpoint) {
      console.log(inView, '무한 스크롤 요청 🎃');

      getItemsMore();
    }
  }, [inView]);

  return (
    <>
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
      {!isLoading && <div ref={ref}></div>}
    </>
  );
}

export default HomePage;
