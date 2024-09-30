import { useContext } from 'react';
import { SidebarContext } from '../contexts/Sidebar';

export default function useSidebar() {
  return useContext(SidebarContext);
}
