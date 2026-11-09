import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FaJava } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import {
  FiAward,
  FiBriefcase,
  FiCalendar,
  FiCheck,
  FiCopy,
  FiMail,
  FiMapPin,
} from 'react-icons/fi';
import {
  SiAmazonapigateway,
  SiAmazonec2,
  SiAmazons3,
  SiApacheairflow,
  SiApachespark,
  SiAwslambda,
  SiDocker,
  SiGit,
  SiGnubash,
  SiLinkedin,
  SiMlflow,
  SiNumpy,
  SiOpenai,
  SiPandas,
  SiPytorch,
  SiPython,
  SiScikitlearn,
  SiTensorflow,
} from 'react-icons/si';
import { TbBrandCpp, TbFileTypeSql } from 'react-icons/tb';

import { trackEvent } from '@/lib/analytics';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Mascot from '@/components/Mascot';
import Seo from '@/components/Seo';

import translations from '@/constants/translations/about';

type AboutPageProps = {
  initialLang?: 'es' | 'en';
};

export default function AboutPage({ initialLang = 'es' }: AboutPageProps) {
  const router = useRouter();
  const isLoaded = useLoaded();
  const [isSpanish, setisSpanish] = React.useState<boolean>(
    initialLang !== 'en'
  );
  const [copied, setCopied] = React.useState<boolean>(false);
  const [copy] = useCopyToClipboard();

  React.useEffect(() => {
    if (router.asPath.startsWith('/en/about') || router.query.lang === 'en') {
      setisSpanish(false);
    } else if (router.asPath.startsWith('/about') && router.query.lang !== 'en') {
      setisSpanish(true);
    }
  }, [router.asPath, router.query.lang]);

  const handleCopyEmail = () => {
    copy('contacto@pedromebo.com').then(() => {
      setCopied(true);
      trackEvent('About Contact: Copy Email', { type: 'navigate' });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const t = isSpanish ? translations.es : translations.en;
  const targetLangHref = isSpanish ? '/en/about' : '/about';

  const TECH_GROUPS = [
    {
      title: isSpanish ? 'IA Generativa, Agentes & LLMs' : 'Generative AI, Agents & LLMs',
      accent: '#00f5d4',
      items: [
        { name: 'Python', icon: SiPython },
        { name: 'OpenAI / LLMs', icon: SiOpenai },
        { name: 'LangGraph & Agents', icon: SiOpenai },
        { name: 'PyTorch', icon: SiPytorch },
        { name: 'TensorFlow', icon: SiTensorflow },
        { name: 'Scikit-learn', icon: SiScikitlearn },
        { name: 'MLflow & Langfuse', icon: SiMlflow },
      ],
    },
    {
      title: isSpanish ? 'Ingeniería de Datos & Big Data' : 'Data Engineering & Big Data',
      accent: '#ff2e93',
      items: [
        { name: 'Apache Spark', icon: SiApachespark },
        { name: 'Apache Airflow', icon: SiApacheairflow },
        { name: 'SQL', icon: TbFileTypeSql },
        { name: 'Pandas', icon: SiPandas },
        { name: 'NumPy', icon: SiNumpy },
      ],
    },
    {
      title: isSpanish ? 'Cloud, Infraestructura & MLOps' : 'Cloud, Infrastructure & MLOps',
      accent: '#596dff',
      items: [
        { name: 'Docker', icon: SiDocker },
        { name: 'AWS Lambda', icon: SiAwslambda },
        { name: 'AWS S3', icon: SiAmazons3 },
        { name: 'AWS EC2', icon: SiAmazonec2 },
        { name: 'API Gateway', icon: SiAmazonapigateway },
        { name: 'Git & GitHub', icon: SiGit },
      ],
    },
    {
      title: isSpanish ? 'Lenguajes & Sistemas' : 'Languages & Systems',
      accent: '#00f5d4',
      items: [
        { name: 'Python', icon: SiPython },
        { name: 'C++ / OpenGL', icon: TbBrandCpp },
        { name: 'Java', icon: FaJava },
        { name: 'SQL', icon: TbFileTypeSql },
        { name: 'Bash', icon: SiGnubash },
      ],
    },
  ];

  return (
    <Layout>
      <Seo
        templateTitle={t.seoTitle}
        description={t.seoDescription}
        lang={isSpanish ? 'es' : 'en'}
        esUrl='https://www.pedromebo.com/about'
        enUrl='https://www.pedromebo.com/en/about'
      />

      <main className='pb-16'>
        {/* ===================================================================
            HERO BIO & INTRO
           =================================================================== */}
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout pt-16 md:pt-20'>
            {/* Top Bar with Badge & Language Switch */}
            <div className='flex flex-wrap items-center justify-between gap-4'>
              <div className='inline-flex items-center gap-2 rounded-full border border-[#262f6e] bg-[#0a0d24] px-3.5 py-1 font-mono text-xs font-bold text-[#00f5d4]'>
                <span>✦ {t.badge}</span>
              </div>

              <UnstyledLink
                href={targetLangHref}
                onClick={() =>
                  trackEvent('Language Switch: About', { type: 'navigate' })
                }
                className='group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#596dff] bg-[#596dff]/15 px-3.5 py-1.5 font-mono text-xs font-bold leading-none text-[#3444ca] shadow-sm transition-all hover:scale-105 hover:bg-[#596dff] hover:text-white dark:border-[#00f5d4] dark:bg-[#00f5d4]/10 dark:text-[#00f5d4] dark:hover:bg-[#00f5d4] dark:hover:text-[#0a0d24]'
              >
                <span>{t.readIn}</span>
                <span
                  aria-hidden='true'
                  className='shrink-0 transition-transform duration-200 group-hover:translate-x-0.5'
                >
                  &rarr;
                </span>
              </UnstyledLink>
            </div>

            <h1 className='mt-5 text-3xl font-extrabold sm:text-5xl md:text-6xl'>
              <Accent>Pedro Medinilla Bohórquez</Accent>
            </h1>

            {/* 2-Column Editorial Grid: Story (Left) + Visual Card (Right) */}
            <div className='mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12'>
              {/* Left Column: Bio Narrative */}
              <div className='lg:col-span-7'>
                <div className='prose max-w-none text-base leading-relaxed text-[#586094] dark:prose-invert dark:text-[#b6bddb] md:text-lg'>
                  <p className='font-medium text-[#111638] dark:text-white'>
                    {t.greeting}
                  </p>
                  <p className='mt-4'>{t.introText}</p>
                  <p className='mt-4'>{t.paragraph2}</p>
                  <p className='mt-4'>{t.paragraph3}</p>
                </div>
              </div>

              {/* Right Column: Visual Photo Card + Meta Badges */}
              <div className='lg:col-span-5'>
                <div className='relative overflow-hidden rounded-[24px] border-2 border-[#262f6e] bg-[#0a0d24] p-3 shadow-[0_20px_50px_rgba(10,13,36,0.5),6px_6px_0px_#00f5d4] dark:border-[#00f5d4]/50 dark:shadow-[0_20px_50px_rgba(0,245,212,0.2),6px_6px_0px_#ff2e93]'>
                  <div className='relative overflow-hidden rounded-[18px]'>
                    <CloudinaryImg
                      className='w-full object-cover'
                      publicId='pedromebo/about/presentation-pic.png'
                      width='600'
                      height='450'
                      alt='Pedro Medinilla impartiendo una ponencia técnica sobre Transformers'
                      title='Ponencia sobre Transformers'
                    />
                    <div className='absolute bottom-3 left-3 right-3 rounded-[10px] bg-[#0a0d24]/90 p-2.5 backdrop-blur-md border border-[#262f6e]'>
                      <p className='font-mono text-[11px] font-bold text-[#00f5d4]'>
                        Ponencia sobre modelos Transformers & IA
                      </p>
                      <p className='text-[10px] text-[#b6bddb]'>
                        Divulgación y arquitectura técnica
                      </p>
                    </div>
                  </div>

                  {/* Fact Sheet */}
                  <div className='mt-3 space-y-2 p-2'>
                    <div className='flex items-center gap-2 text-xs font-semibold text-white'>
                      <FiMapPin className='text-[#00f5d4]' />
                      <span>{t.location}</span>
                    </div>
                    <div className='flex items-center gap-2 text-xs font-semibold text-white'>
                      <FiAward className='text-[#ff2e93]' />
                      <span>Máster Big Data (98/100) • HND Distinction</span>
                    </div>
                    <div className='flex items-center gap-2 text-xs font-semibold text-white'>
                      <FiBriefcase className='text-[#596dff]' />
                      <span>Sistemas Multiagente, Capas Semánticas & MLOps</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            EXPERIENCIA PROFESIONAL (Igual que en el CV)
           =================================================================== */}
        <section className='mt-20 border-t border-[#cbcfe0] py-16 dark:border-[#262f6e]'>
          <div className='layout'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <span className='font-mono text-xs font-bold uppercase tracking-wider text-[#00f5d4]'>
                  TRAYECTORIA LABORAL
                </span>
                <h2 className='mt-1 text-2xl font-bold sm:text-4xl'>
                  <Accent>{t.experienceTitle}</Accent>
                </h2>
              </div>
              <Mascot pose='rocket' mode='sticker' size='xs' className='hidden max-w-[85px] sm:block' />
            </div>

            {/* Vertical Timeline de Experiencia Profesional */}
            <div className='relative mt-10 space-y-8 pl-6 before:absolute before:bottom-0 before:left-[11px] before:top-2 before:w-[2px] before:bg-gradient-to-b before:from-[#00f5d4] via-[#596dff] to-[#ff2e93]'>
              {t.experience.map((job, idx) => (
                <div key={idx} className='relative group'>
                  {/* Glowing Node */}
                  <div className='absolute -left-[30px] top-1.5 h-4 w-4 rounded-full border-2 border-[#111638] bg-[#00f5d4] shadow-[0_0_12px_#00f5d4] transition-transform group-hover:scale-125 dark:border-white' />

                  <div className='rounded-[18px] border border-[#cbcfe0] bg-white p-5 shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:shadow-md dark:border-[#262f6e] dark:bg-[#0a0d24] sm:p-6'>
                    <div className='flex flex-wrap items-center justify-between gap-2 border-b border-[#cbcfe0]/60 pb-3 dark:border-[#262f6e]'>
                      <div className='flex flex-wrap items-center gap-2'>
                        <span className='font-mono text-xs font-extrabold text-[#596dff] dark:text-[#00f5d4]'>
                          {job.period}
                        </span>
                        <span className='rounded bg-[#eff0f7] px-2 py-0.5 font-mono text-[11px] font-bold text-[#111638] dark:bg-[#111638] dark:text-[#00f5d4]'>
                          {job.company}
                        </span>
                      </div>
                      <span className='font-mono text-[11px] text-[#586094] dark:text-[#b6bddb]'>
                        {job.location}
                      </span>
                    </div>

                    <h3 className='mt-3 text-lg font-bold text-[#111638] dark:text-white sm:text-xl'>
                      {job.role}
                    </h3>
                    <p className='mt-2 text-sm leading-relaxed text-[#586094] dark:text-[#b6bddb]'>
                      {job.desc}
                    </p>

                    {job.bullets && job.bullets.length > 0 && (
                      <ul className='mt-3 space-y-1.5 pl-4 text-xs text-[#586094] dark:text-[#b6bddb] sm:text-sm list-disc marker:text-[#00f5d4]'>
                        {job.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className='leading-relaxed'>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            FORMACIÓN ACADÉMICA & CERTIFICACIONES (Separado como en el CV)
           =================================================================== */}
        <section className='border-t border-[#cbcfe0] py-16 dark:border-[#262f6e]'>
          <div className='layout'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <span className='font-mono text-xs font-bold uppercase tracking-wider text-[#ff2e93]'>
                  EDUCACIÓN & LOGROS
                </span>
                <h2 className='mt-1 text-2xl font-bold sm:text-4xl'>
                  <Accent>{t.educationTitle}</Accent>
                </h2>
              </div>
              <Mascot pose='reading' mode='sticker' size='xs' className='hidden max-w-[85px] sm:block' />
            </div>

            {/* Grid de Formación */}
            <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
              {t.education.map((edu, idx) => (
                <div
                  key={idx}
                  className='rounded-[20px] border border-[#cbcfe0] bg-white p-6 shadow-sm transition-all hover:border-[#00f5d4] dark:border-[#262f6e] dark:bg-[#0a0d24]'
                >
                  <div className='flex items-center justify-between gap-2'>
                    <span className='font-mono text-xs font-bold text-[#596dff] dark:text-[#00f5d4]'>
                      {edu.period}
                    </span>
                    <span className='rounded bg-[#eff0f7] px-2.5 py-0.5 font-mono text-xs font-extrabold text-[#ff2e93] dark:bg-[#111638]'>
                      {edu.grade}
                    </span>
                  </div>

                  <h3 className='mt-3 text-lg font-bold text-[#111638] dark:text-white'>
                    {edu.degree}
                  </h3>
                  <p className='mt-1 font-mono text-xs font-semibold text-[#586094] dark:text-[#00f5d4]'>
                    {edu.institution}
                  </p>
                  <p className='mt-2.5 text-xs leading-relaxed text-[#586094] dark:text-[#b6bddb] sm:text-sm'>
                    {edu.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Certificaciones destacadas */}
            <div className='mt-10 rounded-[20px] border border-[#cbcfe0] bg-[#eff0f7]/50 p-6 dark:border-[#262f6e] dark:bg-[#0a0d24]/60 sm:p-8'>
              <h3 className='font-mono text-sm font-extrabold uppercase tracking-wide text-[#111638] dark:text-white'>
                ✦ {t.certificationsTitle}
              </h3>
              <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                {t.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className='rounded-[12px] border border-[#cbcfe0] bg-white p-3.5 shadow-sm dark:border-[#262f6e] dark:bg-[#111638]'
                  >
                    <div className='flex items-center justify-between text-[11px] font-mono text-[#596dff] dark:text-[#00f5d4]'>
                      <span>{cert.year}</span>
                      <span className='font-semibold text-[#586094] dark:text-[#b6bddb]'>{cert.issuer}</span>
                    </div>
                    <p className='mt-1 text-xs font-bold text-[#111638] dark:text-white'>
                      {cert.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            TECH STACK & ECOSISTEMA BENTO GRID
           =================================================================== */}
        <section className='border-t border-[#cbcfe0] py-16 dark:border-[#262f6e]'>
          <div className='layout'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <span className='font-mono text-xs font-bold uppercase tracking-wider text-[#00f5d4]'>
                  STACK DE PRODUCCIÓN
                </span>
                <h2 className='mt-1 text-2xl font-bold sm:text-4xl'>
                  <Accent>{t.techStack}</Accent>
                </h2>
                <p className='mt-2 text-sm text-[#586094] dark:text-[#b6bddb]'>
                  {t.techStackSubtitle}
                </p>
              </div>
              <Mascot pose='coding' mode='sticker' size='xs' className='hidden max-w-[85px] sm:block' />
            </div>

            <div className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2'>
              {TECH_GROUPS.map((group, idx) => (
                <div
                  key={idx}
                  className='rounded-[20px] border border-[#cbcfe0] bg-white p-6 shadow-sm transition-all hover:border-[#00f5d4] dark:border-[#262f6e] dark:bg-[#0a0d24]'
                >
                  <div className='flex items-center gap-2'>
                    <span
                      style={{ backgroundColor: group.accent }}
                      className='h-2.5 w-2.5 rounded-full shadow-sm'
                    />
                    <h3 className='font-mono text-sm font-extrabold uppercase tracking-wide text-[#111638] dark:text-white'>
                      {group.title}
                    </h3>
                  </div>

                  <div className='mt-4 flex flex-wrap gap-2'>
                    {group.items.map((tech, i) => (
                      <span
                        key={i}
                        className='inline-flex items-center gap-1.5 rounded-[8px] border border-[#cbcfe0] bg-[#eff0f7] px-3 py-1.5 text-xs font-semibold text-[#111638] transition-colors hover:border-[#00f5d4] dark:border-[#262f6e] dark:bg-[#111638] dark:text-white'
                      >
                        <tech.icon
                          style={{ color: group.accent }}
                          className='h-3.5 w-3.5'
                        />
                        <span>{tech.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            HUB DE CONTACTO DIRECTO
           =================================================================== */}
        <section>
          <div className='layout mt-8 rounded-[24px] border border-[#cbcfe0] bg-white p-6 shadow-sm dark:border-[#262f6e] dark:bg-[#0a0d24]/90 sm:p-8'>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex-1'>
                <div className='inline-flex items-center gap-2 rounded-full border border-[#00f5d4]/40 bg-[#00f5d4]/10 px-3 py-1 font-mono text-xs font-semibold text-[#0f766e] dark:text-[#00f5d4]'>
                  <span className='h-2 w-2 animate-pulse rounded-full bg-[#00f5d4]' />
                  <span>{t.contactMeSubtitle}</span>
                </div>

                <h2 className='mt-3 text-2xl font-bold sm:text-3xl'>{t.contactMeTitle}</h2>

                <p className='mt-2 max-w-xl text-sm leading-relaxed text-[#586094] dark:text-[#b6bddb] sm:text-base'>
                  {t.contactMe}
                </p>

                {/* Focus Areas Chips */}
                {t.helpAreas && t.helpAreas.length > 0 && (
                  <div className='mt-4 flex flex-wrap gap-2'>
                    {t.helpAreas.map((area, aIdx) => (
                      <span
                        key={aIdx}
                        className='inline-flex items-center gap-1.5 rounded-lg border border-[#cbcfe0] bg-[#eff0f7]/70 px-3 py-1 font-mono text-xs font-semibold text-[#111638] dark:border-[#262f6e] dark:bg-[#111638] dark:text-[#b6bddb]'
                      >
                        <span className='h-1.5 w-1.5 rounded-full bg-[#00f5d4]' />
                        <span>{area}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Direct Action Buttons Hub */}
                <div className='mt-6 flex flex-wrap items-center gap-3'>
                  <button
                    type='button'
                    onClick={handleCopyEmail}
                    className='inline-flex items-center gap-2 rounded-[10px] border border-[#00f5d4] bg-[#00f5d4] px-4 py-2.5 font-mono text-xs font-bold text-[#111638] shadow-[0_4px_14px_rgba(0,245,212,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,245,212,0.4)]'
                  >
                    {copied ? (
                      <>
                        <FiCheck className='h-4 w-4 text-[#111638]' />
                        <span>{t.copiedEmail}</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className='h-4 w-4' />
                        <span>contacto@pedromebo.com</span>
                      </>
                    )}
                  </button>

                  <a
                    href='mailto:contacto@pedromebo.com'
                    onClick={() =>
                      trackEvent('About Contact: Send Email', { type: 'link' })
                    }
                    className='inline-flex items-center gap-2 rounded-[10px] border border-[#cbcfe0] bg-[#eff0f7] px-4 py-2.5 font-mono text-xs font-bold text-[#111638] transition-all hover:-translate-y-0.5 dark:border-[#262f6e] dark:bg-[#111638] dark:text-white dark:hover:border-[#00f5d4]'
                  >
                    <FiMail className='h-4 w-4 text-[#596dff]' />
                    <span>{t.sendEmail}</span>
                  </a>

                  <UnstyledLink
                    href='https://www.linkedin.com/in/pedromebo/'
                    onClick={() => trackEvent('About Contact: LinkedIn', { type: 'link' })}
                    className='inline-flex items-center gap-2 rounded-[10px] border border-[#cbcfe0] bg-[#eff0f7] px-3.5 py-2.5 font-mono text-xs font-bold text-[#111638] transition-all hover:-translate-y-0.5 dark:border-[#262f6e] dark:bg-[#111638] dark:text-white dark:hover:border-[#00f5d4]'
                  >
                    <SiLinkedin className='h-4 w-4 text-[#00b89c] dark:text-[#00f5d4]' />
                    <span>{t.connectLinkedIn}</span>
                  </UnstyledLink>

                  <UnstyledLink
                    href='https://twitter.com/pedromebo'
                    onClick={() => trackEvent('About Contact: Twitter', { type: 'link' })}
                    className='inline-flex items-center gap-2 rounded-[10px] border border-[#cbcfe0] bg-[#eff0f7] px-3.5 py-2.5 font-mono text-xs font-bold text-[#111638] transition-all hover:-translate-y-0.5 dark:border-[#262f6e] dark:bg-[#111638] dark:text-white dark:hover:border-[#ff2e93]'
                  >
                    <FaXTwitter className='h-4 w-4 text-[#ff2e93]' />
                    <span>{t.connectTwitter}</span>
                  </UnstyledLink>
                </div>
              </div>

              <div className='shrink-0 self-center md:self-auto'>
                <Mascot pose='contact' mode='sticker' size='sm' className='max-w-[130px]' />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
