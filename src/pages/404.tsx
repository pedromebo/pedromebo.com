import * as React from 'react';

import Accent from '@/components/Accent';
import ButtonLink from '@/components/links/ButtonLink';
import Mascot from '@/components/Mascot';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo templateTitle='404 // No Encontrado' />

      <main>
        <section className='min-h-screen bg-[#0a0d24] py-16 text-white'>
          <div className='layout flex min-h-[80vh] flex-col items-center justify-center text-center'>
            {/* Mascot Searching with Magnifier */}
            <div className='relative mb-4'>
              <Mascot
                pose='search'
                mode='sticker'
                size='md'
                className='mx-auto'
              />
              <span className='absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[6px] border border-[#ff2e93]/50 bg-[#ff2e93]/20 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#ff2e93] shadow-[0_0_15px_rgba(255,46,147,0.3)]'>
                ERROR 404 // NOT FOUND
              </span>
            </div>

            <h1 className='mt-6 text-3xl font-extrabold sm:text-5xl'>
              <Accent>¡Vaya! Página no encontrada</Accent>
            </h1>

            <p className='mt-3 max-w-md text-sm text-[#b6bddb] sm:text-base'>
              Nuestra tortuga IA ha buscado con su lupa por todo el servidor y no ha podido encontrar la ruta que buscas.
            </p>

            <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
              <ButtonLink href='/'>
                Volver al inicio
              </ButtonLink>
              <ButtonLink href='/blog'>
                Explorar el blog
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
