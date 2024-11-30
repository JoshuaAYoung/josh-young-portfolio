export const NAV_LINKS_TABLET = [
  'home',
  'about',
  'experience',
  'projects',
  'skills',
  'contact',
];

export const NAV_LINKS_DESKTOP = NAV_LINKS_TABLET.filter(
  (link) => link !== 'experience',
);
