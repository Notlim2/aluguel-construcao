import React, { ReactNode } from 'react';
import { Container } from '@mui/material';
import Header from '../components/Header';
import SidebarContextProvider from '../contexts/Sidebar';
import Sidebar from '../components/Sidebar';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <SidebarContextProvider>
      <Header />
      <Sidebar />
      <Container sx={{ pb: 1 }}>{children}</Container>
    </SidebarContextProvider>
  );
}

export default Layout;
