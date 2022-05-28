import styled from 'styled-components';

export const CardContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 15px 0;
  transition: 0.3s;
  max-width: 210px;
  border-radius: 15px;
  background-color: white;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const TextContainer = styled.div`
  padding: 10px 16px;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
