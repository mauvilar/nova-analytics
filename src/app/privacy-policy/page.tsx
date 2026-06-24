import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  robots: {
    index: false
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className='min-h-screen px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl space-y-8'>
        {/* Main Heading */}
        <h1 className='text-foreground text-3xl font-bold'>Privacy Policy</h1>

        {/* Introduction */}
        <section>
          <h2 className='text-foreground mb-3 text-xl font-semibold'>Introduction</h2>
          <p className='text-muted-foreground text-base leading-relaxed'>
            This Privacy Policy explains how Nova Analytics handles your personal information when
            you use the application. We are committed to protecting your privacy and being
            transparent about our data practices.
          </p>
        </section>

        {/* Data Collection */}
        <section>
          <h2 className='text-foreground mb-3 text-xl font-semibold'>Data Collection</h2>
          <p className='text-muted-foreground text-base leading-relaxed'>
            We collect the minimal data necessary for authentication. When you sign in, we receive
            basic profile information such as your email address. This is used solely to identify
            you within the application and provide access to your dashboard.
          </p>
        </section>

        {/* Auth handled by Supabase */}
        <section>
          <h2 className='text-foreground mb-3 text-xl font-semibold'>Authentication by Supabase</h2>
          <p className='text-muted-foreground text-base leading-relaxed'>
            Nova Analytics uses{' '}
            <a
              href='https://supabase.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary font-medium hover:underline'
            >
              Supabase
            </a>{' '}
            to handle authentication securely, including sign-up, sign-in, and session management.
            For details on how Supabase processes data, see their{' '}
            <a
              href='https://supabase.com/privacy'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary font-medium hover:underline'
            >
              Privacy Policy
            </a>
            .
          </p>
        </section>

        {/* No data misuse */}
        <section>
          <h2 className='text-foreground mb-3 text-xl font-semibold'>No Data Misuse</h2>
          <p className='text-muted-foreground text-base leading-relaxed'>
            Your personal data is never sold, rented, or shared with third parties for marketing
            purposes. It is used exclusively for the intended functionality of Nova Analytics.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className='text-foreground mb-3 text-xl font-semibold'>Contact Us</h2>
          <p className='text-muted-foreground text-base leading-relaxed'>
            Questions about this Privacy Policy? Contact us at{' '}
            <a
              href='mailto:privacy@novaanalytics.io'
              className='text-primary font-medium hover:underline'
            >
              privacy@novaanalytics.io
            </a>
            .
          </p>
        </section>

        {/* Last Updated */}
        <div className='border-border border-t pt-4'>
          <p className='text-muted-foreground text-sm'>Last updated: June 2026</p>
        </div>
      </div>
    </div>
  );
}
