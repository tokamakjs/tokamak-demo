import { Outlet } from '@tokamakjs/react';
import React from 'react';

interface RootViewProps {}

export const RootView = ({}: RootViewProps) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
