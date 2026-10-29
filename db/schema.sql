create table if not exists incidents (
  id text primary key,
  title varchar(120) not null unique,
  severity text not null check (severity in ('critical', 'high', 'medium', 'low')),
  status text not null check (status in ('open', 'in-progress', 'closed')) default 'open',
  owner text not null,
  summary text not null
);
