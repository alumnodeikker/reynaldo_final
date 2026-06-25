create table public.salas_vip (
  id          serial primary key,
  nombre      text not null,
  descripcion text,
  capacidad   int not null default 10,
  precio_hora numeric(8,2) not null,
  imagen_url  text,
  activa      boolean not null default true
);

insert into public.salas_vip (nombre, descripcion, capacidad, precio_hora) values
  ('Sala Roja',  'Ambiente íntimo con equipo de sonido Marshall',  8, 80.00),
  ('Sala Negra', 'Escenario propio + luces de discoteca',          15, 120.00),
  ('Sala Gold',  'Suite VIP con servicio de botella incluido',     6,  150.00);

  create table public.reservas (
  id              bigserial primary key,
  sala_id         int not null references public.salas_vip(id),
  cliente_id      uuid not null references public.perfiles(id),
  inicio          timestamptz not null,
  fin             timestamptz not null,
  estado          text not null default 'pendiente'
                  check (estado in ('pendiente','pagada','cancelada','completada')),
  estado_pago     text not null default 'pendiente'
                  check (estado_pago in ('pendiente','pagado','cancelado')),
  stripe_session  text,
  stripe_payment  text,
  qr_token        text unique,
  total           numeric(8,2) not null,
  usado_at        timestamptz,
  creado_en       timestamptz not null default now(),

  constraint sin_solapamiento exclude using gist (
    sala_id with =,
    tstzrange(inicio, fin) with &&
  ) where (estado not in ('cancelada'))
);

ALTER TABLE public.perfiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salas_vip     ENABLE ROW LEVEL SECURITY;
