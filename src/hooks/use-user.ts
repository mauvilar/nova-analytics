'use client';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

export type SessionUser = {
  name: string | null;
  email: string | null;
  imageUrl?: string;
};

function toSessionUser(user: User | null): SessionUser | null {
  if (!user) return null;
  return {
    name: (user.user_metadata?.full_name as string | undefined) ?? null,
    email: user.email ?? null,
    imageUrl: user.user_metadata?.avatar_url as string | undefined
  };
}

/**
 * Client hook exposing the current Supabase user in a normalized shape.
 * Subscribes to auth state changes so the sidebar/header stay in sync after sign in/out.
 */
export function useSupabaseUser() {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => setUser(toSessionUser(data.user)));

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toSessionUser(session?.user ?? null));
    });

    return () => subscription.unsubscribe();
  }, []);

  return user;
}
