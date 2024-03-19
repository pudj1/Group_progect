import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, checkIsAuth } from '../redux/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/register.css';

/**
 * Компонент для відображення сторінки реєстрації користувача.
 * @module RegisterPage
 * @returns {JSX.Element} Елемент React, що представляє сторінку реєстрації користувача.
 */

const RegisterPage = () => {
  // Стани для збереження логіну, пароля та підтвердження пароля користувача
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Статус реєстрації користувача
  const { status } = useSelector((state) => state.auth || {});
  
  // Перевірка чи користувач вже автентифікований
  const isAuth = useSelector(checkIsAuth);
  
  // Функція для навігації
  const navigate = useNavigate();

  // Виведення повідомлення про помилку після спроби реєстрації
  useEffect(() => {
    if (status) {
      toast.error(status);
    }
  }, [status]);

  // Перенаправлення на сторінку входу, якщо користувач вже автентифікований
  useEffect(() => {
    if (isAuth) {
      navigate('/login'); 
    }
  }, [isAuth, navigate]);

  // Обробник події натискання кнопки підтвердження реєстрації
  const handleSubmit = async () => {
    try {
      // Перевірка на валідність логіну
      if (username.length < 8) {
        toast.error('Логін повинен містити принаймні 8 символів');
        return;
      }
      
      // Перевірка на валідність паролю
      if (password.length < 8) {
        toast.error('Пароль повинен містити принаймні 8 символів');
        return;
      }
  
      // Перевірка наявності спеціальних символів в паролі
      const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (!specialCharRegex.test(password)) {
        toast.error('Пароль повинен містити принаймні один спеціальний символ');
        return;
      }
  
      // Перевірка на співпадіння паролів
      if (password !== confirmPassword) {
        toast.error('Паролі не співпадають');
        return;
      }
  
      // Відправлення запиту на реєстрацію користувача
      await dispatch(registerUser({ username, password, confirmPassword }));
      
      // Очищення полів вводу
      setPassword('');
      setUserName('');
      setConfirmPassword('');
      
      // Виведення повідомлення про успішну реєстрацію
      toast.success('Реєстрація успішна');
    } catch (error) {
      console.error(error);
      toast.error('Сталася помилка при реєстрації');
    }
  };
  
  // Відображення компонента
  return (
    <div className='outer'>
      <form onSubmit={(e) => e.preventDefault()} className="inner">
        <h1 className='register-xl-text'>Реєстрація</h1>
        <label className='input-outer register-text'>
          Логін:
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            className='register-input-text'
          />
        </label>
        <label className='input-outer register-text'>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className='register-input-text'
          />
        </label>
        <label className='input-outer register-text'>
          Підтвердіть пароль:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className='register-input-text'
          />
        </label>
        <div className="flex gap-8 al-center justify-center mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="register-button"
          >
            Підтвердити
          </button>
          <Link to="/login" className="register-button" style={{width:200}}>
            Вже є акаунт?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
