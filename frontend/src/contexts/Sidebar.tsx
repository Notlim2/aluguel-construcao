import { createContext, PropsWithChildren, useCallback, useState } from 'react';

export const SidebarContext = createContext(
  {} as { isOpen: boolean; toggleDrawer: () => void }
);

interface SidebarContextProviderProps extends PropsWithChildren {}

export default function SidebarContextProvider({
  children,
}: SidebarContextProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  return (
    <SidebarContext.Provider value={{ isOpen, toggleDrawer }}>
      {children}
    </SidebarContext.Provider>
  );
}
