import { DragEvent } from 'react';

export const preventDefaultAndStopPropagation = (
  event: DragEvent<HTMLElement>
) => {
  event.stopPropagation();
  event.preventDefault();
};
