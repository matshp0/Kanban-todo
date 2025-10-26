import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createTask, clearError } from "../../../store/slices/taskSlice";
import { TaskStatus } from "@todo/utils";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  boardId: string;
  initialStatus?: TaskStatus;
}

export function CreateTaskModal({
  open,
  onClose,
  boardId,
  initialStatus = TaskStatus.ToDo,
}: CreateTaskModalProps) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(initialStatus);

  useEffect(() => {
    setTaskStatus(initialStatus);
  }, [initialStatus]);

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.task);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    try {
      await dispatch(
        createTask({
          boardId,
          taskData: {
            name: taskName.trim(),
            description: taskDescription.trim() || undefined,
            status: taskStatus,
          },
        }),
      ).unwrap();
      setTaskName("");
      setTaskDescription("");
      setTaskStatus(TaskStatus.ToDo);
      onClose();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleClose = () => {
    setTaskName("");
    setTaskDescription("");
    dispatch(clearError());
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Task</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              autoFocus
              fullWidth
              label="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name..."
              disabled={loading}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description (optional)..."
              disabled={loading}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth disabled={loading}>
              <InputLabel>Status</InputLabel>
              <Select
                value={taskStatus}
                label="Status"
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <MenuItem value={"ToDo"}>To Do</MenuItem>
                <MenuItem value={"InProgress"}>In Progress</MenuItem>
                <MenuItem value={"Done"}>Done</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !taskName.trim()}
          >
            {loading ? "Creating..." : "Create Task"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
