import { CssVarsProvider, StyledEngineProvider } from '@mui/joy';
import { Outlet } from '@tokamakjs/react';
import React from 'react';

interface RootViewProps {}

export const RootView = ({}: RootViewProps) => {
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <Outlet />
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};
