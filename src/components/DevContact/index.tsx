import { IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import useWindowDimensions from '../../hooks';
import { size } from '../../constants';
import { DevContainer } from '../Footer/styled';

type Props = {
  name: string;
  link: string;
};

export const DevContact = (props: Props) => {
  const { name, link } = props;
  const { width } = useWindowDimensions();

  return (
    <DevContainer>
      <IconButton color="inherit">
        <Link color="inherit" href={link}>
          <GitHubIcon color="info"></GitHubIcon>
        </Link>
      </IconButton>
      {width >= size.laptop && <span>{name}</span>}
    </DevContainer>
  );
};
