import { TaskDto, CreateTaskDto, UpdateTaskDto } from "@todo/utils";
import { api } from "../api";

export const taskApi = {
  getTasksByBoardId: async (boardId: string): Promise<TaskDto[]> => {
    const response = await api.get(`/boards/${boardId}/tasks`);
    return response.data;
  },

  createTask: async (
    boardId: string,
    taskData: CreateTaskDto,
  ): Promise<TaskDto> => {
    const response = await api.post(`/boards/${boardId}/tasks`, taskData);
    return response.data;
  },

  updateTask: async (
    taskId: string,
    taskData: UpdateTaskDto,
  ): Promise<TaskDto> => {
    const response = await api.patch(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await api.delete(`/tasks/${taskId}`);
  },

  moveTask: async (
    taskId: string,
    newStatus: string,
    newPosition?: number,
  ): Promise<TaskDto> => {
    const response = await api.patch(`/tasks/${taskId}`, {
      status: newStatus,
      position: newPosition,
    });
    return response.data;
  },
};
