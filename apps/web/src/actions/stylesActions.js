export const HEADER_BACKGROUND_CHANGING = '@@header/HEADER_BACKGROUND_CHANGING';
export const HEADER_LABEL_CHANGING = '@@header/HEADER_LABEL_CHANGING';
export const PAGE_NAVIGATION_COLOR_CHANGING = '@@navigation/PAGE_NAVIGATION_COLOR_CHANGING';

export const changeHeaderBackgroundAction = (background) => ({
  type: HEADER_BACKGROUND_CHANGING,
  payload: background
});

export const changeNavigationColorAction = (color) => ({
  type: PAGE_NAVIGATION_COLOR_CHANGING,
  payload: color
});

export const changingLabelInHeaderAction = (isMain) => ({
  type: HEADER_LABEL_CHANGING,
  payload: isMain
});