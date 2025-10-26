import { TaskDto } from "@todo/utils";
import { Paper, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TaskEdit } from "./TaskEdit";
import { useEffect, useRef, useState } from "react";
import { getStatusColor } from "./utils";
import { TaskView } from "./TaskView";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import invariant from "tiny-invariant";
import { DropIndicator } from "../dropIndicator/DropIndicator";

interface TaskProps {
  task: TaskDto;
  onUpdate?: (updated: TaskDto) => void;
  onDelete?: (deleted: TaskDto) => void;
}

type TaskState =
  | {
      type: "idle";
    }
  | {
      type: "preview";
      container: HTMLElement;
    }
  | {
      type: "is-dragging";
    }
  | {
      type: "is-dragging-over";
      closestEdge: Edge | null;
    };

const idle: TaskState = { type: "idle" };

export function Task({ task, onUpdate, onDelete }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const isEditingRef = useRef(false);
  const [state, setState] = useState<TaskState>(idle);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    isEditingRef.current = isEditing;
  }, [isEditing]);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return combine(
      draggable({
        element: el,
        getInitialData: () => {
          return { task };
        },
        canDrag() {
          return !isEditingRef.current;
        },
        onDragStart() {
          setState({ type: "is-dragging" });
        },
        onDrop() {
          setState(idle);
        },
      }),
      dropTargetForElements({
        element: el,
        canDrop({ source }) {
          if (source.element === el) {
            return false;
          }
          return true;
        },
        getData({ input }) {
          const data = { task };
          return attachClosestEdge(data, {
            element: el,
            input,
            allowedEdges: ["top", "bottom"],
          });
        },
        getIsSticky() {
          return true;
        },
        onDragEnter({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          setState({ type: "is-dragging-over", closestEdge });
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          setState((current) => {
            if (
              current.type === "is-dragging-over" &&
              current.closestEdge === closestEdge
            ) {
              return current;
            }
            return { type: "is-dragging-over", closestEdge };
          });
        },
        onDragLeave() {
          setState(idle);
        },
        onDrop() {
          setState(idle);
        },
      }),
    );
  }, []);

  const handleSave = (task: TaskDto) => {
    setIsEditing(false);
    if (onUpdate) onUpdate(task);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(task);
  };

  return (
    <Paper
      ref={ref}
      elevation={2}
      sx={{
        opacity: state.type === "is-dragging" ? 0.4 : 1,
        zIndex: 999,
        m: 0,
        p: 2,
        pl: 0,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          borderTopLeftRadius: 2,
          borderBottomLeftRadius: 2,
          backgroundColor: getStatusColor(task.status),
        }}
      />

      {!isEditing && (
        <IconButton
          size="small"
          onClick={handleDelete}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "text.secondary",
            opacity: 0.6,
            transition: "opacity 0.2s",
            "&:hover": {
              opacity: 1,
              backgroundColor: "action.hover",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}

      <Box sx={{ pl: 2 }}>
        {isEditing ? (
          <TaskEdit task={task} onSave={handleSave} onCancel={handleCancel} />
        ) : (
          <TaskView task={task} onEdit={() => setIsEditing(true)} />
        )}
      </Box>

      {state.type === "is-dragging-over" && state.closestEdge ? (
        <DropIndicator edge={state.closestEdge} gap={"8px"} />
      ) : null}
    </Paper>
  );
}
