import { FunctionComponent, SVGProps } from 'react';

export interface SkillType {
  label: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  layer: number;
  angle: number;
  iconWidth: number;
  iconHeight: number;
  iconX: number;
  iconY: number;
  x: { horizontal: number; vertical: number };
  y: { horizontal: number; vertical: number };
  connectedIndex?: number;
  delay: number;
}
