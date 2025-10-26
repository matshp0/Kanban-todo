export {
  TaskStatus,
  CreateTaskDto,
  UpdateTaskDto,
  CreateBoardDto,
  UpdateBoardDto,
} from "@todo/utils";
export { TaskDto, BoardDto } from "@todo/utils";

import { TaskDto, BoardDto } from "@todo/utils";
export type Task = TaskDto;
export type Board = BoardDto;

export interface RootState {
  board: {
    boards: Board[];
    currentBoard: Board | null;
    searchQuery: string;
    loading: boolean;
    error: string | null;
    searchResults: Board[];
  };
  task: {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    currentBoardTasks: Task[];
  };
}
