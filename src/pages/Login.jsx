import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loginUser, clearAuthError } from '../store/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: 'demo@example.com',
    password: 'password123',
  });
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to intended page or profile
      const from = location.state?.from?.pathname || '/profile';
      navigate(from);
    }
    
    // Clear any previous errors when component mounts
    dispatch(clearAuthError());
  }, [isAuthenticated, navigate, location, dispatch]);
  
  useEffect(() => {
    // Очищаем ошибки при размонтировании компонента
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear any API error when user changes form
    if (error) {
      dispatch(clearAuthError());
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      );
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  
  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <FormHeader>
          <FormTitle>Демо Доступ</FormTitle>
          <FormSubtitle>Просто нажмите кнопку входа или введите любые данные</FormSubtitle>
        </FormHeader>
        
        <DemoNotice>
          Это демо-версия. Введите любые данные для входа.
        </DemoNotice>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Любой email"
            disabled={loading}
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
            placeholder="Любой пароль"
            disabled={loading}
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Вход...' : 'Войти в демо-режиме'}
        </SubmitButton>
        
        <FormFooter>
          Еще нет аккаунта? <StyledLink to="/register">Регистрация</StyledLink>
        </FormFooter>
      </LoginForm>
      
      <FormImage>
        <img src="https://i.imgur.com/qiXu7Bh.jpg" alt="Таро Карта" />
      </FormImage>
    </LoginContainer>
  );
};

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 1000px;
  margin: 3rem auto;
  background-color: var(--color-background-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    margin: 1rem;
  }
`;

const LoginForm = styled.form`
  flex: 1;
  padding: 3rem;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
`;

const FormSubtitle = styled.p`
  color: var(--color-text-light);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(58, 42, 108, 0.1);
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: var(--color-primary-dark);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FormFooter = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: var(--color-text-light);
`;

const StyledLink = styled(Link)`
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
  
  &:hover {
    color: var(--color-primary-dark);
    text-decoration: underline;
  }
`;

const FormImage = styled.div`
  flex: 1;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 500px;
  
  img {
    max-width: 100%;
    height: auto;
    max-height: 400px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }
  
  @media (max-width: 768px) {
    min-height: 300px;
    padding: 1.5rem;
    
    img {
      max-height: 250px;
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(244, 67, 54, 0.1);
  color: var(--color-error);
  padding: 1rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const DemoNotice = styled.div`
  background-color: rgba(25, 118, 210, 0.1);
  color: #1976d2;
  padding: 1rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  text-align: center;
  border: 1px dashed #1976d2;
`;

export default Login; 