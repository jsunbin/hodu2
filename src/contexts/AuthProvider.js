import axios from '../lib/axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext({
  user: null,
  token: null,
  userType: null,
  isPending: true,
  login: () => {},
  logout: () => {},
});
export function AuthProvider({ children }) {
  const [values, setValues] = useState({
    user: null,
    token: null,
    userType: null,
    isPending: true,
  });
  const location = useLocation();

  const validateToken = () => {
    /** @TODO 로컬스토리지 저장
     * [x] 토큰 유효성 검사: 키 중에 token이 있는 지 먼저 확인 -> 없으면: valuse.user 초기화, 있으면 유효성 검사 실시
     * [x] 유효X -> 로컬스토리지 초기화, values 초기화
     * [ ] 유효O -> 로컬스토리지 유지, values
     * */
    const localToken = localStorage.getItem('token');
    const localUserType = localStorage.getItem('user_type');

    if (!localToken) {
      setValues({
        user: null,
        token: null,
        userType: null,
        isPending: true,
      });

      return;
    }

    let nextUser, nextToken, nextUserType;
    try {
      // 토큰 유효성 검사
      nextUser = 'test';
      nextToken = localToken;
      nextUserType = localUserType;
    } catch (error) {
      if (error.response?.status === 401) {
        // 유효X
        nextUser = null;
      }
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        token: nextToken,
        userType: nextUserType,
        isPending: false,
      }));
    }
  };

  const login = async ({ id, password, type }) => {
    const res = await axios.post('/accounts/login/', {
      username: id,
      password,
      login_type: type,
    });

    const nextUser = res.data;
    setValues((prevValues) => ({
      ...prevValues,
      user: nextUser,
      token: nextUser.token,
      userType: nextUser.user_type,
    }));

    localStorage.setItem('token', nextUser.token);
    localStorage.setItem('user_type', nextUser.user_type);
  };

  const logout = async () => {
    /** @TODO 로그아웃 */
  };

  useEffect(() => {
    validateToken();
  }, [location]);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        token: values.token,
        userType: values.login_type,
        isPending: values.isPending,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다.');
  }

  return context;
}
