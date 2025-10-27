import throttle from 'lodash/throttle';
import * as React from 'react';

// originally based on
// https://github.com/NotionX/react-notion-x/blob/master/packages/react-notion-x/src/block.tsx#L128-L161

export default function useScrollSpy() {
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const throttleMs = 100;

  const actionSectionScrollSpy = throttle(() => {
    const sections = document.getElementsByClassName('hash-anchor');
    
    // Use a fixed offset from the top of the viewport
    const OFFSET = 150;
    let currentSectionId = activeSection;

    for (let i = 0; i < sections.length; ++i) {
      const section = sections[i];

      if (!currentSectionId) {
        currentSectionId = section.getAttribute('href')?.split('#')[1] ?? null;
      }

      const bbox = section.getBoundingClientRect();

      // GetBoundingClientRect returns values relative to viewport
      // If section is above the offset line, it's the current section
      if (bbox.top <= OFFSET) {
        currentSectionId = section.getAttribute('href')?.split('#')[1] ?? null;
        continue;
      }

      // If we've reached a section below the offset line, stop
      break;
    }

    setActiveSection(currentSectionId);
  }, throttleMs);

  React.useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy);

    actionSectionScrollSpy();

    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeSection;
}
