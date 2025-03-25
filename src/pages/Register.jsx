import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { registerUser, clearAuthError } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: 'Демо Пользователь',
    email: 'demo@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
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
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Демо-режим: имитируем успешную регистрацию
    setLoading(true);
    
    setTimeout(() => {
      setSuccess(true);
      
      // Перенаправляем на страницу логина через 2 секунды
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Регистрация успешна! Теперь вы можете войти.' } 
        });
      }, 2000);
    }, 1000);
  };
  
  if (success) {
    return (
      <SuccessContainer>
        <SuccessIcon>✓</SuccessIcon>
        <SuccessTitle>Регистрация успешна!</SuccessTitle>
        <SuccessMessage>Перенаправляем вас на страницу входа...</SuccessMessage>
      </SuccessContainer>
    );
  }
  
  return (
    <RegisterContainer>
      <FormSection>
        <FormHeader>
          <FormTitle>Создайте аккаунт</FormTitle>
          <FormSubtitle>Присоединяйтесь к миру Таро</FormSubtitle>
        </FormHeader>
        
        <DemoNotice>
          Это демо-версия. Введите любые данные для регистрации.
        </DemoNotice>
        
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
            />
          </FormGroup>
          
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Регистрация...' : 'Создать аккаунт'}
          </SubmitButton>
          
          <FormFooter>
            Уже есть аккаунт? <StyledLink to="/login">Войти</StyledLink>
          </FormFooter>
        </RegisterForm>
      </FormSection>
      
      <ImageSection>
        <img src="https://i.imgur.com/aX9T34f.jpg" alt="Таро иллюстрация" />
      </ImageSection>
    </RegisterContainer>
  );
};

// Styled Components
const RegisterContainer = styled.div`
  display: flex;
  max-width: 1000px;
  margin: 3rem auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 1rem;
  }
`;

const FormSection = styled.div`
  flex: 1;
  padding: 3rem;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #3a2a6c, #ae66ae);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  img {
    max-width: 100%;
    height: auto;
    max-height: 500px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #3a2a6c;
`;

const FormSubtitle = styled.p`
  color: #777;
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
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3a2a6c;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  background-color: #3a2a6c;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: #28194f;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FormFooter = styled.div`
  text-align: center;
  color: #777;
`;

const StyledLink = styled(Link)`
  color: #3a2a6c;
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
  max-width: 500px;
  margin: 5rem auto;
  padding: 3rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const SuccessIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: #e8f5e9;
  color: #2e7d32;
  font-size: 2.5rem;
  border-radius: 50%;
  margin-bottom: 1.5rem;
`;

const SuccessTitle = styled.h2`
  font-size: 1.8rem;
  color: #3a2a6c;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const DemoNotice = styled.div`
  background-color: rgba(25, 118, 210, 0.1);
  color: #1976d2;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  text-align: center;
  border: 1px dashed #1976d2;
`;

export default Register; 