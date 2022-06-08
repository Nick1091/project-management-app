import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  description: string;
  name: string;
  boardId: string;
};

export const CardSearch = (props: Props) => {
  const { title, description, name, boardId } = props;
  const { t } = useTranslation(['search']);
  const formatTitle = title.length > 12 ? title.slice(0, 12) + '...' : title;
  const formatDescr = description.length > 20 ? description.slice(0, 20) + '...' : description;

  return (
    <Card
      sx={{ maxWidth: '250px', maxHeight: '250px', margin: '7px', ':hover': { boxShadow: 10 } }}
    >
      <CardContent>
        <Typography gutterBottom>{t('Task')}</Typography>
        <Typography variant="h5" component="h2">
          {formatTitle}
        </Typography>
        <Typography color="textSecondary">
          {t('CreatedBy')} {name}
        </Typography>
        <Typography component="p">
          <br />
          {formatDescr}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          color="inherit"
          style={{ textDecoration: 'none' }}
          component={RouterLink}
          to={`/main/board/${boardId}`}
        >
          <Typography color="primary" align="center">
            {t('GoToTheBoard')}
          </Typography>
        </Link>
      </CardActions>
    </Card>
  );
};
