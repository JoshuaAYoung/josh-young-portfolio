import { useMemo } from 'react';
import { SkillType } from '../types/skills.types';
import Auth0Icon from '../assets/icons/tech/auth0.svg?react';
import AwsIcon from '../assets/icons/tech/aws.svg?react';
import BackendIcon from '../assets/icons/tech/backend.svg?react';
import CiCdIcon from '../assets/icons/tech/cicd.svg?react';
import CssIcon from '../assets/icons/tech/css.svg?react';
import DevtoolsIcon from '../assets/icons/tech/devtools.svg?react';
import ExpoIcon from '../assets/icons/tech/expo.svg?react';
import ExpressIcon from '../assets/icons/tech/express.svg?react';
import MotionIcon from '../assets/icons/tech/framer-motion.svg?react';
import FrontendIcon from '../assets/icons/tech/frontend.svg?react';
import GithubIcon from '../assets/icons/tech/github.svg?react';
import GraphqlIcon from '../assets/icons/tech/gql.svg?react';
import HtmlIcon from '../assets/icons/tech/html.svg?react';
import JestIcon from '../assets/icons/tech/jest.svg?react';
import JQueryIcon from '../assets/icons/tech/jquery.svg?react';
import LockIcon from '../assets/icons/tech/lock.svg?react';
import NodeIcon from '../assets/icons/tech/node.svg?react';
import PostgresIcon from '../assets/icons/tech/postgresql.svg?react';
import ReactIcon from '../assets/icons/tech/react.svg?react';
import ReduxIcon from '../assets/icons/tech/redux.svg?react';
import SequelizeIcon from '../assets/icons/tech/sequelize.svg?react';
import TypescriptIcon from '../assets/icons/tech/typescript.svg?react';

