import { Button, IconButton, Link } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import { Link as RouterLink } from 'react-router-dom';
import { LocalizationToggler } from '../LocalizationToggler';

export const UserBar = () => {
  return (
    <>
      <LocalizationToggler />
      <IconButton color="inherit">
        <AddToQueueIcon sx={{ fontSize: 30, mr: '15px' }}></AddToQueueIcon>
      </IconButton>
      <IconButton color="inherit">
        <Link color="inherit" component={RouterLink} to="/edit-profile">
          <ManageAccountsIcon sx={{ fontSize: 30, mr: '15px' }}></ManageAccountsIcon>
        </Link>
      </IconButton>
      <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/main">
        <Button color="inherit" variant="outlined" sx={{ mr: '15px' }}>
          Go to Main Page
        </Button>
      </Link>
      <Button color="secondary" variant="contained">
        Sign Out
      </Button>
    </>
  );
};
