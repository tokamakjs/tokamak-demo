import { HomeOutlined } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormLabel,
  Input,
  Link,
  ModalClose,
  ModalDialog,
  Sheet,
  Typography,
} from '@mui/joy';
import Modal from '@mui/joy/Modal';
import { Link as A, useController, useState } from '@tokamakjs/react';

import { AppBar } from '../../components/AppBar';
import { ProjectController } from './project.controller';

interface ProjectViewProps {}

export const ProjectView = ({}: ProjectViewProps) => {
  const ctrl = useController<ProjectController>();

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [updatingTasks, setUpdatingTasks] = useState([] as Array<string>);

  return (
    <>
      <AppBar onClickLogout={() => ctrl.logout()} />
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', my: 5 }}>
        <Container>
          {ctrl.isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography level="h1">{ctrl.project!.title}</Typography>
                <Button onClick={() => setIsDialogVisible(true)}>Add Task</Button>
              </Box>
              <Box sx={{ my: 4 }}>
                {ctrl.tasks.map((t) => (
                  <Sheet
                    key={t.id}
                    variant="outlined"
                    sx={{ my: 2, cursor: 'pointer', p: 2, borderRadius: 'sm' }}
                    onClick={async () => {
                      setUpdatingTasks((tasks) => [...new Set([...tasks, t.id])]);
                      t.done ? await ctrl.uncheckTask(t.id) : await ctrl.checkTask(t.id);
                      setUpdatingTasks((tasks) => {
                        const n = new Set([...tasks, t.id]);
                        n.delete(t.id);
                        return [...n];
                      });
                    }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {updatingTasks.includes(t.id) ? (
                          <CircularProgress size="sm" />
                        ) : (
                          <Checkbox checked={t.done} />
                        )}
                        <Typography
                          sx={{
                            marginLeft: 2,
                            textDecoration: t.done ? 'line-through' : undefined,
                          }}>
                          {t.title}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Sheet>
                ))}
              </Box>
              <Link>
                <A href="/projects">Go back</A>
              </Link>
            </>
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
            Add new task
          </Typography>
          <FormControl sx={() => ({ m: 2 })}>
            <FormLabel>Task title</FormLabel>
            <Input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
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
                await ctrl.createTask(newTaskTitle);
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
