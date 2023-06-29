import { HomeOutlined } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Input,
  ModalClose,
  ModalDialog,
  Typography,
} from '@mui/joy';
import Modal from '@mui/joy/Modal';
import { useController, useState } from '@tokamakjs/react';

import { AppBar } from '../../components/AppBar';
import { ProjectsController } from './projects.controller';

export const ProjectsView = () => {
  const ctrl = useController<ProjectsController>();

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  return (
    <>
      <AppBar onClickLogout={() => ctrl.logout()} />
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', my: 2 }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography level="h1">Projects</Typography>
            <Button onClick={() => setIsDialogVisible(true)}>Add Project</Button>
          </Box>
          {ctrl.isLoadingProjects ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container sx={{ my: 4, gap: 2 }}>
              {ctrl.projects.map((p) => (
                <Grid xs={4} key={p.id}>
                  <Card
                    variant="outlined"
                    sx={{ my: 2, cursor: 'pointer', h: 3 }}
                    onClick={() => ctrl.goToProject(p)}>
                    <CardContent>{p.title}</CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
      <Modal open={isDialogVisible} onClose={() => setIsDialogVisible(false)}>
        <ModalDialog>
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
            Add new project
          </Typography>
          <FormControl sx={{ m: 2 }}>
            <FormLabel>Project title</FormLabel>
            <Input
              type="text"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
            />
          </FormControl>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="plain" color="neutral" onClick={() => setIsDialogVisible(false)}>
              Cancel
            </Button>
            <Button
              variant="solid"
              color="primary"
              disabled={isSaving}
              onClick={async () => {
                setIsSaving(true);
                await ctrl.createProject(newProjectTitle);
                setIsSaving(false);
                setIsDialogVisible(false);
              }}>
              Add
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};
