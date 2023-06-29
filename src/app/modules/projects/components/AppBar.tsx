import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import MenuIcon from '@mui/icons-material/Menu';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Box, Container, IconButton, Menu, MenuItem, Typography } from '@mui/joy';
import React, { useRef, useState } from 'react';

interface UserMenuProps {
  onClickLogout: VoidFunction;
}

function UserMenu({ onClickLogout }: UserMenuProps) {
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        ref={buttonRef}
        id="basic-demo-button"
        aria-controls={'basic-menu'}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        variant="outlined"
        color="primary"
        onClick={() => setIsOpen(!isOpen)}>
        <PersonRoundedIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={buttonRef.current}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="basic-demo-button">
        <MenuItem onClick={() => setIsOpen(false)}>Profile</MenuItem>
        <MenuItem onClick={() => setIsOpen(false)}>My account</MenuItem>
        <MenuItem
          color="danger"
          onClick={() => {
            setIsOpen(false);
            onClickLogout();
          }}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

interface AppBarProps {
  onClickLogout: VoidFunction;
}

export function AppBar({ onClickLogout }: AppBarProps) {
  return (
    <Box
      sx={{
        p: 2,
        gap: 2,
        bgcolor: 'background.surface',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gridColumn: '1 / -1',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
      }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1.5,
          }}>
          <IconButton variant="outlined" size="sm" sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <IconButton size="sm" variant="solid" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            <GroupRoundedIcon />
          </IconButton>
          <Typography component="h1" fontWeight="xl">
            ProjectManager
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
          <UserMenu onClickLogout={onClickLogout} />
        </Box>
      </Container>
    </Box>
  );
}
