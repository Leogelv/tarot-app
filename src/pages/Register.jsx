import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { registerUser, clearAuthError } from '../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);
  const loading = status === 'loading';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [success, setSuccess] = useState(false);
  
  // Если пользователь авторизован, перенаправляем на профиль
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearAuthError());
  }, [dispatch]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Очищаем ошибки при изменении данных формы
    if (error) {
      dispatch(clearAuthError());
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      console.error('Пароли не совпадают');
      return;
    }
    
    try {
      await dispatch(
        registerUser({
          email: formData.email,
          password: formData.password,
          userData: {
            name: formData.name
          }
        })
      );
      
      setSuccess(true);
      
      // Перенаправляем на страницу логина через 2 секунды
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Регистрация успешна! Теперь вы можете войти.' } 
        });
      }, 2000);
    } catch (err) {
      console.error('Ошибка регистрации:', err);
    }
  };
  
  if (success) {
    return (
      <SuccessContainer
        as={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SuccessIcon
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        >✓</SuccessIcon>
        <SuccessTitle>Регистрация успешна!</SuccessTitle>
        <SuccessMessage>Перенаправляем вас на страницу входа...</SuccessMessage>
      </SuccessContainer>
    );
  }
  
  return (
    <RegisterContainer>
      <FormWrapper
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FormHeader>
          <FormTitle>Создайте аккаунт</FormTitle>
          <FormSubtitle>Присоединяйтесь к миру Таро</FormSubtitle>
        </FormHeader>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <RegisterForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Имя</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              disabled={loading}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ваш@email.com"
              disabled={loading}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Пароль</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Создайте пароль"
              disabled={loading}
              required
              minLength="6"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Повторите пароль"
              disabled={loading}
              required
              minLength="6"
            />
          </FormGroup>
          
          <SubmitButton 
            type="submit" 
            disabled={loading}
            as={motion.button}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Регистрация...' : 'Создать аккаунт'}
          </SubmitButton>
          
          <FormFooter>
            Уже есть аккаунт? <StyledLink to="/login">Войти</StyledLink>
          </FormFooter>
        </RegisterForm>
      </FormWrapper>
      
      <ImageWrapper
        as={motion.div}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img src="https://i.ibb.co/TDfjvZdV/file-75.png" alt="Таро иллюстрация" />
      </ImageWrapper>
    </RegisterContainer>
  );
};

// Styled Components
const RegisterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 150px);
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 1rem auto;
    min-height: auto;
  }
`;

const FormWrapper = styled.div`
  flex: 1;
  padding: 2.5rem;
  background-color: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  img {
    max-width: 100%;
    height: auto;
    max-height: 500px;
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-heading);
`;

const FormSubtitle = styled.p`
  color: var(--text-secondary);
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div``;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  background-color: var(--input-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-family: inherit;
  font-size: 1rem;
  color: var(--text);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(155, 89, 217, 0.1);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: var(--text-tertiary);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(155, 89, 217, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FormFooter = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: var(--text-secondary);
`;

const StyledLink = styled(Link)`
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 5rem auto;
  padding: 3rem;
  background-color: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  text-align: center;
  border: 1px solid var(--border);
  
  @media (max-width: 768px) {
    margin: 2rem;
    padding: 2rem;
  }
`;

const SuccessIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: var(--gradient-primary);
  color: white;
  font-size: 3rem;
  border-radius: 50%;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(155, 89, 217, 0.3);
`;

const SuccessTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text);
  font-family: var(--font-heading);
`;

const SuccessMessage = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
`;

const ErrorMessage = styled.div`
  background-color: rgba(255, 0, 0, 0.1);
  color: #e74c3c;
  padding: 1rem;
  border-radius: var(--radius);
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

export default Register; 