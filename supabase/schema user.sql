create table public.roles (
    id bigint generated always as identity primary key,

    name text not null unique,

    description text,

    created_at timestamptz default now()
);

insert into public.roles (name, description)
values
('admin', 'Full system administrator'),
('operator', 'Handle incidents and dispatch'),
('viewer', 'Read-only access');




create table public.profiles (

    id uuid primary key
        references auth.users(id)
        on delete cascade,

    role_id bigint not null
        references public.roles(id),

    full_name text,
    email text not null,
    employee_id text unique,

    department text,

    phone text,

    avatar_url text,

    last_login timestamptz,

    is_active boolean default true,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);





create policy "Authenticated users can view profiles"
on public.profiles
for select
to authenticated
using (true);

create policy "Authenticated users can view roles"
on public.roles
for select
to authenticated
using (true);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);