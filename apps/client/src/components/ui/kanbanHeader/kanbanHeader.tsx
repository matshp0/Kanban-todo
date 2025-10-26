import {
  Box,
  Button,
  Stack,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SearchBar } from "../../ui/searchbar/SearchBar";
import { useState } from "react";

interface KanbanHeaderProps {
  currentBoardId?: string;
  onCreateBoard?: () => void;
  onSearch?: (value: string) => void;
}

export function KanbanHeader({
  currentBoardId,
  onCreateBoard,
  onSearch,
}: KanbanHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyBoardId = async () => {
    if (!currentBoardId) return;

    try {
      await navigator.clipboard.writeText(currentBoardId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy board ID:", err);
    }
  };

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ flex: "1 1 300px", maxWidth: "500px" }}>
          <SearchBar
            placeholder="Enter board id or search boards..."
            onChange={onSearch}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {currentBoardId && (
            <Tooltip title={copied ? "Copied!" : "Copy Board ID"}>
              <IconButton
                onClick={handleCopyBoardId}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          )}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="large"
            sx={{ borderRadius: 2 }}
            onClick={onCreateBoard}
          >
            Create New Board
          </Button>
        </Box>
      </Box>
      <Divider />
    </Stack>
  );
}
