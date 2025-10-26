export function moveItemInArray<T extends { id: string }>(
  items: T[],
  targetId: string,
  destinationId: string,
  isBefore: boolean,
): T[] {
  const targetIndex = items.findIndex((t) => t.id === targetId);
  const destinationIndex = items.findIndex((t) => t.id === destinationId);

  if (targetIndex === -1 || destinationIndex === -1) return items;

  const newTasks = [...items];
  const [movedTask] = newTasks.splice(targetIndex, 1);

  let insertIndex = destinationIndex;
  if (!isBefore) insertIndex += 1;

  if (targetIndex < destinationIndex) insertIndex -= 1;

  newTasks.splice(insertIndex, 0, movedTask);

  return newTasks;
}
