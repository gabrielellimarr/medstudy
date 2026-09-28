-- Etapa 1/2: perfis, preferências, disciplinas e assuntos, todos com RLS.

create table public.perfis (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  criado_em timestamptz not null default now()
);

create table public.preferencias (
  usuario_id uuid primary key references auth.users(id) on delete cascade,
  tema text not null default 'auto' check (tema in ('claro','escuro','auto')),
  cor_principal text not null default '#0f766e',
  meta_diaria_minutos int not null default 120,
  atualizado_em timestamptz not null default now()
);

create table public.disciplinas (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references auth.users(id) on delete cascade,
  nome text not null,
  criado_em timestamptz not null default now(),
  unique (usuario_id, nome)
);

create table public.assuntos (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references auth.users(id) on delete cascade,
  disciplina_id uuid not null references public.disciplinas(id) on delete cascade,
  nome text not null,
  criado_em timestamptz not null default now()
);
create index on public.assuntos (disciplina_id);

alter table public.perfis enable row level security;
alter table public.preferencias enable row level security;
alter table public.disciplinas enable row level security;
alter table public.assuntos enable row level security;

create policy "perfil: dono" on public.perfis for all using (id = auth.uid()) with check (id = auth.uid());
create policy "prefs: dono" on public.preferencias for all using (usuario_id = auth.uid()) with check (usuario_id = auth.uid());
create policy "disciplinas: dono" on public.disciplinas for all using (usuario_id = auth.uid()) with check (usuario_id = auth.uid());
create policy "assuntos: dono" on public.assuntos for all using (usuario_id = auth.uid()) with check (usuario_id = auth.uid());

-- Ao cadastrar um usuário: cria perfil, preferências e as disciplinas iniciais (editáveis).
create or replace function public.novo_usuario() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into perfis (id) values (new.id);
  insert into preferencias (usuario_id) values (new.id);
  insert into disciplinas (usuario_id, nome)
  select new.id, d from unnest(array[
    'Anatomia','Histologia','Embriologia','Fisiologia','Bioquímica','Biologia Celular',
    'Genética','Imunologia','Microbiologia','Parasitologia','Patologia','Farmacologia',
    'Semiologia','Clínica Médica','Cirurgia','Pediatria','Ginecologia e Obstetrícia',
    'Medicina de Família e Comunidade','Saúde Coletiva'
  ]) as d;
  return new;
end $$;

create trigger ao_criar_usuario after insert on auth.users
for each row execute function public.novo_usuario();
