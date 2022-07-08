import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    // width: '25% !important',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0.5),
      width: 'auto',
    },
  }));


  export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    borderRight: '1px solid #c3b8d8'
  }));

  export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: '5px',
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  }));

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 4;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};