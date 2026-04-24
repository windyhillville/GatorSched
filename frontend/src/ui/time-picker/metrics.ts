// export const SLOT_HEIGHT = 34;
// export const SLOT_GAP = 5;
// export const ITEM_SIZE = SLOT_HEIGHT + SLOT_GAP;
// export const WINDOW_SIZE = 5;
// export const ROWS_ABOVE_SELECTED = Math.floor(WINDOW_SIZE / 2);
// export const VIEWPORT_HEIGHT = WINDOW_SIZE * ITEM_SIZE;

export const TIME_PICKER_SIZES = {
  regular: {
    slotHeight: 34,
    slotGap: 5,
    windowSize: 5,
  },
  compact: {
    slotHeight: 28,
    slotGap: 4,
    windowSize: 5,
  },
} as const;

export type TimePickerVariant = keyof typeof TIME_PICKER_SIZES;

export function getTimePickerMetrics(variant: TimePickerVariant = 'regular') {
  const { slotHeight, slotGap, windowSize } = TIME_PICKER_SIZES[variant];
  const itemSize = slotHeight + slotGap;
  const rowsAboveSelected = Math.floor(windowSize / 2);
  const viewportHeight = windowSize * itemSize;

  return {
    slotHeight,
    slotGap,
    itemSize,
    windowSize,
    rowsAboveSelected,
    viewportHeight,
  };
}
