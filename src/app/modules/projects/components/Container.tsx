import { Box } from '@mui/joy';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <Box sx={{ width: 800 }}>{children}</Box>;
}
