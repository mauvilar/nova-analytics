import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const email = 'admin@novaanalytics.io';
const password = process.env.SEED_ADMIN_PASSWORD ?? 'NovaDemo2026!';

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: { full_name: 'Nova Admin' }
});

if (error && !String(error.message).toLowerCase().includes('already')) {
  console.error('Seed failed:', error.message);
  process.exit(1);
}

console.log('✔ Demo user ready:', data?.user?.email ?? email);
