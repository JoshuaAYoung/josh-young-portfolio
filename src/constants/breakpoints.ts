const breakpointNumbers = {
  xlarge: 1920,
  large: 1020,
  medium: 768,
  small: 600,
};

type BreakpointsType = {
  [key in
  | `min-${keyof typeof breakpointNumbers}`
  | `max-${keyof typeof breakpointNumbers}`]: string;
};

/**
 * xlarge: 1920
 * large: 1020
 * medium: 768
 * small: 600
 */
export const breakpoints: BreakpointsType = Object.keys(
  breakpointNumbers,
).reduce((acc, key) => {
  acc[`min-${key}`] = `${breakpointNumbers[key]}px`;
  acc[`max-${key}`] = `${breakpointNumbers[key] - 1}px`;
  return acc;
}, {} as BreakpointsType);
