import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: 'demo@example.com',
    password: 'password123',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Имитация загрузки
    setTimeout(() => {
      setLoading(false);
      // Сразу переходим в каталог карт
      navigate('/cards');
    }, 800);
  };
  
  return (
    <LoginContainer>
      <FormWrapper
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoginForm onSubmit={handleSubmit}>
          <FormHeader>
            <FormTitle>Вход в аккаунт</FormTitle>
            <FormSubtitle>Добро пожаловать в Таро Инсайт</FormSubtitle>
          </FormHeader>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите ваш email"
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
              placeholder="Введите ваш пароль"
              disabled={loading}
            />
          </FormGroup>
          
          <SubmitButton 
            type="submit" 
            disabled={loading}
            as={motion.button}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Вход...' : 'Войти'}
          </SubmitButton>
          
          <FormFooter>
            Еще нет аккаунта? <StyledLink to="/register">Регистрация</StyledLink>
          </FormFooter>
        </LoginForm>
      </FormWrapper>
      
      <FormImageWrapper
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FormImage src="https://i.ibb.co/TDfjvZdV/file-75.png" alt="Таро Карта" />
      </FormImageWrapper>
    </LoginContainer>
  );
};

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 150px);
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    min-height: auto;
    margin-top: 1rem;
    padding: 0;
  }
`;

const FormWrapper = styled.div`
  flex: 1;
  background-color: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LoginForm = styled.form`
  padding: 2.5rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
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

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

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
  margin-top: 1rem;
  
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
  margin-top: 1.5rem;
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

const FormImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FormImage = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 450px;
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
`;

export default Login; 