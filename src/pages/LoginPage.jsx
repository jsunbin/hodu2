import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import Label from '../components/Label.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { MoreList } from '../components/Footer';
import styles from './LoginPage.module.css';

function LoginPage() {
  const [values, setValues] = useState({
    id: '',
    password: '',
  });
  const ref = useRef();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token, errorMessage, login } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type') || 'BUYER';

  const handleTypeChange = (event, userType) => {
    event.preventDefault();
    setSearchParams({ type: userType });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    const { id, password } = values;

    console.log(id, password);

    if (!id) {
      setError('아이디를 입력해주세요.');
      console.log('id');
    } else if (!password) {
      setError('비밀번호를 입력해주세요.');
      console.log('pa');
    } else {
      console.log('로그인');
      try {
        const response = login({ id, password, type });

        const getData = () => {
          response.then((data) => {
            console.log(data);
            setError(data);
          });
        };

        getData();
        console.log('여기봐봐봐봐', response.Promise);
        console.log(response);
        setError(errorMessage);
        console.log(errorMessage);
      } catch (error) {
        console.error(error);
      }
      // navigate('/#');
    }
  };

  useEffect(() => {
    console.log('rrrdrrr', error);

    return () => {
      // setError('');
    };
  }, [error]);

  useEffect(() => {
    if (token) {
      navigate('/#');
    }
  }, [token, navigate]);

  return (
    <>
      <div className={styles['auth-form-wrap']}>
        <ul className={styles['option-ul']} role="tablist">
          <li role="tab">
            <button
              className={`${styles['option-buyer']} ${
                type !== 'SELLER' ? styles.on : ''
              }`}
              onClick={(event) => handleTypeChange(event, `BUYER`)}
            >
              <span className={styles['option-text']}>구매회원 로그인</span>
            </button>
          </li>
          <li role="tab">
            <button
              className={`${styles['option-seller']} ${
                type === 'SELLER' ? styles.on : ''
              }`}
              onClick={(event) => handleTypeChange(event, `SELLER`)}
            >
              <span className={styles['option-text']}>판매회원 로그인</span>
            </button>
          </li>
        </ul>
        <form className={styles['login-form']} onSubmit={handleSubmit}>
          <Label className="a11y-hidden" htmlFor="id">
            아이디
          </Label>
          <Input
            id="id"
            className={styles.input}
            name="id"
            type="text"
            placeholder="아이디"
            autoComplete="username"
            value={values.id}
            onChange={handleChange}
            page="login"
            ref={ref}
          />

          <Label className="a11y-hidden" htmlFor="password">
            비밀번호
          </Label>
          <Input
            id="password"
            className={styles.input}
            name="password"
            type="password"
            placeholder="비밀번호"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            page="login"
          />

          <strong
            className={styles['login-warning']}
            style={!error ? { display: 'none' } : {}}
          >
            {error}
          </strong>

          <Button className="button" size="mid">
            로그인
          </Button>
        </form>
      </div>
      <div>
        <MoreList type="login" />
      </div>
    </>
  );
}

export default LoginPage;
