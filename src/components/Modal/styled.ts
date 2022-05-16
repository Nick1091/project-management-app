import { styled as styles } from '@mui/material/styles';
import { IconButton } from '@mui/material';

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
  bgcolor: '#fff',
  color: '#000',
  fontSize: '18px',
  borderRadius: '4px',
  p: '32px 24px 24px 24px',
};

export const Close = styles(IconButton)`
  position: absolute;
  right: 4px;
  top: 4px;
`;
