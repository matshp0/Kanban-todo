import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  Typography,
  Paper,
  Stack,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

interface ColumnProps {
  title: string;
  color: string;
  destinationData: Record<string, unknown>;
  children?: React.ReactNode;
  onAddTask?: () => void;
}

export function Column({
  title,
  color,
  children,
  destinationData,
  onAddTask,
}: ColumnProps) {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    invariant(el);
    return combine(
      dropTargetForElements({
        element: el,
        canDrop({ source }) {
          return source.element !== el;
        },
        getData() {
          return destinationData;
        },
        getIsSticky() {
          return true;
        },
        onDragEnter() {
          setIsDraggedOver(true);
        },
        onDragLeave() {
          setIsDraggedOver(false);
        },
        onDrop() {
          setIsDraggedOver(false);
        },
      }),
      autoScrollForElements({
        element: el,
      }),
    );
  }, [destinationData]);

  return (
    <Paper
      elevation={1}
      sx={{
        width: 350,
        m: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        flex: 1,
        height: "100%",
      }}
    >
      <Box
        sx={{
          p: 2,
          pb: 1.5,
          borderRadius: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: "bold",
            color: color,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {title}
        </Typography>
        <IconButton
          size="small"
          onClick={onAddTask}
          sx={{
            color: color,
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      <Stack
        ref={ref}
        spacing={1}
        sx={{
          p: 1,
          overflow: "auto",
          flexGrow: 1,
          backgroundColor: !isDraggedOver ? "grey.50" : "aliceblue",
        }}
      >
        {children}
      </Stack>
    </Paper>
  );
}
