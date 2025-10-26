import { Box, Alert } from "@mui/material";
import { TaskDto, TaskStatus } from "@todo/utils";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { useEffect, useState } from "react";
import { Column } from "../../ui/column/Column";
import { Task } from "../../ui/task";
import { CreateTaskModal } from "../../ui/modal/CreateTaskModal";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  deleteTask,
  fetchTasksByBoardId,
  moveTask,
  setCurrentBoardTasks,
  updateTask,
} from "../../../store/slices/taskSlice";
import { moveItemInArray } from "./utils/moveTaskInArray";

export function TaskBoard() {
  const dispatch = useAppDispatch();
  const { currentBoard } = useAppSelector((state) => state.board);
  const { currentBoardTasks, error } = useAppSelector((state) => state.task);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [taskModalStatus, setTaskModalStatus] = useState<TaskStatus>(
    TaskStatus.ToDo,
  );

  const todoTasks = currentBoardTasks.filter(
    (t) => t.status === TaskStatus.ToDo,
  );
  const inProgressTasks = currentBoardTasks.filter(
    (t) => t.status === TaskStatus.InProgress,
  );
  const doneTasks = currentBoardTasks.filter(
    (t) => t.status === TaskStatus.Done,
  );

  const columns = [
    {
      name: TaskStatus.ToDo,
      title: "To Do",
      color: "#1976D2",
      tasks: todoTasks,
    },
    {
      name: TaskStatus.InProgress,
      title: "In Progress",
      color: "#1976D2",
      tasks: inProgressTasks,
    },
    {
      name: TaskStatus.Done,
      title: "Done",
      color: "#1976D2",
      tasks: doneTasks,
    },
  ];

  useEffect(() => {
    if (currentBoard?.id) {
      dispatch(fetchTasksByBoardId(currentBoard.id));
    }
  }, [currentBoard?.id, dispatch]);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) {
          return;
        }
        const { data } = destination;
        const sourceTask = source.data.task as TaskDto;

        if (data.name) {
          dispatch(
            moveTask({
              taskId: sourceTask.id,
              newStatus: data.name as string,
            }),
          );
          return;
        }

        if (data.task) {
          const destinationTask = data.task as TaskDto;
          const closestEdge = extractClosestEdge(data);
          const isBefore = closestEdge === "top";

          const updatedTasks = moveItemInArray(
            currentBoardTasks,
            sourceTask.id,
            destinationTask.id,
            isBefore,
          );

          dispatch(setCurrentBoardTasks(updatedTasks));

          if (destinationTask.status === sourceTask.status) return;

          dispatch(
            moveTask({
              taskId: sourceTask.id,
              newStatus: destinationTask.status,
            }),
          );
        }
      },
    });
  }, [currentBoardTasks, dispatch]);

  const handleAddTask = (status: TaskStatus) => {
    setTaskModalStatus(status);
    setIsCreateTaskModalOpen(true);
  };

  const handleTaskUpdate = (updatedTask: TaskDto) => {
    dispatch(
      updateTask({
        taskId: updatedTask.id,
        taskData: {
          name: updatedTask.name,
          description: updatedTask.description || "",
        },
      }),
    );
  };

  const handleTaskDelete = (deletedTask: TaskDto) => {
    dispatch(deleteTask(deletedTask.id));
  };

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        backgroundColor: "background.default",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {columns.map(({ name, title, color, tasks }) => (
        <Column
          title={title}
          color={color}
          key={name}
          destinationData={{ name }}
          onAddTask={() => handleAddTask(name)}
        >
          {tasks.map((task) => (
            <Task
              task={task}
              key={task.id}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
            />
          ))}
        </Column>
      ))}

      {currentBoard && (
        <CreateTaskModal
          open={isCreateTaskModalOpen}
          onClose={() => setIsCreateTaskModalOpen(false)}
          boardId={currentBoard.id}
          initialStatus={taskModalStatus}
        />
      )}
    </Box>
  );
}
