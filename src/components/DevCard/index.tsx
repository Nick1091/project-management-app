import { Box, IconButton, Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { CardContainer, IconContainer, TextContainer } from './styled';

type Props = {
  name: string;
  gh: string;
  info: string;
  linkedIn: string;
  photo: string;
};

export const DevCard = (props: Props) => {
  const { name, gh, info, linkedIn, photo } = props;
  return (
    <CardContainer>
      <Box
        component="img"
        sx={{
          maxHeight: 210,
          maxWidth: 210,
          borderRadius: '15px',
        }}
        alt="Igor photo"
        src={photo}
      />
      <TextContainer>
        <Typography sx={{ fontSize: '16px', color: '#504D66', textAlign: 'center' }}>
          {name}
        </Typography>
        <IconContainer>
          <IconButton color="inherit">
            <Link color="inherit" href={gh}>
              <GitHubIcon color="info"></GitHubIcon>
            </Link>
          </IconButton>
          <Typography sx={{ fontSize: '14px', color: '#b1b0b8', textAlign: 'center' }}>
            {info}
          </Typography>
          <IconButton color="inherit">
            <Link color="inherit" href={linkedIn}>
              <LinkedInIcon color="info"></LinkedInIcon>
            </Link>
          </IconButton>
        </IconContainer>
      </TextContainer>
    </CardContainer>
  );
};