export const useSkillsData = (): SkillType[] => {
  const delayMultiplier = 1;
  const defaultCenterMultiplier = 1.6;
  const getRandomDelay = (): number => Math.random() * 0.8 - 0.4;

  const skillsLayerOne: SkillType[] = useMemo(
    () => [
      {
        label: 'Backend',
        icon: BackendIcon,
        layer: 1,
        angle: 0,
        iconWidth: 64,
        iconHeight: 58,
        iconX: -32,
        iconY: -34,
        x: { horizontal: 650, vertical: 287 },
        y: { horizontal: 179, vertical: 650 },
        delay: delayMultiplier + Math.round(getRandomDelay() * 100) / 100,
      }, // 0
      {
        label: 'Devtools',
        icon: DevtoolsIcon,
        layer: 1,
        angle: 90,
        iconWidth: 64,
        iconHeight: 58,
        iconX: -32,
        iconY: -34,
        x: { horizontal: 500, vertical: 137 },
        y: { horizontal: 329, vertical: 500 },
        delay: delayMultiplier + Math.round(getRandomDelay() * 100) / 100,
      }, // 1
      {
        label: 'Frontend',
        icon: FrontendIcon,
        layer: 1,
        angle: 180,
        iconWidth: 64,
        iconHeight: 58,
        iconX: -32,
        iconY: -34,
        x: { horizontal: 350, vertical: 287 },
        y: { horizontal: 179, vertical: 350 },
        delay: delayMultiplier + Math.round(getRandomDelay() * 100) / 100,
      }, // 2
    ],
    [],
  );

  const skillsLayerTwo: SkillType[] = useMemo(() => {
    const getTotalDelayLayerTwo = (connectedIndex: number): number => {
      const calculatedDelay =
        skillsLayerOne[connectedIndex].delay +
        delayMultiplier +
        getRandomDelay();
      return Math.round(calculatedDelay * 100) / 100;
    };

    return [
      {
        label: 'Python',
        icon: LockIcon,
        layer: 2,
        angle: 328.5,
        connectedIndex: 0,
        iconWidth: 25,
        iconHeight: 32,
        iconX: (25 / 2) * -1,
        iconY: -18,
        x: { horizontal: 718, vertical: 421 },
        y: { horizontal: 45, vertical: 718 },
        delay: getTotalDelayLayerTwo(0),
        centerMultiplier: defaultCenterMultiplier,
      }, // 3 | 0
      {
        label: 'PostgreSQL',
        icon: PostgresIcon,
        layer: 2,
        angle: 352,
        connectedIndex: 0,
        iconWidth: 42,
        iconHeight: 43,
        iconX: (42 / 2) * -1,
        iconY: -19,
        x: { horizontal: 754, vertical: 323 },
        y: { horizontal: 143, vertical: 754 },
        delay: getTotalDelayLayerTwo(0),
        centerMultiplier: defaultCenterMultiplier,
      }, // 4 | 1
      {
        label: 'TypeScript',
        icon: TypescriptIcon,
        layer: 2,
        angle: 14,
        connectedIndex: 0,
        iconWidth: 36,
        iconHeight: 36,
        iconX: (36 / 2) * -1,
        iconY: (36 / 2) * -1,
        x: { horizontal: 748, vertical: 225 },
        y: { horizontal: 241, vertical: 748 },
        delay: getTotalDelayLayerTwo(0),
        centerMultiplier: defaultCenterMultiplier,
      }, // 5 | 2
      {
        label: 'CI/CD',
        icon: CiCdIcon,
        layer: 2,
        angle: 51,
        connectedIndex: 1,
        iconWidth: 46,
        iconHeight: 36,
        iconX: (46 / 2) * -1,
        iconY: (36 / 2) * -1,
        x: { horizontal: 661, vertical: 88 },
        y: { horizontal: 378, vertical: 661 },
        delay: getTotalDelayLayerTwo(1),
        centerMultiplier: 1.8,
      }, // 6 | 3
      {
        label: 'GitHub',
        icon: GithubIcon,
        layer: 2,
        angle: 71,
        connectedIndex: 1,
        iconWidth: 42,
        iconHeight: 42,
        iconX: (42 / 2) * -1,
        iconY: (42 / 2) * -1,
        x: { horizontal: 583, vertical: 45 },
        y: { horizontal: 421, vertical: 583 },
        delay: getTotalDelayLayerTwo(1),
        centerMultiplier: 1.8,
      }, // 7 | 4
      {
        label: 'AWS',
        icon: AwsIcon,
        layer: 2,
        angle: 95,
        connectedIndex: 1,
        iconWidth: 48,
        iconHeight: 28,
        iconX: (48 / 2) * -1,
        iconY: -12,
        x: { horizontal: 478, vertical: 32 },
        y: { horizontal: 434, vertical: 478 },
        delay: getTotalDelayLayerTwo(1),
        centerMultiplier: 2,
      }, // 8 | 5
      {
        label: 'Auth0',
        icon: Auth0Icon,
        layer: 2,
        angle: 117,
        connectedIndex: 1,
        iconWidth: 38,
        iconHeight: 42,
        iconX: (38 / 2) * -1,
        iconY: -18,
        x: { horizontal: 384, vertical: 59 },
        y: { horizontal: 407, vertical: 384 },
        delay: getTotalDelayLayerTwo(1),
        centerMultiplier: defaultCenterMultiplier,
      }, // 9 | 6
      {
        label: 'CSS3',
        icon: CssIcon,
        layer: 2,
        angle: 148.5,
        connectedIndex: 2,
        iconWidth: 33,
        iconHeight: 38,
        iconX: (33 / 2) * -1,
        iconY: -17,
        x: { horizontal: 282, vertical: 153 },
        y: { horizontal: 313, vertical: 282 },
        delay: getTotalDelayLayerTwo(2),
        centerMultiplier: 2,
      }, // 10 | 7
      {
        label: 'TypeScript',
        icon: TypescriptIcon,
        layer: 2,
        angle: 171.5,
        connectedIndex: 2,
        iconWidth: 36,
        iconHeight: 36,
        iconX: (36 / 2) * -1,
        iconY: (36 / 2) * -1,
        x: { horizontal: 247, vertical: 249 },
        y: { horizontal: 217, vertical: 247 },
        delay: getTotalDelayLayerTwo(2),
        centerMultiplier: defaultCenterMultiplier,
      }, // 11 | 8
      {
        label: 'HTML5',
        icon: HtmlIcon,
        layer: 2,
        angle: 195.5,
        connectedIndex: 2,
        iconWidth: 33,
        iconHeight: 38,
        iconX: (33 / 2) * -1,
        iconY: -17,
        x: { horizontal: 253, vertical: 355 },
        y: { horizontal: 111, vertical: 253 },
        delay: getTotalDelayLayerTwo(2),
        centerMultiplier: 2,
      }, // 12 | 9
    ];
  }, []);

  const skillsLayerThree: SkillType[] = useMemo(() => {
    // must use the index of the subset array, not the connected index
    const getTotalDelayLayerThree = (connectedIndex: number): number => {
      const calculatedDelay =
        skillsLayerTwo[connectedIndex].delay +
        delayMultiplier +
        getRandomDelay();
      return Math.round(calculatedDelay * 100) / 100;
    };

    return [
      {
        label: 'Node.js',
        icon: NodeIcon,
        layer: 3,
        angle: 12,
        connectedIndex: 5,
        iconWidth: 46,
        iconHeight: 52,
        iconX: (46 / 2) * -1,
        iconY: -25,
        x: { horizontal: 854, vertical: 212 },
        y: { horizontal: 254, vertical: 854 },
        delay: getTotalDelayLayerThree(2),
        centerMultiplier: defaultCenterMultiplier,
      }, // 13 | 0
      {
        label: 'GraphQL',
        icon: GraphqlIcon,
        layer: 3,
        angle: 30,
        connectedIndex: 5,
        iconWidth: 48,
        iconHeight: 54,
        iconX: (48 / 2) * -1,
        iconY: (54 / 2) * -1,
        x: { horizontal: 814, vertical: 106 },
        y: { horizontal: 360, vertical: 814 },
        delay: getTotalDelayLayerThree(2),
        centerMultiplier: defaultCenterMultiplier,
      }, // 14 | 1
      {
        label: 'jQuery',
        icon: JQueryIcon,
        layer: 3,
        angle: 155.5,
        connectedIndex: 11,
        iconWidth: 44,
        iconHeight: 42,
        iconX: (44 / 2) * -1,
        iconY: (42 / 2) * -1,
        x: { horizontal: 171, vertical: 137 },
        y: { horizontal: 329, vertical: 171 },
        delay: getTotalDelayLayerThree(8),
        centerMultiplier: defaultCenterMultiplier,
      }, // 15 | 2
      {
        label: 'React',
        icon: ReactIcon,
        layer: 3,
        angle: 179.5,
        connectedIndex: 11,
        iconWidth: 50,
        iconHeight: 44,
        iconX: (50 / 2) * -1,
        iconY: (44 / 2) * -1,
        x: { horizontal: 138, vertical: 284 },
        y: { horizontal: 182, vertical: 138 },
        delay: getTotalDelayLayerThree(8),
        centerMultiplier: defaultCenterMultiplier,
      }, // 16 | 3
    ];
  }, []);

  const skillsLayerFour: SkillType[] = useMemo(() => {
    // must use the index of the subset array, not the connected index
    const getTotalDelayLayerFour = (connectedIndex: number): number => {
      const calculatedDelay =
        skillsLayerThree[connectedIndex].delay +
        delayMultiplier +
        getRandomDelay();
      return Math.round(calculatedDelay * 100) / 100;
    };

    return [
      {
        label: 'Express',
        icon: ExpressIcon,
        layer: 4,
        angle: 6.5,
        connectedIndex: 13,
        iconWidth: 44,
        iconHeight: 26,
        iconX: (44 / 2) * -1,
        iconY: (26 / 2) * -1,
        x: { horizontal: 965, vertical: 234 },
        y: { horizontal: 232, vertical: 965 },
        delay: getTotalDelayLayerFour(0),
        centerMultiplier: 2,
      }, // 17
      {
        label: 'Sequelize',
        icon: SequelizeIcon,
        layer: 4,
        angle: 17.5,
        connectedIndex: 13,
        iconWidth: 41,
        iconHeight: 47,
        iconX: (41 / 2) * -1,
        iconY: (47 / 2) * -1,
        x: { horizontal: 946, vertical: 146 },
        y: { horizontal: 320, vertical: 946 },
        delay: getTotalDelayLayerFour(0),
        centerMultiplier: defaultCenterMultiplier,
      }, // 18
      {
        label: 'Expo',
        icon: ExpoIcon,
        layer: 4,
        angle: 149,
        connectedIndex: 16,
        iconWidth: 45,
        iconHeight: 40,
        iconX: (45 / 2) * -1,
        iconY: -24,
        x: { horizontal: 99, vertical: 46 },
        y: { horizontal: 420, vertical: 99 },
        delay: getTotalDelayLayerFour(3),
        centerMultiplier: defaultCenterMultiplier,
      }, // 19
      {
        label: 'Framer Motion',
        icon: MotionIcon,
        layer: 4,
        angle: 163,
        connectedIndex: 16,
        iconWidth: 44,
        iconHeight: 44,
        iconX: (44 / 2) * -1,
        iconY: (44 / 2) * -1,
        x: { horizontal: 52, vertical: 150 },
        y: { horizontal: 316, vertical: 52 },
        delay: getTotalDelayLayerFour(3),
        centerMultiplier: defaultCenterMultiplier,
      }, // 20
      {
        label: 'Redux',
        icon: ReduxIcon,
        layer: 4,
        angle: 175.5,
        connectedIndex: 16,
        iconWidth: 47,
        iconHeight: 45,
        iconX: (47 / 2) * -1,
        iconY: -25,
        x: { horizontal: 33, vertical: 250 },
        y: { horizontal: 216, vertical: 33 },
        delay: getTotalDelayLayerFour(3),
        centerMultiplier: defaultCenterMultiplier,
      }, // 21
      {
        label: 'Jest',
        icon: JestIcon,
        layer: 4,
        angle: 188,
        connectedIndex: 16,
        iconWidth: 34,
        iconHeight: 37,
        iconX: (34 / 2) * -1,
        iconY: (37 / 2) * -1,
        x: { horizontal: 37, vertical: 352 },
        y: { horizontal: 114, vertical: 37 },
        delay: getTotalDelayLayerFour(3),
        centerMultiplier: 2,
      }, // 22
    ];
  }, []);

  return useMemo(
    () => [
      ...skillsLayerOne,
      ...skillsLayerTwo,
      ...skillsLayerThree,
      ...skillsLayerFour,
    ],
    [],
  );
};
