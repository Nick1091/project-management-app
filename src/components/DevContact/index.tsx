import { IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import useWindowDimensions from '../../hooks';
import { size } from '../../constants';
import { DevContainer } from '../Footer/styled';

type Props = {
  name: string;
  link: string;
  color:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'error'
    | 'inherit'
    | 'disabled'
    | 'action'
    | 'success'
    | 'warning';
};

export const DevContact = (props: Props) => {
  const { name, link, color } = props;
  const { width } = useWindowDimensions();

  return (
    <DevContainer>
      <IconButton color="inherit">
        <Link color="inherit" href={link}>
          <GitHubIcon color={color} />
        </Link>
      </IconButton>
      {width >= size.laptop && <span>{name}</span>}
    </DevContainer>
  );
};
