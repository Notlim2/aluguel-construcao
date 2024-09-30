import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { ReactNode } from 'react';

interface RoundedFloatingButtonProps {
  isLeft?: boolean;
  onClick: () => void;
  icon: ReactNode;
}

export default function RoundedFloatingButton({
  icon,
  isLeft = false,
  onClick,
}: RoundedFloatingButtonProps) {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      color="inherit"
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        ...(isLeft ? { left: theme.spacing(1) } : { right: theme.spacing(1) }),
        padding: theme.spacing(1),
        borderRadius: '50%',
        minWidth: theme.spacing(5),
        width: theme.spacing(5),
        height: theme.spacing(5),
      }}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}
