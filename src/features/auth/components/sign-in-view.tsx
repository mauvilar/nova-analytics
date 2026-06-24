'use client';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { signInAction, type AuthState } from '@/features/auth/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DEMO_EMAIL = 'admin@novaanalytics.io';
const DEMO_PASSWORD = 'NovaDemo2026!';

export default function SignInViewPage() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(signInAction, undefined);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-sm space-y-6'>
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>Welcome back</h1>
          <p className='text-muted-foreground text-sm'>Sign in to your Nova Analytics account</p>
        </div>
        <form action={formAction} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@company.com'
              autoComplete='email'
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='current-password'
              required
            />
          </div>
          {state?.error && <p className='text-destructive text-sm'>{state.error}</p>}
          <Button type='submit' className='w-full' disabled={pending}>
            {pending ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
        <button
          type='button'
          onClick={() => {
            setEmail(DEMO_EMAIL);
            setPassword(DEMO_PASSWORD);
          }}
          className='border-border/60 hover:bg-accent/50 w-full rounded-md border border-dashed px-3 py-2 text-center text-xs transition-colors'
        >
          Use demo account
        </button>
        <p className='text-muted-foreground text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='/auth/sign-up' className='text-primary underline underline-offset-4'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
