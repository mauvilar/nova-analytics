import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About'
};

export default function AboutPage() {
  return (
    <div className='min-h-screen px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h1 className='text-foreground text-3xl font-bold tracking-tight sm:text-4xl'>
            About Nova Analytics
          </h1>
          <p className='text-muted-foreground mt-4 text-lg'>Turn data into decisions.</p>
        </div>

        {/* Content Sections */}
        <div className='space-y-8'>
          <section className='bg-card rounded-2xl border p-8 shadow-sm'>
            <h2 className='text-foreground mb-4 text-xl font-semibold'>What Nova Analytics does</h2>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              Nova Analytics gives teams a clear, fast view of the metrics that matter — revenue,
              active users, retention, and product events — in one dashboard. We turn raw data into
              decisions, so you spend less time wrangling numbers and more time acting on them.
            </p>
          </section>

          <section className='bg-card rounded-2xl border p-8 shadow-sm'>
            <h2 className='text-foreground mb-4 text-xl font-semibold'>Built for clarity</h2>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              A focused, legible interface that loads fast and works on any device. Every chart and
              number earns its place — no clutter, no noise, just the signal you need.
            </p>
          </section>

          <section className='bg-card rounded-2xl border p-8 shadow-sm'>
            <h2 className='text-foreground mb-4 text-xl font-semibold'>
              Authentication by Supabase
            </h2>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              Sign-in and account security are handled by{' '}
              <a
                href='https://supabase.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary font-medium hover:underline'
              >
                Supabase
              </a>
              , providing secure sessions and user management out of the box.
            </p>
          </section>

          <section className='bg-card rounded-2xl border p-8 shadow-sm'>
            <h2 className='text-foreground mb-4 text-xl font-semibold'>Data privacy</h2>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              We take privacy seriously. Your data is never sold or shared with third parties, and
              is used only to provide the Nova Analytics experience.
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className='mt-12 text-center'>
          <p className='text-muted-foreground text-sm'>© Nova Analytics. Built with Next.js.</p>
        </div>
      </div>
    </div>
  );
}
