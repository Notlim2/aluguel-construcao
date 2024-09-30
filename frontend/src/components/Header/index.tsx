import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import useSidebar from '../../hooks/use-sidebar';
import useAuth from '../../hooks/use-auth';
import UserMenu from '../UserMenu';
import Link from 'next/link';
import { useMediaQuery, useTheme } from '@mui/material';

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { toggleDrawer } = useSidebar();
  const { toggleLoginDialog, isAuthenticated } = useAuth();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          onClick={toggleDrawer}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Link
          href="/"
          style={{
            flexGrow: 1,
            textDecoration: 'none',
            color: '#fff',
          }}
        >
          <Typography variant="h6" component="div" textAlign="center">
            {isMobile ? 'Construção' : 'Equipamentos de Construção'}
          </Typography>
        </Link>
        {!isAuthenticated ? (
          <Button color="inherit" onClick={toggleLoginDialog}>
            Login
          </Button>
        ) : (
          <UserMenu />
        )}
      </Toolbar>
    </AppBar>
  );
}
