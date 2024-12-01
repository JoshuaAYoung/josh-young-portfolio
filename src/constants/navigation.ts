export const NAV_LINKS_TABLET = [
  'Home',
  'About',
  'Experience',
  'Projects',
  'Skills',
  'Contact',
];

export const NAV_LINKS_DESKTOP = NAV_LINKS_TABLET.filter(
  (link) => link !== 'Experience',
);
