declare const breakpointNumbers: {
  xxxLarge: number;
  xxlarge: number;
  xLarge: number;
  large: number;
  medium: number;
  small: number;
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
 */
export declare const breakpoints: BreakpointsType;
