# Database

The database lives in **Supabase Postgres**. There are two relevant pieces: the auth schema that
Supabase manages for us, and one application table we own.

## `auth.users` — managed by Supabase

This is the **source of truth for login**. Supabase Auth creates and maintains it automatically;
`signUp` / `signInWithPassword` / the Admin API all operate on it. We never modify it directly —
we only react to it (via a trigger) and reference it (via a foreign key).

## `public.profiles` — our table

A 1:1 mirror of `auth.users` for application-level profile data, defined in
[`supabase/migrations/0001_profiles_and_rls.sql`](../supabase/migrations/0001_profiles_and_rls.sql).

```
public.profiles
├─ id          uuid  PK  → references auth.users(id) on delete cascade
├─ email       text
├─ full_name   text
├─ avatar_url  text
├─ created_at  timestamptz  default now()
└─ updated_at  timestamptz  default now()   (kept fresh by a BEFORE UPDATE trigger)
```

### Auto-creation trigger

When a new user signs up, a profile row is created automatically:

```
auth.users  ──(AFTER INSERT)──>  public.handle_new_user()  ──>  insert into public.profiles
```

`handle_new_user()` is `SECURITY DEFINER` so it can insert past RLS, and reads `full_name` /
`avatar_url` from the new user's `raw_user_meta_data`. The migration also **backfills** profiles for
any users that existed before the trigger (e.g. the seeded admin).

### Row-Level Security (RLS)

RLS is **enabled** on `public.profiles`. A user can only touch their own row:

| Policy | Command | Rule |
|---|---|---|
| `profiles_select_own` | SELECT | `auth.uid() = id` |
| `profiles_update_own` | UPDATE | `auth.uid() = id` (using + with check) |
| `profiles_insert_own` | INSERT | `auth.uid() = id` |

`auth.uid()` resolves to the authenticated user's id from their JWT, so the same query returns only
that user's profile — enforced by Postgres, not by the application.

## Applying the migration

The migration is idempotent. Any of these work:

- **Supabase Management API** (used here): `POST /v1/projects/{ref}/database/query` with the SQL.
- **Dashboard**: paste the SQL into the project's SQL Editor.
- **Supabase CLI**: link the project (`supabase link --project-ref <ref>`) then `supabase db push`.

## Verification (current live state)

```
profiles row:   admin@novaanalytics.io · "Nova Admin"   (backfilled)
RLS:            rowsecurity = true
policies:       profiles_select_own, profiles_update_own, profiles_insert_own
trigger:        on_auth_user_created  (AFTER INSERT on auth.users)
```

## Dashboard demo data

The dashboard's metrics/tables are **demo data** (faker-based mock API in `src/constants/`), not
Postgres tables — there is no ingestion pipeline in this trial. The profiles table above is the real,
RLS-protected data backing authentication/identity.
