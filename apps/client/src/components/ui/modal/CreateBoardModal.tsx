import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createBoard, clearError } from "../../../store/slices/boardSlice";

interface CreateBoardModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateBoardModal({ open, onClose }: CreateBoardModalProps) {
  const [boardName, setBoardName] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.board);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!boardName.trim()) return;

    try {
      await dispatch(createBoard({ name: boardName.trim() })).unwrap();
      setBoardName("");
      onClose();
    } catch (error) {
      console.error("Failed to create board:", error);
    }
  };

  const handleClose = () => {
    setBoardName("");
    dispatch(clearError());
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Board</DialogTitle>
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
              label="Board Name"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              placeholder="Enter board name..."
              disabled={loading}
              sx={{ mt: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !boardName.trim()}
          >
            {loading ? "Creating..." : "Create Board"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
