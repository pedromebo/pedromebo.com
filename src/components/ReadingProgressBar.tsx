import * as React from 'react';

export default function ReadingProgressBar() {
  const [progress, setProgress] = React.useState<number>(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden='true'
      className='fixed top-0 left-0 right-0 z-[999] h-[3.5px] w-full bg-black/5 dark:bg-white/5 pointer-events-none'
    >
      <div
        className='h-full bg-gradient-to-r from-[#00f5d4] via-[#596dff] to-[#ff2e93] transition-[width] duration-100 ease-out shadow-[0_0_12px_#00f5d4,0_0_4px_#ff2e93]'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}


