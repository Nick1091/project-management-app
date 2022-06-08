import { Box } from '@mui/material';
import notFoundImg from '../../assets/img/404.png';
import { NotFoundContainer } from './styled';

export const NotFound = () => {
  return (
    <NotFoundContainer>
      <Box
        component="img"
        sx={{
          height: '70%',
          width: '75%',
        }}
        alt="not found image"
        src={notFoundImg}
      />
    </NotFoundContainer>
  );
};
