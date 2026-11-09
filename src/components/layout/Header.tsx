import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';

import { trackEvent } from '@/lib/analytics';

import Accent from '@/components/Accent';
import ThemeButton from '@/components/buttons/ThemeButton';
import UnstyledLink from '@/components/links/UnstyledLink';

type HeaderProps = {
  large?: boolean;
};

export default function Header({ large = false }: HeaderProps) {
  //#region  //*=========== Route & Language Functionality ===========
  const router = useRouter();
  const cleanAsPath = (router.asPath || '/').split('?')[0].split('#')[0];
  const isEnglish =
    cleanAsPath === '/en' ||
    cleanAsPath.startsWith('/en/') ||
    cleanAsPath.includes('/en-') ||
    router.query.lang === 'en';

  const arrOfRoute = router.route.split('/');
  const baseRoute =
    arrOfRoute[1] === 'en' ? '/' + (arrOfRoute[2] || '') : '/' + arrOfRoute[1];

  const navLinks = isEnglish ? linksEn : linksEs;
  const homeHref = isEnglish ? '/en' : '/';

  const resolveLangToggleHref = () => {
    if (cleanAsPath === '/' || cleanAsPath === '') return '/en';
    if (cleanAsPath === '/en') return '/';
    if (cleanAsPath.startsWith('/en/')) {
      return cleanAsPath.replace(/^\/en/, '') || '/';
    }
    if (
      cleanAsPath === '/about' ||
      cleanAsPath === '/blog' ||
      cleanAsPath === '/projects' ||
      cleanAsPath === '/shorts'
    ) {
      return `/en${cleanAsPath}`;
    }
    // For single blog/project/short detail pages, fallback to section index in target lang
    // (the article header itself has the exact translated_slug button)
    if (cleanAsPath.startsWith('/blog/')) return isEnglish ? '/blog' : '/en/blog';
    if (cleanAsPath.startsWith('/projects/'))
      return isEnglish ? '/projects' : '/en/projects';
    if (cleanAsPath.startsWith('/shorts/'))
      return isEnglish ? '/shorts' : '/en/shorts';
    return isEnglish ? '/' : '/en';
  };

  const langToggleHref = resolveLangToggleHref();
  //#endregion  //*======== Route & Language Functionality ===========

  //#region  //*=========== Mobile Menu State ===========
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.asPath]);
  //#endregion  //*======== Mobile Menu State ===========

  //#region  //*=========== Scroll Shadow ===========
  const [onTop, setOnTop] = React.useState<boolean>(true);
  React.useEffect(() => {
    const handleScroll = () => {
      setOnTop(window.pageYOffset === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //#endregion  //*======== Scroll Shadow ===========

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-all duration-200',
        'bg-white/95 dark:bg-[#0a0d24]/95 backdrop-blur-md',
        'border-b border-[#cbcfe0]/60 dark:border-[#262f6e]/60',
        !onTop ? 'shadow-md' : ''
      )}
    >
      {/* Skip Navigation */}
      <a
        href='#skip-nav'
        className={clsx(
          'rounded-sm p-2 transition',
          'font-medium text-[#111638] dark:text-white',
          'bg-white dark:bg-dark',
          'group dark:hover:text-primary-300',
          'focus:outline-none focus:ring focus:ring-primary-300',
          'absolute left-4 top-4',
          '-translate-y-16 focus:translate-y-0'
        )}
      >
        <Accent>
          {isEnglish ? 'Skip to main content' : 'Ir al contenido principal'}
        </Accent>
      </a>

      <div>
        <nav
          className={clsx(
            'layout flex items-center justify-between py-2.5 sm:py-3',
            large && 'lg:max-w-[68rem]'
          )}
        >
          <div className='flex items-center gap-2 sm:gap-3 min-w-0 flex-1 mr-2'>
            <UnstyledLink
              href={homeHref}
              className='group flex shrink-0 items-center gap-2 rounded-full transition-transform hover:scale-105 focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
              aria-label={isEnglish ? 'Home' : 'Inicio'}
            >
              <Image
                src='/favicon/apple-icon.png'
                alt='pedromebo'
                width={28}
                height={28}
                className='h-7 w-7 transition-transform group-hover:scale-110'
                priority
              />
              <span className='font-mono text-sm font-bold tracking-tight text-[#111638] group-hover:text-primary-300 dark:text-white inline-block'>
                pedromebo
              </span>
            </UnstyledLink>

            {/* Desktop Navigation */}
            <ul className='hidden md:flex items-center gap-1 sm:gap-2 md:gap-3 text-xs md:text-sm pl-2 sm:pl-3 border-l border-slate-200 dark:border-slate-800 py-0.5'>
              {navLinks.map(({ href, base, label }) => (
                <li key={`${href}${label}`} className='shrink-0'>
                  <UnstyledLink
                    href={href}
                    className={clsx(
                      'rounded-md px-1.5 py-1 sm:px-2 sm:py-1.5 transition-colors whitespace-nowrap',
                      'font-medium text-[#586094] dark:text-[#b6bddb] hover:text-[#111638] dark:hover:text-white',
                      'group focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                    )}
                  >
                    <span
                      className={clsx(
                        'transition-colors',
                        base === baseRoute &&
                          'font-bold text-[#596dff] dark:text-[#00f5d4]'
                      )}
                    >
                      {label}
                    </span>
                  </UnstyledLink>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex shrink-0 items-center gap-2'>
            <UnstyledLink
              href={langToggleHref}
              onClick={() =>
                trackEvent(
                  `Header Language Switch: ${isEnglish ? 'ES' : 'EN'}`,
                  { type: 'navigate' }
                )
              }
              aria-label={
                isEnglish ? 'Cambiar idioma a Español' : 'Switch language to English'
              }
              className='inline-flex items-center gap-1 rounded-lg border border-[#cbcfe0] bg-[#eff0f7]/80 px-2.5 py-1.5 font-mono text-xs font-bold leading-none text-[#111638] transition-colors hover:border-[#596dff] hover:text-[#596dff] dark:border-[#262f6e] dark:bg-[#111638] dark:text-[#00f5d4] dark:hover:border-[#00f5d4]'
            >
              <span>{isEnglish ? 'ES 🇪🇸' : 'EN 🇬🇧'}</span>
            </UnstyledLink>
            <ThemeButton />

            {/* Mobile Hamburger Button */}
            <button
              type='button'
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className='md:hidden inline-flex items-center justify-center p-2 rounded-lg text-[#586094] hover:text-[#111638] dark:text-[#b6bddb] dark:hover:text-white border border-[#cbcfe0] dark:border-[#262f6e] bg-[#eff0f7]/80 dark:bg-[#111638] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
              aria-label={mobileMenuOpen ? (isEnglish ? 'Close menu' : 'Cerrar menú') : (isEnglish ? 'Open menu' : 'Abrir menú')}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <HiOutlineX className='h-5 w-5' />
              ) : (
                <HiOutlineMenuAlt3 className='h-5 w-5' />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className='md:hidden border-t border-[#cbcfe0]/60 dark:border-[#262f6e]/60 bg-white/98 dark:bg-[#0a0d24]/98 backdrop-blur-xl shadow-xl transition-all duration-200'>
            <div className='layout py-3 space-y-1'>
              {navLinks.map(({ href, base, label }) => {
                const isActive = base === baseRoute;
                return (
                  <UnstyledLink
                    key={`${href}${label}`}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={clsx(
                      'flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-sm transition-all',
                      isActive
                        ? 'bg-[#596dff]/10 text-[#596dff] dark:bg-[#00f5d4]/10 dark:text-[#00f5d4] font-bold border border-[#596dff]/30 dark:border-[#00f5d4]/30'
                        : 'text-[#586094] dark:text-[#b6bddb] hover:bg-[#eff0f7] dark:hover:bg-[#111638] hover:text-[#111638] dark:hover:text-white font-medium'
                    )}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span className='h-2 w-2 rounded-full bg-[#596dff] dark:bg-[#00f5d4] shadow-[0_0_8px_currentColor]' />
                    )}
                  </UnstyledLink>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

const linksEs = [
  { href: '/', base: '/', label: 'Inicio' },
  { href: '/blog', base: '/blog', label: 'Blog' },
  { href: '/projects', base: '/projects', label: 'Proyectos' },
  { href: '/shorts', base: '/shorts', label: 'Shorts' },
  { href: '/about', base: '/about', label: 'Sobre mí' },
];

const linksEn = [
  { href: '/en', base: '/', label: 'Home' },
  { href: '/en/blog', base: '/blog', label: 'Blog' },
  { href: '/en/projects', base: '/projects', label: 'Projects' },
  { href: '/en/shorts', base: '/shorts', label: 'Shorts' },
  { href: '/en/about', base: '/about', label: 'About' },
];
