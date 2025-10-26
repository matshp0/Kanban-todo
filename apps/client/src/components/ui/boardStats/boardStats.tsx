import { Box, Typography, Stack, Divider } from "@mui/material";

interface Stat {
  label: string;
  value: number;
  color?: string;
}

interface BoardStatsProps {
  stats: Stat[];
}

export function BoardStats({ stats }: BoardStatsProps) {
  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{
        p: 2,
        bgcolor: "grey.50",
        borderRadius: 2,
      }}
    >
      {stats.map((stat, index) => (
        <Box key={index}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color={stat.color || "primary"}
          >
            {stat.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {stat.label}
          </Typography>
          {index < stats.length - 1 && (
            <Divider orientation="vertical" flexItem />
          )}
        </Box>
      ))}
    </Stack>
  );
}
