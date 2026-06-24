// Self-contained, on-brand preview of the Nova dashboard — pure SVG/CSS, no external assets.
const KPIS = [
  { label: 'Revenue', value: '$48.2k', delta: '+12.4%' },
  { label: 'Active users', value: '8,914', delta: '+5.1%' },
  { label: 'Retention', value: '73%', delta: '+2.0pt' }
];

const LINE =
  'M0 120 L40 110 L80 118 L120 92 L160 100 L200 70 L240 80 L280 52 L320 62 L360 36 L400 44';

export function DashboardPreview() {
  return (
    <div className='relative'>
      {/* brand glow behind the panel */}
      <div
        aria-hidden
        className='nova-glow pointer-events-none absolute -inset-10 -z-10 rounded-full blur-3xl'
        style={{
          background:
            'radial-gradient(closest-side, color-mix(in oklch, var(--primary) 50%, transparent), transparent)'
        }}
      />
      <div className='bg-card/80 ring-border/60 overflow-hidden rounded-2xl border shadow-2xl ring-1 backdrop-blur'>
        {/* window chrome */}
        <div className='border-border/60 flex items-center gap-2 border-b px-4 py-3'>
          <span className='size-2.5 rounded-full bg-rose-400/70' />
          <span className='size-2.5 rounded-full bg-amber-400/70' />
          <span className='size-2.5 rounded-full bg-emerald-400/70' />
          <span className='text-muted-foreground ml-3 text-xs font-medium'>
            Nova Analytics · Overview
          </span>
        </div>

        <div className='space-y-4 p-4 sm:p-5'>
          {/* KPI tiles */}
          <div className='grid grid-cols-3 gap-3'>
            {KPIS.map((k) => (
              <div
                key={k.label}
                className='border-border/60 bg-background/40 rounded-lg border p-3'
              >
                <div className='text-muted-foreground text-[11px]'>{k.label}</div>
                <div className='mt-1 text-base font-semibold tracking-tight sm:text-lg'>
                  {k.value}
                </div>
                <div className='text-[11px] font-medium text-emerald-400'>{k.delta}</div>
              </div>
            ))}
          </div>

          {/* area chart */}
          <div className='border-border/60 bg-background/40 rounded-lg border p-4'>
            <div className='mb-3 flex items-center justify-between'>
              <span className='text-sm font-medium'>Events</span>
              <span className='text-muted-foreground text-xs'>Last 30 days</span>
            </div>
            <svg
              viewBox='0 0 400 150'
              className='h-28 w-full sm:h-32'
              preserveAspectRatio='none'
              role='img'
              aria-label='Events trending upward over the last 30 days'
            >
              <defs>
                <linearGradient
                  id='nova-stroke'
                  x1='0'
                  y1='0'
                  x2='400'
                  y2='0'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#6366F1' />
                  <stop offset='1' stopColor='#22D3EE' />
                </linearGradient>
                <linearGradient
                  id='nova-fill'
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='150'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#6366F1' stopOpacity='0.35' />
                  <stop offset='1' stopColor='#22D3EE' stopOpacity='0' />
                </linearGradient>
              </defs>
              <path d={`${LINE} L400 150 L0 150 Z`} fill='url(#nova-fill)' />
              <path
                d={LINE}
                fill='none'
                stroke='url(#nova-stroke)'
                strokeWidth='2.5'
                strokeLinejoin='round'
                strokeLinecap='round'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
