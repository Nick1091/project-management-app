import { Button, IconButton, Link } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import { Link as RouterLink } from 'react-router-dom';
import { LocalizationToggler } from '../LocalizationToggler';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteUser } from '../../requests';

export const UserBar = () => {
  const dispatch = useAppDispatch();
  const {
    authUser: { id, token },
  } = useAppSelector((state) => state.authUser);

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
      <Button
        onClick={() => {
          token && id && dispatch(deleteUser({ token, id }));
        }}
        color="secondary"
        variant="contained"
      >
        Logout
      </Button>
    </>
  );
};
