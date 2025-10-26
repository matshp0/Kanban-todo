import { TaskDto } from "@todo/utils";
import { Typography, Box, Stack, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface TaskViewProps {
  task: TaskDto;
  onEdit: () => void;
}

export function TaskView({ task, onEdit }: TaskViewProps) {
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
        <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
          {task.name}
        </Typography>
      </Box>
      {task.description && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {task.description}
        </Typography>
      )}
      <Box sx={{ pt: 1, textAlign: "right" }}>
        <Tooltip title="Edit">
          <IconButton color="info" size="small" onClick={onEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
    </Stack>
  );
}
