import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TaskDto, CreateTaskDto, UpdateTaskDto } from "@todo/utils";
import { taskApi } from "../../services/api/taskApi";
import { getErrorMessage } from "../../utils/api/getErrorMessage";

export const fetchTasksByBoardId = createAsyncThunk(
  "task/fetchTasksByBoardId",
  async (boardId: string, { rejectWithValue }) => {
    try {
      return await taskApi.getTasksByBoardId(boardId);
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch tasks"));
    }
  },
);

export const createTask = createAsyncThunk(
  "task/createTask",
  async (
    { boardId, taskData }: { boardId: string; taskData: CreateTaskDto },
    { rejectWithValue },
  ) => {
    try {
      return await taskApi.createTask(boardId, taskData);
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, "Failed to create task"));
    }
  },
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (
    { taskId, taskData }: { taskId: string; taskData: UpdateTaskDto },
    { rejectWithValue },
  ) => {
    try {
      return await taskApi.updateTask(taskId, taskData);
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, "Failed to update task"));
    }
  },
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      await taskApi.deleteTask(taskId);
      return taskId; // return deleted id
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, "Failed to delete task"));
    }
  },
);

export const moveTask = createAsyncThunk(
  "task/moveTask",
  async (
    {
      taskId,
      newStatus,
      newPosition,
    }: { taskId: string; newStatus: string; newPosition?: number },
    { rejectWithValue },
  ) => {
    try {
      return await taskApi.moveTask(taskId, newStatus, newPosition);
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, "Failed to move task"));
    }
  },
);

interface TaskState {
  tasks: TaskDto[];
  loading: boolean;
  error: string | null;
  currentBoardTasks: TaskDto[];
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  currentBoardTasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setCurrentBoardTasks: (state, action: PayloadAction<TaskDto[]>) => {
      state.currentBoardTasks = action.payload;
    },
    updateTaskInState: (state, action: PayloadAction<TaskDto>) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }

      const currentIndex = state.currentBoardTasks.findIndex(
        (task) => task.id === updatedTask.id,
      );
      if (currentIndex !== -1) {
        state.currentBoardTasks[currentIndex] = updatedTask;
      }
    },
    removeTaskFromState: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      state.currentBoardTasks = state.currentBoardTasks.filter(
        (task) => task.id !== taskId,
      );
    },
    clearError: (state) => {
      state.error = null;
    },
    clearTasks: (state) => {
      state.tasks = [];
      state.currentBoardTasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksByBoardId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksByBoardId.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoardTasks = action.payload;
        action.payload.forEach((task) => {
          const existingIndex = state.tasks.findIndex((t) => t.id === task.id);
          if (existingIndex !== -1) {
            state.tasks[existingIndex] = task;
          } else {
            state.tasks.push(task);
          }
        });
        state.error = null;
      })
      .addCase(fetchTasksByBoardId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.currentBoardTasks.push(action.payload);
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(
          (task) => task.id === updatedTask.id,
        );
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }

        const currentIndex = state.currentBoardTasks.findIndex(
          (task) => task.id === updatedTask.id,
        );
        if (currentIndex !== -1) {
          state.currentBoardTasks[currentIndex] = updatedTask;
        }
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        const taskId = action.payload;
        state.tasks = state.tasks.filter((task) => task.id !== taskId);
        state.currentBoardTasks = state.currentBoardTasks.filter(
          (task) => task.id !== taskId,
        );
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(moveTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(
          (task) => task.id === updatedTask.id,
        );
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }

        const currentIndex = state.currentBoardTasks.findIndex(
          (task) => task.id === updatedTask.id,
        );
        if (currentIndex !== -1) {
          state.currentBoardTasks[currentIndex] = updatedTask;
        }
        state.error = null;
      })
      .addCase(moveTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentBoardTasks,
  updateTaskInState,
  removeTaskFromState,
  clearError,
  clearTasks,
} = taskSlice.actions;
export default taskSlice.reducer;
