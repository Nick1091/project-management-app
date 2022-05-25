import { IconButton } from '@mui/material';
import { DeleteForever } from '@mui/icons-material';

export const DeleteButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <IconButton size="small" onClick={handleClick}>
      <DeleteForever fontSize="small" />
    </IconButton>
  );
};
