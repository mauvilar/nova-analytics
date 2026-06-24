import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { DashboardPreview } from '@/components/landing/dashboard-preview';

function NovaMark({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 24 24' fill='none' className={className} aria-hidden='true'>
      <defs>
        <linearGradient id='nova-mark' x1='2' y1='2' x2='22' y2='22' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#6366F1' />
          <stop offset='1' stopColor='#22D3EE' />
        </linearGradient>
      </defs>
      <path
        d='M12 1 L14.6 9.4 L23 12 L14.6 14.6 L12 23 L9.4 14.6 L1 12 L9.4 9.4 Z'
        fill='url(#nova-mark)'
      />
    </svg>
  );
}

const FEATURES = [
  {
    icon: Icons.trendingUp,
    title: 'Every metric, one glance',
    body: 'Revenue, active users, retention and events on a single canvas — with charts that load instantly, not after a spinner.',
    wide: true
  },
  {
    icon: Icons.clock,
    title: 'Real-time',
    body: 'Numbers move as your business does. No stale exports, no overnight batch.',
    wide: false
  },
  {
    icon: Icons.lock,
    title: 'Secure by default',
    body: 'Authentication and row-level security, powered by Supabase.',
    wide: false
  },
  {
    icon: Icons.adjustments,
    title: 'Made for decisions',
    body: 'Clear hierarchy and honest defaults: the signal you need is the first thing you see.',
    wide: true
  }
];

export default function Page() {
  return (
    <div className='bg-background text-foreground relative min-h-screen overflow-hidden'>
      {/* ambient brand glows */}
      <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-10'>
        <div
          className='nova-glow absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-3xl'
          style={{
            background:
              'radial-gradient(closest-side, color-mix(in oklch, var(--primary) 38%, transparent), transparent)'
          }}
        />
        <div
          className='absolute top-40 -right-40 h-[28rem] w-[28rem] rounded-full opacity-50 blur-3xl'
          style={{
            background:
              'radial-gradient(closest-side, color-mix(in oklch, var(--chart-2) 32%, transparent), transparent)'
          }}
        />
      </div>

      {/* Header */}
      <header className='border-border/40 bg-background/70 sticky top-0 z-30 border-b backdrop-blur-md'>
        <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6'>
          <Link href='/' className='flex items-center gap-2'>
            <NovaMark className='size-6' />
            <span className='font-semibold tracking-tight'>Nova Analytics</span>
          </Link>
          <nav className='hidden items-center gap-8 text-sm md:flex'>
            <a
              href='#features'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              Features
            </a>
            <Link
              href='/about'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              About
            </Link>
          </nav>
          <div className='flex items-center gap-2'>
            <Button asChild variant='ghost' size='sm'>
              <Link href='/auth/sign-in'>Log in</Link>
            </Button>
            <Button asChild size='sm'>
              <Link href='/auth/sign-up'>Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className='mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:py-24'>
        <div>
          <div className='border-border/60 bg-card/50 text-muted-foreground mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs'>
            <NovaMark className='size-3.5' />
            Analytics that reads itself
          </div>
          <h1 className='text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl'>
            Turn data into decisions.
          </h1>
          <p className='text-muted-foreground mt-6 max-w-md text-lg text-pretty'>
            Nova Analytics brings revenue, active users, retention and product events into one fast,
            legible dashboard — so you act on what matters, not on what&apos;s loudest.
          </p>
          <div className='mt-8 flex flex-wrap items-center gap-3'>
            <Button asChild size='lg'>
              <Link href='/auth/sign-up'>
                Get started
                <Icons.arrowRight className='ml-1 size-4' />
              </Link>
            </Button>
            <Button asChild size='lg' variant='outline'>
              <Link href='/auth/sign-in'>Log in</Link>
            </Button>
          </div>
          <p className='text-muted-foreground mt-4 text-xs'>
            No credit card required · See your numbers in minutes.
          </p>
        </div>
        <div className='nova-float lg:pl-6'>
          <DashboardPreview />
        </div>
      </section>

      {/* Features */}
      <section id='features' className='mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24'>
        <div className='max-w-2xl'>
          <h2 className='text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>
            Everything you track, in one clear view.
          </h2>
          <p className='text-muted-foreground mt-4 text-lg text-pretty'>
            Built for the moment you open the dashboard and need an answer — not a spreadsheet.
          </p>
        </div>
        <div className='mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`border-border bg-card rounded-2xl border p-6 ${f.wide ? 'sm:col-span-2' : ''}`}
              >
                <span className='bg-primary/10 text-primary inline-flex size-10 items-center justify-center rounded-lg'>
                  <Icon className='size-5' />
                </span>
                <h3 className='mt-4 text-lg font-semibold'>{f.title}</h3>
                <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>{f.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className='mx-auto max-w-6xl px-4 pb-20 sm:px-6'>
        <div className='border-border relative overflow-hidden rounded-3xl border p-10 text-center sm:p-16'>
          <div
            aria-hidden='true'
            className='nova-glow pointer-events-none absolute inset-0 -z-10 opacity-70'
            style={{
              background:
                'radial-gradient(closest-side at 50% 0%, color-mix(in oklch, var(--primary) 22%, transparent), transparent)'
            }}
          />
          <h2 className='mx-auto max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>
            Start turning data into decisions.
          </h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-md text-pretty'>
            Create your Nova Analytics account and see your numbers in minutes.
          </p>
          <div className='mt-8 flex justify-center'>
            <Button asChild size='lg'>
              <Link href='/auth/sign-up'>
                Get started
                <Icons.arrowRight className='ml-1 size-4' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-border/60 border-t'>
        <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6'>
          <div className='flex items-center gap-2'>
            <NovaMark className='size-5' />
            <span className='text-sm font-medium'>Nova Analytics</span>
          </div>
          <nav className='text-muted-foreground flex items-center gap-6 text-sm'>
            <Link href='/about' className='hover:text-foreground transition-colors'>
              About
            </Link>
            <Link href='/privacy-policy' className='hover:text-foreground transition-colors'>
              Privacy
            </Link>
            <Link href='/terms-of-service' className='hover:text-foreground transition-colors'>
              Terms
            </Link>
          </nav>
          <p className='text-muted-foreground text-xs'>© 2026 Nova Analytics</p>
        </div>
      </footer>
    </div>
  );
}
