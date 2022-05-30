import { styled as styles } from '@mui/material/styles';
import { IconButton } from '@mui/material';

export const modalStyles = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  bgcolor: '#fff',
  color: '#000',
  fontSize: '18px',
  borderRadius: '4px',
  p: '48px 32px 32px 32px',
  '&:focus-visible': {
    outline: 'none',
  },
};

export const Close = styles(IconButton)`
  position: absolute;
  right: 16px;
  top: 8px;
`;
