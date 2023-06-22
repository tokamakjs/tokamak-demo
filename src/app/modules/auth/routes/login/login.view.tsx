import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  ModalClose,
  ModalDialog,
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
        sx={() => ({
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        })}>
        <Typography level="h1">Login</Typography>
        {isLoading ? (
          'Loading...'
        ) : (
          <Box
            sx={() => ({
              width: 500,
            })}>
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
              <FormControl sx={() => ({ m: 2 })}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl sx={() => ({ m: 2 })}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Box
                sx={() => ({
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  m: 2,
                })}>
                <Box sx={() => ({ m: 2 })}>
                  <Button type="submit">Login</Button>
                </Box>
                <Divider />
                <Box sx={() => ({ m: 2 })}>
                  <A href="/sign-up">
                    <Link>Sign up</Link>
                  </A>
                </Box>
              </Box>
            </form>
          </Box>
        )}
      </Box>
      <Modal open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <ModalDialog
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}>
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
