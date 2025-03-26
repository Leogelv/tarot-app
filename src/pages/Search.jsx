import React, { useState } from 'react';
import styled from 'styled-components';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <PageContainer className="page-container">
      <PageHeader>
        <PageTitle>Поиск</PageTitle>
        <SearchInput 
          type="text" 
          placeholder="Введите название карты или расклада..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </PageHeader>
      
      <SearchResults>
        <EmptyState>
          <EmptyStateIcon className="material-symbols-rounded">search</EmptyStateIcon>
          <EmptyStateText>Введите запрос для поиска карт и раскладов</EmptyStateText>
        </EmptyState>
      </SearchResults>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const PageHeader = styled.header`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: var(--text);
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--input-bg);
  color: var(--text);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const SearchResults = styled.div`
  margin-top: 2rem;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: var(--card-bg);
  border-radius: var(--radius);
  border: 1px solid var(--border);
`;

const EmptyStateIcon = styled.span`
  font-size: 3rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  text-align: center;
`;

export default Search; 