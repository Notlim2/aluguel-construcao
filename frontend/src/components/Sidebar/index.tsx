import Drawer from '@mui/material/Drawer';
import useSidebar from '../../hooks/use-sidebar';
import {
  Home as HomeIcon,
  Inbox as InboxIcon,
  ShoppingCart as ShoppingCartIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import useAuth from '../../hooks/use-auth';

interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, toggleDrawer } = useSidebar();
  return (
    <Drawer open={isOpen} onClose={toggleDrawer}>
      <Box sx={{ width: 240 }} role="presentation" onClick={toggleDrawer}>
        <List>
          {[
            { name: 'Início', url: '/', icon: <HomeIcon /> },
            { name: 'Produtos', url: '/produtos', icon: <InboxIcon /> },
            {
              name: 'Carrinho',
              url: '/carrinho',
              icon: <ShoppingCartIcon />,
              hide: !isAuthenticated,
            },
          ]
            .filter(({ hide }) => !hide)
            .map(({ name, url, icon }) => (
              <ListItem key={name} disablePadding>
                <ListItemButton
                  onClick={() => router.push(url)}
                  selected={pathname === url}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
        {isAuthenticated && (
          <>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={logout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sair" />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
}
