# Redux Store

This directory contains the Redux store configuration and slices for the Kanban application.

## Structure

- `index.ts` - Main store configuration
- `hooks.ts` - Typed Redux hooks for TypeScript
- `slices/boardSlice.ts` - Board-related state management

## Features

### Board Management
- Create new boards
- Search boards by ID
- Fetch all boards
- Error handling and loading states

### State Structure
```typescript
interface BoardState {
  boards: Board[];           // All boards
  currentBoard: Board | null; // Currently selected board
  searchQuery: string;       // Current search query
  loading: boolean;          // Loading state
  error: string | null;      // Error message
  searchResults: Board[];    // Search results
}
```

## Usage

```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createBoard, searchBoardById } from '../store/slices/boardSlice';

// In your component
const dispatch = useAppDispatch();
const { currentBoard, loading, error } = useAppSelector(state => state.board);

// Create a board
dispatch(createBoard({ name: 'My Board' }));

// Search for a board
dispatch(searchBoardById('board-id'));
```

## API Integration

The store integrates with the backend API through the `services/api.ts` file. Make sure your backend is running on the configured URL (default: `http://localhost:3000/api`).
