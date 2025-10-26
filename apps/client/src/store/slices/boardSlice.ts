import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BoardDto, CreateBoardDto } from "@todo/utils";
import { boardApi } from "../../services/api/boardApi";
import { getErrorMessage } from "../../utils/api/getErrorMessage";

export const createBoard = createAsyncThunk(
  "board/createBoard",
  async (boardData: CreateBoardDto, { rejectWithValue }) => {
    try {
      return await boardApi.createBoard(boardData);
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, "Failed to create board"));
    }
  },
);

export const searchBoardById = createAsyncThunk(
  "board/searchBoardById",
  async (boardId: string, { rejectWithValue }) => {
    try {
      return await boardApi.getBoardById(boardId);
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, "Board not found"));
    }
  },
);

export const updateBoardName = createAsyncThunk(
  "board/updateBoardName",
  async (
    { boardId, name }: { boardId: string; name: string },
    { rejectWithValue },
  ) => {
    try {
      return await boardApi.updateBoardName(boardId, name);
    } catch (error: unknown) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to update board name"),
      );
    }
  },
);

interface BoardState {
  boards: BoardDto[];
  currentBoard: BoardDto | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  searchResults: BoardDto[];
}

const initialState: BoardState = {
  boards: [],
  currentBoard: null,
  searchQuery: "",
  loading: false,
  error: null,
  searchResults: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    setCurrentBoard: (state, action: PayloadAction<BoardDto | null>) => {
      state.currentBoard = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.boards.push(action.payload);
        state.currentBoard = action.payload;
        state.error = null;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(searchBoardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBoardById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
        state.searchResults = [action.payload];
        state.error = null;
      })
      .addCase(searchBoardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.searchResults = [];
      });

    builder
      .addCase(updateBoardName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBoardName.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.boards.findIndex(
          (board) => board.id === action.payload.id,
        );
        if (index !== -1) {
          state.boards[index] = action.payload;
        }
        if (state.currentBoard?.id === action.payload.id) {
          state.currentBoard = action.payload;
        }
        state.error = null;
      })
      .addCase(updateBoardName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchQuery,
  clearSearchResults,
  setCurrentBoard,
  clearError,
} = boardSlice.actions;
export default boardSlice.reducer;
