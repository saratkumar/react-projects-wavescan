import Button, { ButtonProps } from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';

export const CreateProjectButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: 'white',
    backgroundColor: '#b53259',
    padding: '10px',
    borderRadius: '20px',
    '&:hover': {
        color: 'white',
        backgroundColor: '#b53259',
        padding: '10px'
    },
  }));