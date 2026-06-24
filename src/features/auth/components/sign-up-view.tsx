'use client';
import Link from 'next/link';
import { useActionState } from 'react';
import { signUpAction, type AuthState } from '@/features/auth/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignUpViewPage() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(signUpAction, undefined);

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-sm space-y-6'>
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>Create your account</h1>
          <p className='text-muted-foreground text-sm'>Start turning data into decisions</p>
        </div>
        <form action={formAction} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' name='email' type='email' autoComplete='email' required />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              type='password'
              autoComplete='new-password'
              minLength={6}
              required
            />
          </div>
          {state?.error && <p className='text-destructive text-sm'>{state.error}</p>}
          <Button type='submit' className='w-full' disabled={pending}>
            {pending ? 'Creating account…' : 'Sign up'}
          </Button>
        </form>
        <p className='text-muted-foreground text-center text-sm'>
          Already have an account?{' '}
          <Link href='/auth/sign-in' className='text-primary underline underline-offset-4'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
