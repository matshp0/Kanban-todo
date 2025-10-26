import {
  Box,
  Container,
  Paper,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CreateBoardModal } from "../../ui/modal/CreateBoardModal";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  searchBoardById,
  setSearchQuery,
  clearSearchResults,
  updateBoardName,
} from "../../../store/slices/boardSlice";
import { BoardInfo } from "../../ui/boardInfo/boardInfo";
import { BoardStats } from "../../ui/boardStats/boardStats";
import { KanbanHeader } from "../../ui/kanbanHeader/kanbanHeader";
import { TaskBoard } from "../../ui/taskBoard/TaskBoard";

export function Kanban() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { currentBoard, loading, error } = useAppSelector(
    (state) => state.board,
  );
  const { tasks } = useAppSelector((state) => state.task);

  useEffect(() => {
    const EXAMPLE_ID = import.meta.env.VITE_EXAMPLE_BOARD_ID as
      | string
      | undefined;
    if (!EXAMPLE_ID) return;
    dispatch(searchBoardById(EXAMPLE_ID));
  }, [dispatch]);

  const stats = [
    { label: "Total Tasks", value: tasks.length, color: "primary" },
    {
      label: "In Progress",
      value: tasks.filter((t) => t.status === "InProgress").length,
      color: "warning.main",
    },
    {
      label: "Completed",
      value: tasks.filter((t) => t.status === "Done").length,
      color: "success.main",
    },
  ];

  const handleCreateBoard = () => {
    setIsCreateModalOpen(true);
  };

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      dispatch(clearSearchResults());
      return;
    }

    const isBoardId =
      /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(
        value.trim(),
      );

    if (isBoardId) {
      dispatch(searchBoardById(value.trim()));
    } else {
      dispatch(setSearchQuery(value));
    }
  };

  const handleUpdateBoardName = (boardId: string, newName: string) => {
    dispatch(updateBoardName({ boardId, name: newName }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: 3,
          flexShrink: 0,
        }}
      >
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
          <Stack spacing={3}>
            <KanbanHeader
              currentBoardId={currentBoard?.id}
              onCreateBoard={handleCreateBoard}
              onSearch={handleSearch}
            />
            {error && (
              <Alert
                severity="error"
                onClose={() => dispatch(clearSearchResults())}
              >
                {error}
              </Alert>
            )}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <CircularProgress />
              </Box>
            )}
            <BoardInfo
              title={currentBoard?.name || "Project Board"}
              boardId={currentBoard?.id}
              onUpdateName={handleUpdateBoardName}
              isUpdating={loading}
            />
            <BoardStats stats={stats} />
          </Stack>
        </Paper>
      </Container>

      <Container
        maxWidth="xl"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          pb: 3,
        }}
      >
        <TaskBoard />
      </Container>

      <CreateBoardModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Box>
  );
}
