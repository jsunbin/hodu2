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
  const [suggestItems, setSuggestItems] = useState([]);
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

  const getItems = async () => {
    try {
      const res = await axios.get(`/products/`);
      const nextItems = res.data.results;

      setSuggestItems(nextItems);
    } catch (error) {
      console.error(error);
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
      setCount(0);
    };
  }, [keyword]);

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <h2 className={styles['search-title']}>
        <strong>'{keyword}'</strong> 검색결과 (전체 <span>{count}개</span>의
        상품)
      </h2>
      {!isLoading &&
        (items.length !== 0 ? (
          <div className={styles['search-results']}>
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
        ) : (
          <div className={styles['search-no-data']}>
            <HorizontalRule />
            <p>
              검색하신 <strong>' {keyword} '</strong> 에 대한{' '}
              <strong>' 검색 '</strong> 결과가 없습니다
            </p>
            <div className={styles['search-guide']}>
              <p>다시 검색해 보세요</p>
              <ul>
                <li>검색어의 철자가 정확한지 확인해보세요.</li>
                <li>
                  한글을 영어로 혹은 영어를 한글로 입력했는지 확인해보세요.
                </li>
                <li>검색어의 띄어쓰기를 다르게 해보세요.</li>
              </ul>
            </div>
            <HorizontalRule />
            <div className={styles.suggestion}>
              <h4 className={styles['suggestion-title']}>
                이런 상품을 찾으시나요?
              </h4>
              <section className={styles.section}>
                <ul className={styles.items}>
                  {suggestItems.map((item) => {
                    return (
                      <li key={item.product_id}>
                        <Card
                          productId={item.product_id}
                          title={item.product_name}
                          price={item.price}
                          image={item.image}
                          seller={item.store_name}
                          size="small"
                        />
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
          </div>
        ))}
    </>
  );
}

export default SearchPage;
