create extension if not exists "pgcrypto";

create table if not exists public.programs (id uuid primary key default gen_random_uuid(), level text not null, name text not null, description text, duration text, sort_order integer default 0);
create table if not exists public.teachers (id uuid primary key default gen_random_uuid(), name text not null, position text, image_url text, sort_order integer default 0);
create table if not exists public.news (id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null, excerpt text, content text not null, cover_url text, published boolean default false, published_at timestamptz default now(), created_at timestamptz default now());
create table if not exists public.applicants (id uuid primary key default gen_random_uuid(), full_name text not null, citizen_id text not null, phone text not null, email text, level text not null, prev_school text, gpa text, status text default 'pending' check (status in ('pending','approved','rejected')), created_at timestamptz default now());

alter table public.programs enable row level security;
alter table public.teachers enable row level security;
alter table public.news enable row level security;
alter table public.applicants enable row level security;
create policy "public read programs" on public.programs for select using (true);
create policy "public read teachers" on public.teachers for select using (true);
create policy "authenticated manage programs" on public.programs for all to authenticated using (true) with check (true);
create policy "authenticated manage teachers" on public.teachers for all to authenticated using (true) with check (true);
create policy "public read published news" on public.news for select using (published = true or auth.role() = 'authenticated');
create policy "authenticated manage news" on public.news for all to authenticated using (true) with check (true);
create policy "public submit application" on public.applicants for insert to anon with check (status = 'pending');
create policy "authenticated manage applications" on public.applicants for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do update set public = true;
create policy "public read media" on storage.objects for select using (bucket_id = 'media');
create policy "authenticated upload media" on storage.objects for insert to authenticated with check (bucket_id = 'media');
create policy "authenticated update media" on storage.objects for update to authenticated using (bucket_id = 'media');
create policy "authenticated delete media" on storage.objects for delete to authenticated using (bucket_id = 'media');
