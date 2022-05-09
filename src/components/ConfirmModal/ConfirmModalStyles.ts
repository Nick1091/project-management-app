import { styled } from '@mui/system';
import { Alert } from '@mui/material';

export const modalStyles = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  bgcolor: 'rgb(25, 18, 7)',
  color: '#fff',
  fontSize: '18px',
  borderRadius: '4px',
  p: '24px',
};

export const ModalOverlay = styled(Alert)`
  & .MuiAlert-message {
    display: flex;
    flex-direction: column;
  }
`;
