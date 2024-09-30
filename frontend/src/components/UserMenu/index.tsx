import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Logout as LogountIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import useAuth from '../../hooks/use-auth';
import { useCallback, useRef, useState } from 'react';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const userMenuAnchor = useRef<HTMLButtonElement>(null);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const toggleUserMenu = useCallback(() => {
    setIsOpenUserMenu(!isOpenUserMenu);
  }, [isOpenUserMenu]);
  const handleLogout = useCallback(() => {
    logout();
    toggleUserMenu();
  }, [logout, toggleUserMenu]);
  return (
    <>
      <Button ref={userMenuAnchor} onClick={toggleUserMenu}>
        <Stack direction="row" columnGap={1} sx={{ color: '#fff' }}>
          <PersonIcon />
          <Typography sx={{ textTransform: 'none' }}>{user?.name}</Typography>
        </Stack>
      </Button>
      <Menu
        anchorEl={userMenuAnchor.current}
        open={isOpenUserMenu}
        onClose={toggleUserMenu}
      >
        <MenuItem onClick={toggleUserMenu}>
          <Link href="/carrinho" style={{ textDecoration: 'none' }}>
            <MuiLink underline="none">
              <Stack direction="row" columnGap={1}>
                <ShoppingCartIcon />
                <Typography sx={{ textTransform: 'none' }}>
                  Ver Carrinho
                </Typography>
              </Stack>
            </MuiLink>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Stack direction="row" columnGap={1}>
            <LogountIcon />
            <Typography sx={{ textTransform: 'none' }}>Sair</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
}
