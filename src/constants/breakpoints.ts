const breakpointNumbers = {
  xxlarge: 1920,
  xlarge: 1600,
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
 * xxlarge: 1920
 * xlarge: 1600
 * large: 1020
 * medium: 768
 * small: 600
 */
export const breakpoints: BreakpointsType = (
  Object.keys(breakpointNumbers) as (keyof typeof breakpointNumbers)[]
).reduce((acc, key) => {
  acc[`min-${key}`] = `${breakpointNumbers[key]}px`;
  acc[`max-${key}`] = `${breakpointNumbers[key] - 1}px`;
  return acc;
}, {} as BreakpointsType);
