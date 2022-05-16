import { IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { DevContainer } from '../Footer/styled';

type Props = {
  name: string;
  link: string;
};

export const DevContact = (props: Props) => {
  const { name, link } = props;
  return (
    <DevContainer>
      <IconButton color="inherit">
        <Link color="inherit" href={link}>
          <GitHubIcon color="info"></GitHubIcon>
        </Link>
      </IconButton>
      <span>{name}</span>
    </DevContainer>
  );
};
