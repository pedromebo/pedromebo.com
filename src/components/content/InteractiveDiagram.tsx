import * as React from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { FiExternalLink } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';

import UnstyledLink from '@/components/links/UnstyledLink';

interface InteractiveDiagramProps {
  src: string;
  title?: string;
  subtitle?: string;
  className?: string;
  height?: number | string;
  aspectRatio?: string;
}

function InteractiveDiagramComponent({
  src,
  title = 'Diagrama de Arquitectura Interactivo',
  subtitle = 'Generado con Archify • Paleta y estilo Night City integrados',
  className,
  height,
  aspectRatio = '1370 / 585',
}: InteractiveDiagramProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (resolvedTheme === 'light' ? 'light' : 'dark') : 'dark';
  const iframeSrc = `${src}${src.includes('?') ? '&' : '?'}theme=${currentTheme}&embed=1`;

  const containerStyle: React.CSSProperties = height
    ? { height: typeof height === 'number' ? `${height}px` : height }
    : { aspectRatio, minHeight: '280px', maxHeight: '560px' };

  return (
    <figure
      className={clsx(
        'not-prose my-8 overflow-hidden rounded-2xl border border-[#cbcfe0] bg-[#f8f9fc] shadow-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,212,0.12)] dark:border-[#262f6e] dark:bg-[#0a0d24]',
        className
      )}
    >
      {/* Header bar */}
      <div className='flex flex-wrap items-center justify-between gap-3 border-b border-[#cbcfe0] bg-white/80 px-4 py-3 backdrop-blur-sm dark:border-[#262f6e] dark:bg-[#111638]/90'>
        <div className='flex items-center gap-2.5'>
          <span className='inline-flex items-center gap-1.5 rounded-full border border-[#00f5d4]/40 bg-[#00f5d4]/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#00b89c] dark:text-[#00f5d4]'>
            <HiOutlineSparkles className='h-3.5 w-3.5 animate-pulse text-[#00f5d4]' />
            Archify
          </span>
          <div>
            <h4 className='text-xs font-bold tracking-tight text-[#111638] dark:text-white sm:text-sm'>
              {title}
            </h4>
            {subtitle && (
              <p className='text-[11px] text-[#586094] dark:text-[#b6bddb]'>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <UnstyledLink
            href={src}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 rounded-lg border border-[#cbcfe0] bg-white px-3 py-1 font-mono text-xs font-semibold text-[#111638] transition-all duration-200 hover:border-[#00f5d4] hover:text-[#00b89c] hover:shadow-[0_0_12px_rgba(0,245,212,0.25)] dark:border-[#262f6e] dark:bg-[#0a0d24] dark:text-[#b6bddb] dark:hover:border-[#00f5d4] dark:hover:text-[#00f5d4]'
          >
            <span>Ver a pantalla completa</span>
            <FiExternalLink className='h-3 w-3' />
          </UnstyledLink>
        </div>
      </div>

      {/* Embedded interactive canvas */}
      <div
        className='relative w-full transition-colors duration-200 bg-[#f8f9fc] dark:bg-[#0a0d24]'
        style={containerStyle}
      >
        <iframe
          key={currentTheme}
          src={iframeSrc}
          title={title}
          className='h-full w-full border-0'
          loading='eager'
          sandbox='allow-scripts allow-same-origin allow-popups'
          onLoad={(e) => {
            try {
              e.currentTarget.blur();
            } catch (_) {}
          }}
        />
      </div>

      {/* Caption footer */}
      <figcaption className='flex flex-wrap items-center justify-between gap-2 border-t border-[#cbcfe0] bg-[#eff0f7]/70 px-4 py-2 font-mono text-[11px] text-[#586094] dark:border-[#262f6e] dark:bg-[#111638]/60 dark:text-[#b6bddb]'>
        <span>💡 Diagrama interactivo: haz clic en nodos, haz zoom y explora flujos en tiempo real</span>
        <span className='font-semibold text-[#00b89c] dark:text-[#00f5d4]'>
          Sincronizado con el tema de la web
        </span>
      </figcaption>
    </figure>
  );
}

const InteractiveDiagram = React.memo(InteractiveDiagramComponent);
export default InteractiveDiagram;
