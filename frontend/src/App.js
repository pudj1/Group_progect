import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled, { createGlobalStyle } from 'styled-components';

import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import BooksPage from './pages/BooksPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import BookInfo from './pages/BookInfo';
import Appointment from './pages/Appointment';
import AddAppointment from './pages/AddAppointment';
import { getMe } from './redux/authSlice'; 

const GlobalStyle = createGlobalStyle`
  body, html {
    height: 100%;
    margin: 0;
    overflow: hidden;
  }

  body {
    background: linear-gradient(to bottom, #156c5b, #0e865e);
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const LoadingContainer = styled.div`
  color: #fff;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch({ type: 'auth/setUser', payload: parsedUser });
    } else {
      dispatch(getMe()).unwrap();
    }
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Layout>
          <Routes>
            {user ? (
              <>
                    <Route path="/" element={<MainPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="books" element={<BooksPage />} />
                    <Route path="books/:id/BookInfo" element={<BookInfo />} />
                    <Route path="appointment" element={<Appointment />} />
                    <Route path="/addAppointment" element={<AddAppointment />} />
              </>
            ) : (
              <>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="/" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </Layout>
      </AppContainer>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
