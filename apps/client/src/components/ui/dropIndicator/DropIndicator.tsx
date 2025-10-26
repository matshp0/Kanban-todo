import { Box } from "@mui/material";
import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/types";

const strokeSize = 2;
const terminalSize = 8;
const offsetToAlignTerminalWithLine = (strokeSize - terminalSize) / 2;

const edgeToOrientationMap: Record<Edge, "horizontal" | "vertical"> = {
  top: "horizontal",
  bottom: "horizontal",
  left: "vertical",
  right: "vertical",
};

export function DropIndicator({ edge, gap }: { edge: Edge; gap: string }) {
  const lineOffset = `calc(-0.5 * (${gap} + ${strokeSize}px))`;
  const orientation = edgeToOrientationMap[edge];

  const commonStyles: React.CSSProperties = {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "#1E40AF",
    pointerEvents: "none",
  };

  const lineStyles: React.CSSProperties =
    orientation === "horizontal"
      ? {
          height: `${strokeSize}px`,
          left: `${terminalSize / 2}px`,
          right: "0",
          top: lineOffset,
        }
      : {
          width: `${strokeSize}px`,
          top: `${terminalSize / 2}px`,
          bottom: "0",
          left: lineOffset,
        };

  const terminalStyles: React.CSSProperties = {
    content: '""',
    position: "absolute",
    width: `${terminalSize}px`,
    height: `${terminalSize}px`,
    borderRadius: "50%",
    border: `${strokeSize}px solid #1E40AF`,
    boxSizing: "border-box",
  };

  const terminalPosition: React.CSSProperties = (() => {
    switch (edge) {
      case "top":
        return {
          top: offsetToAlignTerminalWithLine,
          left: `-${terminalSize}px}`,
        };
      case "bottom":
        return {
          bottom: offsetToAlignTerminalWithLine,
          left: `-${terminalSize}px}`,
        };
      case "left":
        return {
          left: offsetToAlignTerminalWithLine,
          top: `-${terminalSize}px}`,
        };
      case "right":
        return {
          right: offsetToAlignTerminalWithLine,
          top: `-${terminalSize}px}`,
        };
      default:
        return {};
    }
  })();

  const topOrBottom: React.CSSProperties = (() => {
    switch (edge) {
      case "top":
        return { top: lineOffset };
      case "bottom":
        return { top: undefined, bottom: lineOffset };
      default:
        return {};
    }
  })();

  return (
    <Box sx={{ ...commonStyles, ...lineStyles, ...topOrBottom }}>
      <Box sx={{ ...terminalStyles, ...terminalPosition }} />
    </Box>
  );
}
