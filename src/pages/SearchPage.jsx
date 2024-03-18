import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../lib/axios';
import Card from '../components/Card';
import HorizontalRule from '../components/HorizontalRule';
import styles from './SearchPage.module.css';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(null);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [endpoint, setEndpoint] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const search = async () => {
    const query = `page=${endpoint.toString()}&search=${keyword}`;

    console.log('searchAPI');
    try {
      setIsLoading(true);
      const res = await axios.get(`/products/?${query}`);
      console.log(res);
      const nextItems = res.data.results;
      const next = res.data.next;
      const count = res.data.count;

      setItems((prevState) => [...prevState, ...nextItems]);
      setCount(count);

      if (next) {
        setEndpoint((prevState) => prevState + 1);
      } else {
        setEndpoint(1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initKeyword = searchParams.get('query');
    setKeyword(initKeyword);
  }, [searchParams]);

  useEffect(() => {
    search();
    return () => {
      setItems([]);
    };
  }, [keyword]);

  return (
    <>
      <h2 className={styles['search-title']}>
        <strong>'{keyword}'</strong> 검색결과 (전체 <span>{count}개</span>의
        상품)
      </h2>
      {!isLoading && (
        <div>
          <p className={styles['info-txt']}>
            전체 <span>{count}개의 상품이 등록되어 있습니다.</span>
          </p>
          <HorizontalRule />
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
        </div>
      )}
    </>
  );
}

export default SearchPage;
