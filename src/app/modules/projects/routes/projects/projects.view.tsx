import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Input,
  ModalClose,
  ModalDialog,
  Typography,
} from '@mui/joy';
import Modal from '@mui/joy/Modal';
import { useController, useState } from '@tokamakjs/react';

import { ProjectsController } from './projects.controller';

interface ProjectsViewProps {}

export const ProjectsView = ({}: ProjectsViewProps) => {
  const ctrl = useController<ProjectsController>();

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  return (
    <>
      <Box
        sx={() => ({
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          m: 10,
        })}>
        <Box
          sx={() => ({
            width: 800,
          })}>
          <Box
            sx={() => ({ display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
            <Typography level="h1">Projects</Typography>
            <Button onClick={() => ctrl.logout()} color="danger">
              Logout
            </Button>
          </Box>
          {ctrl.isLoadingProjects ? (
            'Loading...'
          ) : (
            <Box sx={() => ({ my: 4 })}>
              {ctrl.projects.map((p) => (
                <Card
                  key={p.id}
                  variant="outlined"
                  sx={() => ({ my: 2, cursor: 'pointer' })}
                  onClick={() => ctrl.goToProject(p)}>
                  <CardContent>{p.title}</CardContent>
                </Card>
              ))}
            </Box>
          )}
          <Box sx={() => ({ my: 4 })}>
            <Button onClick={() => setIsDialogVisible(true)}>Add Project</Button>
          </Box>
        </Box>
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
          <FormControl sx={() => ({ m: 2 })}>
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
