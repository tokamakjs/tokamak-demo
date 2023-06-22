import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Input,
  Link,
  ModalClose,
  ModalDialog,
  Typography,
} from '@mui/joy';
import Modal from '@mui/joy/Modal';
import { Link as A, useController, useState } from '@tokamakjs/react';

import { ProjectController } from './project.controller';

interface ProjectViewProps {}

export const ProjectView = ({}: ProjectViewProps) => {
  const ctrl = useController<ProjectController>();

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
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
          {ctrl.isLoading ? (
            'Loading...'
          ) : (
            <>
              <Box
                sx={() => ({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                })}>
                <Typography level="h1">Project: {ctrl.project!.title}</Typography>
              </Box>
              <Box sx={() => ({ my: 4 })}>
                {ctrl.tasks.map((t) => (
                  <Card
                    key={t.id}
                    variant="outlined"
                    sx={() => ({ my: 2, cursor: 'pointer' })}
                    onClick={() => (t.done ? ctrl.uncheckTask(t.id) : ctrl.checkTask(t.id))}>
                    <CardContent>
                      {t.done ? 'Done' : 'Pending'} {t.title}
                    </CardContent>
                  </Card>
                ))}
              </Box>
              <Box sx={() => ({ my: 4 })}>
                <Button onClick={() => setIsDialogVisible(true)}>Add Task</Button>
              </Box>
              <Link>
                <A href="/projects">Go back</A>
              </Link>
            </>
          )}
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
