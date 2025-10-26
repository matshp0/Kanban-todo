import {
  Box,
  Typography,
  IconButton,
  TextField,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useState } from "react";

interface BoardInfoProps {
  title: string;
  lastUpdated?: string;
  boardId?: string;
  onUpdateName?: (boardId: string, newName: string) => void;
  isUpdating?: boolean;
}

export function BoardInfo({
  title,
  boardId,
  onUpdateName,
  isUpdating = false,
}: BoardInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(title);
  };

  const handleSave = () => {
    if (
      boardId &&
      onUpdateName &&
      editValue.trim() &&
      editValue.trim() !== title
    ) {
      onUpdateName(boardId, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(title);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSave();
    } else if (event.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box sx={{ flex: 1 }}>
        {isEditing ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <TextField
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyPress}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "2rem",
                  fontWeight: "bold",
                },
              }}
              autoFocus
              disabled={isUpdating}
            />
            <Tooltip title="Save">
              <IconButton
                onClick={handleSave}
                color="primary"
                size="small"
                disabled={isUpdating || !editValue.trim()}
              >
                {isUpdating ? <CircularProgress size={16} /> : <CheckIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <IconButton
                onClick={handleCancel}
                color="secondary"
                size="small"
                disabled={isUpdating}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography variant="h4" fontWeight="bold">
              {title}
            </Typography>
            {boardId && onUpdateName && (
              <Tooltip title="Edit board name">
                <IconButton
                  onClick={handleEdit}
                  color="primary"
                  size="small"
                  disabled={isUpdating}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
