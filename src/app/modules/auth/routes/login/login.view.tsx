import {
  Alert,
  Box,
  Button,
  CssVarsProvider,
  Divider,
  FormControl,
  FormLabel,
  Input,
  ModalClose,
  ModalDialog,
  Sheet,
  StyledEngineProvider,
  Typography,
} from '@mui/joy';
import Link from '@mui/joy/Link';
import Modal from '@mui/joy/Modal';
import { Link as A, useController, useState } from '@tokamakjs/react';

import { LoginController } from './login.controller';

export const LoginView = () => {
  const ctrl = useController<LoginController>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23003A75' fill-opacity='0.03'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}>
        {isLoading ? (
          'Loading...'
        ) : (
          <Box sx={{ width: 500 }}>
            <form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                try {
                  await ctrl.login(email, password);
                } catch {
                  setIsDialogOpen(true);
                }
                setIsLoading(false);
              }}>
              <Sheet
                variant="outlined"
                sx={{
                  width: 400,
                  mx: 'auto', // margin left & right
                  my: 4, // margin top & bottom
                  py: 4, // padding top & bottom
                  px: 3, // padding left & right
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  borderRadius: 'sm',
                  boxShadow: 'md',
                }}>
                <Box sx={{ marginBottom: 1 }}>
                  <Typography level="h4" component="h1">
                    <b>Welcome!</b>
                  </Typography>
                  <Typography level="body2">Sign in to continue.</Typography>
                </Box>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="johnsmith@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password..."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Box
                  sx={{
                    mx: 3,
                    my: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    alignItems: 'center',
                  }}>
                  <Button type="submit" sx={{ width: '100%' }}>
                    Log in
                  </Button>
                  <Typography
                    endDecorator={
                      <Link component={A} href="/sign-up">
                        Sign up
                      </Link>
                    }
                    fontSize="sm"
                    sx={{ alignSelf: 'center' }}>
                    Don't have an account?
                  </Typography>
                </Box>
              </Sheet>
            </form>
          </Box>
        )}
      </Box>
      <Modal open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <ModalDialog sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}>
            Unauthorized
          </Typography>
        </ModalDialog>
      </Modal>
    </>
  );
};
