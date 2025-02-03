const breakpointNumbers = {
  xxxLarge: 1920,
  xxLarge: 1600,
  xLarge: 1300,
  large: 1020,
  medium: 768,
  small: 600,
  'sm-height': 500,
  xSmall: 500,
};

type BreakpointsType = {
  [key in
  | `min-${keyof typeof breakpointNumbers}`
  | `max-${keyof typeof breakpointNumbers}`]: string;
};

/**
 * xxxLarge: 1920
 * xxLarge: 1600
 * xLarge: 1300
 * large: 1020
 * medium: 768
 * small: 600
 * sm-height: 500
 * xSmall: 500
 */
export const breakpoints: BreakpointsType = (
  Object.keys(breakpointNumbers) as (keyof typeof breakpointNumbers)[]
).reduce((acc, key) => {
  acc[`min-${key}`] = `${breakpointNumbers[key]}px`;
  acc[`max-${key}`] = `${breakpointNumbers[key] - 1}px`;
  return acc;
}, {} as BreakpointsType);
