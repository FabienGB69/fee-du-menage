create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nom text not null,
  telephone text not null,
  email text not null,
  adresse text not null,
  type_prestation text not null,
  surface_logement text,
  frequence_souhaitee text,
  message text,
  source text default 'site-web'
);

alter table quote_requests enable row level security;

-- Inserts are performed from the protected Next.js API route using SUPABASE_SERVICE_ROLE_KEY.
-- No public insert policy is required for the browser.
