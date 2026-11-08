import * as React from 'react';
import { HiArrowSmDown, HiOutlineSparkles, HiOutlineCubeTransparent, HiOutlineLightningBolt } from 'react-icons/hi';

type DeepSeekPipelineProps = {
  lang?: 'es' | 'en';
};

export default function DeepSeekPipeline({ lang = 'es' }: DeepSeekPipelineProps) {
  const isEs = lang === 'es';

  const stages = [
    {
      step: '01',
      title: isEs ? 'Cold Start SFT' : 'Cold Start SFT',
      badge: 'DeepSeek-V3-Base',
      desc: isEs
        ? 'Ajuste fino inicial con miles de datos Long-CoT de alta calidad para dotar al modelo base de capacidad preliminar de razonamiento.'
        : 'Initial fine-tuning with thousands of high-quality curated Long-CoT samples to provide the base model with readable reasoning ability.',
      color: 'border-[#596dff]/40 bg-[#596dff]/5 text-[#596dff] dark:border-[#596dff]/50 dark:text-[#8b9aff]',
    },
    {
      step: '02',
      title: isEs ? 'Reasoning-oriented RL (GRPO)' : 'Reasoning-oriented RL (GRPO)',
      badge: isEs ? 'Razonamiento Puro' : 'Pure Reasoning',
      desc: isEs
        ? 'Entrenamiento masivo con RL enfocado en matemáticas, código y lógica usando recompensas basadas en reglas y formato think.'
        : 'Large-scale RL training focused on math, coding, and logic using rule-based accuracy and format verification rewards.',
      color: 'border-[#00f5d4]/40 bg-[#00f5d4]/5 text-[#0f766e] dark:border-[#00f5d4]/50 dark:text-[#00f5d4]',
    },
    {
      step: '03',
      title: isEs ? 'Rejection Sampling & Multi-task SFT' : 'Rejection Sampling & Multi-task SFT',
      badge: isEs ? '~800k Muestras' : '~800k Samples',
      desc: isEs
        ? 'Muestreo por rechazo de nuevas trayectorias CoT combinado con datos no-razonamiento (redacción, traducción, QA general).'
        : 'Rejection sampling of high-quality CoT trajectories combined with non-reasoning data (creative writing, translation, general QA).',
      color: 'border-[#ff2e93]/40 bg-[#ff2e93]/5 text-[#c0216f] dark:border-[#ff2e93]/50 dark:text-[#ff2e93]',
    },
    {
      step: '04',
      title: isEs ? 'RL Multiescenario' : 'All-Scenario RL',
      badge: isEs ? 'Alineación Humana' : 'Human Alignment',
      desc: isEs
        ? 'Fase secundaria de RL que optimiza la precisión en razonamiento mientras alinea el modelo en utilidad y seguridad (Helpfulness & Harmlessness).'
        : 'Secondary RL phase optimizing reasoning accuracy while aligning with human preferences (Helpfulness & Harmlessness).',
      color: 'border-[#00f5d4]/40 bg-[#00f5d4]/5 text-[#0f766e] dark:border-[#00f5d4]/50 dark:text-[#00f5d4]',
    },
  ];

  return (
    <div className='my-8 w-full max-w-full overflow-hidden rounded-2xl border border-[#cbcfe0] bg-white p-4 shadow-sm sm:p-7 dark:border-[#262f6e] dark:bg-[#0d1236]'>
      <div className='mb-6 flex items-center justify-between border-b border-[#cbcfe0]/60 pb-3 dark:border-[#262f6e]'>
        <div className='flex items-center gap-2'>
          <HiOutlineSparkles className='h-5 w-5 text-[#00f5d4]' />
          <h4 className='m-0 font-mono text-sm font-bold tracking-wide uppercase text-[#111638] dark:text-white'>
            {isEs
              ? 'Pipeline de Entrenamiento de DeepSeek-R1'
              : 'DeepSeek-R1 Training Pipeline'}
          </h4>
        </div>
        <span className='rounded-full border border-[#00f5d4]/30 bg-[#00f5d4]/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#0f766e] dark:text-[#00f5d4]'>
          Table / Sec. 2.3
        </span>
      </div>

      {/* Vertical Pipeline Steps */}
      <div className='space-y-3'>
        {stages.map((stage, idx) => (
          <React.Fragment key={stage.step}>
            <div className={`relative rounded-xl border p-4 transition-all hover:scale-[1.01] ${stage.color}`}>
              <div className='flex flex-wrap items-center justify-between gap-2 mb-1.5'>
                <div className='flex items-center gap-2'>
                  <span className='rounded-md bg-black/10 px-2 py-0.5 font-mono text-xs font-black dark:bg-white/10'>
                    {stage.step}
                  </span>
                  <span className='font-bold text-sm text-[#111638] dark:text-white'>
                    {stage.title}
                  </span>
                </div>
                <span className='font-mono text-[11px] font-medium opacity-80'>
                  {stage.badge}
                </span>
              </div>
              <p className='m-0 text-xs leading-relaxed text-[#586094] dark:text-[#b6bddb]'>
                {stage.desc}
              </p>
            </div>

            {idx < stages.length - 1 && (
              <div className='flex justify-center -my-1 text-[#596dff] dark:text-[#00f5d4]'>
                <HiArrowSmDown className='h-5 w-5' />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Target & Distillation outcome */}
      <div className='mt-5 grid grid-cols-1 gap-3 pt-4 border-t border-[#cbcfe0]/60 sm:grid-cols-2 dark:border-[#262f6e]'>
        <div className='rounded-xl border border-[#00f5d4]/40 bg-[#00f5d4]/10 p-3.5 text-center'>
          <div className='flex items-center justify-center gap-1.5 text-xs font-bold text-[#0f766e] dark:text-[#00f5d4]'>
            <HiOutlineLightningBolt className='h-4 w-4' />
            <span>{isEs ? 'Modelo Insignia' : 'Flagship Model'}</span>
          </div>
          <p className='m-0 mt-1 font-mono text-xs font-bold text-[#111638] dark:text-white'>
            DeepSeek-R1 (671B MoE)
          </p>
        </div>

        <div className='rounded-xl border border-[#596dff]/40 bg-[#596dff]/10 p-3.5 text-center'>
          <div className='flex items-center justify-center gap-1.5 text-xs font-bold text-[#596dff] dark:text-[#8b9aff]'>
            <HiOutlineCubeTransparent className='h-4 w-4' />
            <span>{isEs ? 'Modelos Destilados' : 'Distilled Models'}</span>
          </div>
          <p className='m-0 mt-1 font-mono text-xs font-bold text-[#111638] dark:text-white'>
            Qwen (1.5B–32B) & Llama (8B–70B)
          </p>
        </div>
      </div>
    </div>
  );
}

