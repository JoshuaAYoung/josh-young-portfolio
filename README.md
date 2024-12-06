### Captains log

## November 3rd, 2024

- needed to track scrolling for reveal animations (one time, partially in view sets true) as well as for the menu (only one active at a time with no bouncing between). Accomplished this with one ref invoking useInView hook from framer motion twice. Third party hook uses react-intersection-observer under the hood and is memo'd up, so it ended up being a fairly performative and responsive solution.
- switched over to Zustand from context as the inView and scrolling progress states change so frequently and I'd like to selectively subscribe to changes for those to avoid rerenders.
- controlling the "in view" state locally for the reveal animation means I can easily adjust classNames in each section, with an easy sort of cascade effect (react solution). Shouldn't need to prop drill these boolean values much either since my it's a true SPA and my file structure is pretty shallow.
-
