import { CreateBoardDto, BoardDto } from "@todo/utils";
import { api } from "../api";

export const boardApi = {
  createBoard: async (boardData: CreateBoardDto): Promise<BoardDto> => {
    const response = await api.post("/boards", boardData);
    return response.data;
  },

  getBoardById: async (boardId: string): Promise<BoardDto> => {
    const response = await api.get(`/boards/${boardId}`);
    return response.data;
  },

  updateBoardName: async (boardId: string, name: string): Promise<BoardDto> => {
    const response = await api.patch(`/boards/${boardId}/name`, { name });
    return response.data;
  },

  deleteBoard: async (boardId: string): Promise<void> => {
    await api.delete(`/boards/${boardId}`);
  },
};
