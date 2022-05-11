import { styled as styles } from '@mui/material/styles';
import { Popover } from '@mui/material';

export const CreateBoardPopover = styles(Popover)`
  & .MuiPaper-root {
    max-width: 400px;
    width: 50%;
  }
`;
