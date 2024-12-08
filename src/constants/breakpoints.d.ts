declare const breakpointNumbers: {
  xxLarge: number;
  xlarge: number;
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
 * xxlarge: 1920
 * xlarge: 1600
 * large: 1020
 * medium: 768
 * small: 600
 */
export declare const breakpoints: BreakpointsType;
export { };
