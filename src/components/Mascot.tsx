import clsx from 'clsx';
import * as React from 'react';
import {
  SiApachespark,
  SiDocker,
  SiOpenai,
  SiPython,
  SiTensorflow,
} from 'react-icons/si';
import { TbBrandCpp } from 'react-icons/tb';

export type MascotVariant = 'image' | 'svg';
export type MascotDisplayMode = 'card' | 'sticker' | 'avatar' | 'compact';
export type MascotPose =
  | 'hero'
  | 'coding'
  | 'pointing'
  | 'thinking'
  | 'reading'
  | 'data'
  | 'search'
  | 'contact'
  | 'rocket'
  | 'peeking'
  | 'coffee'
  | 'avatar'
  | 'learning'
  | 'projects';
export type MascotLogoId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface MascotLogoOption {
  id: MascotLogoId;
  name: string;
  tag: string;
  domain: string;
  description: string;
  imageSrc: string;
  accent: string;
}

const POSE_TO_MASCOT_ID: Record<MascotPose, MascotLogoId> = {
  hero: 1,
  coding: 2,
  projects: 2,
  pointing: 3,
  thinking: 4,
  learning: 4,
  reading: 5,
  data: 6,
  search: 7,
  contact: 8,
  rocket: 9,
  peeking: 10,
  coffee: 11,
  avatar: 12,
};

export const MASCOT_LOGOS: MascotLogoOption[] = [
  {
    id: 1,
    name: '01 • Cuerpo Entero Saludando (Hero / Bienvenida)',
    tag: 'POSE 01 // STANDING WAVE',
    domain: 'Hero & About',
    description:
      'Cuerpo entero de pie saludando amistosamente, con la sudadera oscura de chispa IA (✦), pantalones joggers y zapatillas synthwave.',
    imageSrc: '/images/turtles/turtle-01.png',
    accent: '#00f5d4',
  },
  {
    id: 2,
    name: '02 • Programando con Portátil (Proyectos / Stack)',
    tag: 'POSE 02 // CODING LAPTOP',
    domain: 'Proyectos & Código',
    description:
      'Sentada con las piernas cruzadas programando en su portátil oscuro, iluminada por el brillo cian de la pantalla.',
    imageSrc: '/images/turtles/turtle-02.png',
    accent: '#00f5d4',
  },
  {
    id: 3,
    name: '03 • Cuerpo Entero Señalando (Destacados / CTAs)',
    tag: 'POSE 03 // POINTING',
    domain: 'Señalando Contenido',
    description:
      'Cuerpo entero señalando hacia el contenido o tarjetas destacadas con una mano y la otra apoyada en la cadera.',
    imageSrc: '/images/turtles/turtle-03.png',
    accent: '#ff2e93',
  },
  {
    id: 4,
    name: '04 • Cuerpo Entero Pensando / Idea IA (Aprendizaje)',
    tag: 'POSE 04 // AI IDEA SPARKS',
    domain: 'Aprendizaje & Shorts',
    description:
      'Cuerpo entero en pose reflexiva con una burbuja de idea luminosa e inspiración de IA flotando junto a su cabeza.',
    imageSrc: '/images/turtles/turtle-04.png',
    accent: '#00f5d4',
  },
  {
    id: 5,
    name: '05 • Leyendo Libro / Tablet IA (Blog / Artículos)',
    tag: 'POSE 05 // READING BLOG',
    domain: 'Blog & Lectura',
    description:
      'Sosteniendo un libro/tablet abierto que proyecta un suave resplandor neón cian y chispas de conocimiento hacia su rostro.',
    imageSrc: '/images/turtles/turtle-05.png',
    accent: '#00f5d4',
  },
  {
    id: 6,
    name: '06 • Analizando Datos / Gráfico Flotante (Data & BI)',
    tag: 'POSE 06 // DATA ANALYTICS',
    domain: 'Data Science & BI',
    description:
      'Presentando un panel holográfico flotante con barras de datos en cian y una curva de tendencia ascendente en magenta.',
    imageSrc: '/images/turtles/turtle-06.png',
    accent: '#ff2e93',
  },
  {
    id: 7,
    name: '07 • Buscando con Lupa / 404 (Búsqueda / Empty State)',
    tag: 'POSE 07 // SEARCH & 404',
    domain: 'Página 404 & Filtros',
    description:
      'Explorando con una lupa luminosa de aro neón cian y destello magenta para páginas 404 o búsquedas sin resultados.',
    imageSrc: '/images/turtles/turtle-07.png',
    accent: '#00f5d4',
  },
  {
    id: 8,
    name: '08 • Contacto / Avión de Papel Neón (Footer / Redes)',
    tag: 'POSE 08 // PAPER PLANE',
    domain: 'Contacto & Newsletter',
    description:
      'Lanzando un avión de papel luminoso en cian con estela magenta punteada, ideal para contacto, footer o newsletter.',
    imageSrc: '/images/turtles/turtle-08.png',
    accent: '#ff2e93',
  },
  {
    id: 9,
    name: '09 • Lanzamiento / Cohete en Producción (Releases)',
    tag: 'POSE 09 // ROCKET LAUNCH',
    domain: 'Deploys & Logros',
    description:
      'Acompañada de un cohete synthwave despegando con propulsión magenta y cian para destacar proyectos en producción.',
    imageSrc: '/images/turtles/turtle-09.png',
    accent: '#ff2e93',
  },
  {
    id: 10,
    name: '10 • Asomándose desde el Borde (Peeking / UI Cards)',
    tag: 'POSE 10 // PEEKING EDGE',
    domain: 'Tarjetas & Bloques de Código',
    description:
      'Asomándose con curiosidad por encima de una barra/borde de interfaz con las manos apoyadas en el marco.',
    imageSrc: '/images/turtles/turtle-10.png',
    accent: '#00f5d4',
  },
  {
    id: 11,
    name: '11 • Con Taza de Café Caliente (Devlogs / Modo Noche)',
    tag: 'POSE 11 // COFFEE DEVLOG',
    domain: 'Setup, Notas & Café',
    description:
      'Disfrutando de una taza oscura con el símbolo IA (✦) y volutas de vapor neón cian y magenta.',
    imageSrc: '/images/turtles/turtle-11.png',
    accent: '#00f5d4',
  },
  {
    id: 12,
    name: '12 • Busto Avatar IA (Retrato Compacto / Insignia)',
    tag: 'POSE 12 // BUST AVATAR',
    domain: 'Avatar & Insignia',
    description:
      'Retrato de busto 3/4 limpio y expresivo, ideal para avatares circulares, cabeceras compactas o tarjetas pequeñas.',
    imageSrc: '/images/turtles/turtle-12.png',
    accent: '#ff2e93',
  },
];

