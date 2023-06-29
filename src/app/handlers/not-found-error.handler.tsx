import { Box, Link, Typography } from '@mui/joy';
import { Catch, ErrorHandler } from '@tokamakjs/common';
import React, { ReactNode } from 'react';

import { NotFoundError } from '../errors/not-found.error';

@Catch(NotFoundError)
export class NotFoundErrorHandler implements ErrorHandler<NotFoundError> {
  public render(error: NotFoundError): ReactNode {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <Box sx={{ width: 600, height: 600 }}>
          <Typography level="h2">Not Found</Typography>
          <Typography level="body1">There should've been something here.</Typography>
          <Box sx={{ my: 1 }}>
            <Link href="/projects">Go Home</Link>
          </Box>
        </Box>
      </Box>
    );
  }
}
