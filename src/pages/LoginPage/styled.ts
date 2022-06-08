import styled from 'styled-components';

export const SubTitle = styled.p`
  margin: 0;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.75;
  letter-spacing: 0.00938em;
  text-align: center;
  color: ${(props: { color: string }) => props.color};
  margin-bottom: 8px;
`;

export const LoginFormWrapperStyle = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