interface MascotProps {
  mascotId?: MascotLogoId;
  variant?: MascotVariant;
  pose?: MascotPose;
  mode?: MascotDisplayMode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto';
  speech?: string;
  className?: string;
  showBadges?: boolean;
  compact?: boolean;
  onOpenGallery?: () => void;
}

export default function Mascot({
  mascotId,
  variant = 'image',
  pose,
  mode,
  size = 'auto',
  speech,
  className,
  showBadges = false,
  compact = false,
  onOpenGallery,
}: MascotProps) {
  const [imgError, setImgError] = React.useState(false);

  const resolvedId: MascotLogoId =
    mascotId ?? (pose ? POSE_TO_MASCOT_ID[pose] : 1);

  const selectedMascot =
    MASCOT_LOGOS.find((m) => m.id === resolvedId) ?? MASCOT_LOGOS[0];

  React.useEffect(() => {
    setImgError(false);
  }, [resolvedId]);

  const useSvg = variant === 'svg' || imgError;
  const resolvedMode: MascotDisplayMode =
    mode ?? (compact ? 'compact' : 'card');

  // Avatar mode (e.g. Header, navbar, user profile badge)
  if (resolvedMode === 'avatar') {
    const avatarSizes = {
      xs: 'h-7 w-7',
      sm: 'h-9 w-9',
      md: 'h-12 w-12',
      lg: 'h-16 w-16',
      xl: 'h-24 w-24',
      auto: 'h-10 w-10',
    };
    return (
      <div
        onClick={onOpenGallery}
        title={selectedMascot.name}
        className={clsx(
          'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#00f5d4] bg-[#0a0d24] shadow-[0_0_12px_rgba(0,245,212,0.4)] transition-transform hover:scale-110 hover:border-[#ff2e93]',
          avatarSizes[size],
          onOpenGallery && 'cursor-pointer',
          className
        )}
      >
        {!useSvg ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={selectedMascot.imageSrc}
            alt={selectedMascot.name}
            onError={() => setImgError(true)}
            className='h-full w-full object-cover scale-110'
          />
        ) : (
          <MascotVectorLogo
            mascotId={resolvedId}
            className='h-full w-full p-1'
          />
        )}
      </div>
    );
  }

  // Sticker mode (transparent floating illustration for section companions, 404, footer, etc.)
  if (resolvedMode === 'sticker') {
    const stickerSizes = {
      xs: 'max-w-[80px]',
      sm: 'max-w-[130px]',
      md: 'max-w-[220px]',
      lg: 'max-w-[320px]',
      xl: 'max-w-[420px]',
      auto: 'w-full',
    };
    return (
      <div
        onClick={onOpenGallery}
        className={clsx(
          'group relative inline-block select-none',
          onOpenGallery && 'cursor-pointer',
          className
        )}
      >
        <div
          aria-hidden='true'
          className='pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-tr from-[#00f5d4]/15 via-[#596dff]/10 to-[#ff2e93]/15 blur-xl transition-opacity group-hover:opacity-100'
        />
        {!useSvg ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={selectedMascot.imageSrc}
            alt={selectedMascot.name}
            onError={() => setImgError(true)}
            className={clsx(
              'relative z-10 mx-auto h-auto object-contain drop-shadow-[0_12px_24px_rgba(10,13,36,0.6)] filter transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:drop-shadow-[0_16px_32px_rgba(0,245,212,0.35)]',
              stickerSizes[size]
            )}
          />
        ) : (
          <div className={clsx('relative z-10 mx-auto aspect-square', stickerSizes[size])}>
            <MascotVectorLogo
              mascotId={resolvedId}
              className='h-full w-full'
            />
          </div>
        )}
      </div>
    );
  }

  if (resolvedMode === 'compact') {
    return (
      <div
        onClick={onOpenGallery}
        className={clsx(
          'inline-flex items-center gap-3 rounded-[14px] border-2 border-[#262f6e] bg-[#0a0d24] p-2 text-white shadow-[0_10px_25px_-10px_rgba(0,245,212,0.3)]',
          onOpenGallery && 'cursor-pointer hover:border-[#00f5d4]',
          className
        )}
      >
        <div className='relative h-14 w-14 shrink-0 overflow-hidden rounded-[10px] border border-[#262f6e] bg-[#0a0d24]'>
          {!useSvg ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={selectedMascot.imageSrc}
              alt={selectedMascot.name}
              onError={() => setImgError(true)}
              className='h-full w-full object-contain'
            />
          ) : (
            <MascotVectorLogo
              mascotId={resolvedId}
              className='h-full w-full p-1'
            />
          )}
        </div>
        {speech && (
          <p className='pr-2 text-xs font-medium text-[#b6bddb]'>{speech}</p>
        )}
      </div>
    );
  }

  return (
    <div className={clsx('relative mx-auto select-none', className)}>
      {/* Ambient Neon Glow */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-[#00f5d4]/20 via-[#596dff]/15 to-[#ff2e93]/20 blur-2xl'
      />

      {/* Clean Die-Cut Sticker Container (No text overlays) */}
      <div
        onClick={onOpenGallery}
        className={clsx(
          'group relative z-10 overflow-hidden rounded-[20px] sm:rounded-[24px] border-2 border-[#262f6e] bg-[#0a0d24] p-1.5 sm:p-2 shadow-[0_20px_50px_-15px_rgba(10,13,36,0.7),4px_4px_0px_#00f5d4] sm:shadow-[0_20px_50px_-15px_rgba(10,13,36,0.7),6px_6px_0px_#00f5d4] transition-transform duration-300 hover:-translate-y-1 dark:border-[#00f5d4]/60 dark:shadow-[0_20px_50px_-15px_rgba(0,245,212,0.25),4px_4px_0px_#ff2e93] dark:sm:shadow-[0_20px_50px_-15px_rgba(0,245,212,0.25),6px_6px_0px_#ff2e93]',
          onOpenGallery && 'cursor-pointer'
        )}
      >
        <div className='relative overflow-hidden rounded-[16px] sm:rounded-[18px] bg-[#0a0d24]'>
          {!useSvg ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={selectedMascot.imageSrc}
              alt={selectedMascot.name}
              onError={() => setImgError(true)}
              className='mx-auto h-auto w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] object-contain transition-transform duration-500 group-hover:scale-105'
            />
          ) : (
            <div className='mx-auto flex aspect-square w-full max-w-[400px] items-center justify-center p-6'>
              <MascotVectorLogo
                mascotId={resolvedId}
                className='h-full w-full'
              />
            </div>
          )}
        </div>
      </div>

      {/* Optional Floating Sticker Badges (off by default to keep mascot clean) */}
      {showBadges && (
        <>
          <div className='absolute -left-4 top-12 z-20 hidden -rotate-6 items-center gap-1.5 rounded-[8px] border-2 border-white bg-[#24208f] px-3 py-1.5 font-mono text-xs font-bold text-white shadow-lg sm:inline-flex'>
            <SiPython className='h-4 w-4 text-[#00f5d4]' />
            <span>Python & IA</span>
          </div>

          <div className='absolute -right-4 top-20 z-20 hidden rotate-6 items-center gap-1.5 rounded-[8px] border-2 border-[#111638] bg-[#ff2e93] px-3 py-1.5 font-mono text-xs font-extrabold text-[#111638] shadow-lg sm:inline-flex'>
            <SiApachespark className='h-4 w-4' />
            <span>Big Data & BI</span>
          </div>

          <div className='absolute -bottom-3 -left-3 z-20 hidden rotate-3 items-center gap-1.5 rounded-[8px] border-2 border-[#00f5d4] bg-[#0a0d24] px-3 py-1.5 font-mono text-xs font-bold text-white shadow-lg sm:inline-flex'>
            <TbBrandCpp className='h-4 w-4 text-[#00f5d4]' />
            <span>C++ / OpenGL</span>
          </div>

          <div className='absolute -bottom-3 right-4 z-20 hidden -rotate-3 items-center gap-1.5 rounded-[8px] border-2 border-[#111638] bg-[#00f5d4] px-3 py-1.5 font-mono text-xs font-extrabold text-[#111638] shadow-lg sm:inline-flex'>
            <SiTensorflow className='h-3.5 w-3.5' />
            <SiOpenai className='h-3.5 w-3.5' />
            <SiDocker className='h-3.5 w-3.5' />
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Custom Vector SVG Cyber-Turtle Logos (1-10)
 */
export function MascotVectorLogo({
  mascotId = 1,
  className,
}: {
  mascotId?: MascotLogoId;
  className?: string;
}) {
  return (
    <svg
      viewBox='0 0 360 360'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      {/* Shared Die-Cut Base Emblem */}
      <circle
        cx='180'
        cy='180'
        r='152'
        fill='#0a0d24'
        stroke='#ffffff'
        strokeWidth='8'
      />
      <circle
        cx='180'
        cy='180'
        r='142'
        fill='#111638'
        stroke='#262f6e'
        strokeWidth='3'
      />

      {/* Hexagonal Cyber-Turtle Shell Base */}
      <polygon
        points='180,96 258,140 258,236 180,280 102,236 102,140'
        fill='#24208f'
        stroke='#ffffff'
        strokeWidth='6'
        strokeLinejoin='round'
      />
      <polygon
        points='180,124 232,154 232,222 180,252 128,222 128,154'
        fill='#0a0d24'
        stroke={mascotId % 2 === 0 ? '#ff2e93' : '#00f5d4'}
        strokeWidth='4'
        strokeLinejoin='round'
      />

      {/* Turtle Flippers / Legs */}
      <ellipse
        cx='84'
        cy='148'
        rx='26'
        ry='14'
        transform='rotate(-25 84 148)'
        fill='#00f5d4'
        stroke='#ffffff'
        strokeWidth='5'
      />
      <ellipse
        cx='276'
        cy='148'
        rx='26'
        ry='14'
        transform='rotate(25 276 148)'
        fill='#00f5d4'
        stroke='#ffffff'
        strokeWidth='5'
      />
      <ellipse
        cx='94'
        cy='242'
        rx='22'
        ry='12'
        transform='rotate(25 94 242)'
        fill='#596dff'
        stroke='#ffffff'
        strokeWidth='5'
      />
      <ellipse
        cx='266'
        cy='242'
        rx='22'
        ry='12'
        transform='rotate(-25 266 242)'
        fill='#596dff'
        stroke='#ffffff'
        strokeWidth='5'
      />

      {/* Turtle Head & Cyber Visor */}
      <circle
        cx='180'
        cy='84'
        r='40'
        fill='#00f5d4'
        stroke='#ffffff'
        strokeWidth='6'
      />
      <rect
        x='142'
        y='66'
        width='76'
        height='28'
        rx='12'
        fill='#0a0d24'
        stroke='#ff2e93'
        strokeWidth='4'
      />
      <circle cx='164' cy='80' r='6' fill='#00f5d4' />
      <circle cx='196' cy='80' r='6' fill='#ff2e93' />

      {/* Center Shell Neural Core Symbol */}
      <circle
        cx='180'
        cy='188'
        r='32'
        fill='#111638'
        stroke='#00f5d4'
        strokeWidth='4'
      />
      <text
        x='180'
        y='196'
        textAnchor='middle'
        fill='#ffffff'
        fontFamily='monospace'
        fontWeight='bold'
        fontSize='22'
      >
        #{mascotId < 10 ? `0${mascotId}` : mascotId}
      </text>
    </svg>
  );
}
