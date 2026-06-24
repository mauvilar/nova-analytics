import { createClient } from '@/lib/supabase/server';

export default async function ProfileViewPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const rows: Array<{ label: string; value: string }> = [
    { label: 'Email', value: user?.email ?? '—' },
    { label: 'User ID', value: user?.id ?? '—' },
    {
      label: 'Last sign in',
      value: user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : '—'
    }
  ];

  return (
    <div className='flex w-full flex-col gap-4 p-4'>
      <div>
        <h2 className='text-lg font-semibold'>Account</h2>
        <p className='text-muted-foreground text-sm'>Your Nova Analytics account details.</p>
      </div>
      <dl className='grid gap-1 text-sm'>
        {rows.map((row) => (
          <div key={row.label} className='flex items-center justify-between border-b py-2'>
            <dt className='text-muted-foreground'>{row.label}</dt>
            <dd className='font-medium'>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
