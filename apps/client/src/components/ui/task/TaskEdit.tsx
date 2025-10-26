import { TaskDto } from "@todo/utils";
import { useState } from "react";
import { Box, Stack, TextField, IconButton, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

interface TaskEditProps {
  task: TaskDto;
  onSave: (updated: TaskDto) => void;
  onCancel: () => void;
}

export function TaskEdit({ task, onSave, onCancel }: TaskEditProps) {
  const [editedTask, setEditedTask] = useState<TaskDto>(task);

  const handleSave = () => {
    onSave(editedTask);
  };

  return (
    <Stack spacing={1.5}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          value={editedTask.name}
          onChange={(e) =>
            setEditedTask({ ...editedTask, name: e.target.value })
          }
          sx={{ flexGrow: 1 }}
        />
      </Box>
      <TextField
        variant="outlined"
        multiline
        minRows={2}
        value={editedTask.description || ""}
        onChange={(e) =>
          setEditedTask({ ...editedTask, description: e.target.value })
        }
        placeholder="Enter task description..."
      />
      <Box sx={{ pt: 1, textAlign: "right" }}>
        <Tooltip title="Save">
          <IconButton color="success" onClick={handleSave}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel">
          <IconButton color="error" onClick={onCancel}>
            <CancelIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Stack>
  );
}
