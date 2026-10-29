insert into incidents (id, title, severity, status, owner, summary) values
  ('BUG-101', 'el filtro de incidencias se pierde al navegar', 'high', 'open', 'bruno qa', 'el estado del filtro no se conserva al navegar.'),
  ('BUG-102', 'mensaje de error sin contexto', 'medium', 'open', 'ana tester', 'el formulario informa de un error sin indicar cómo resolverlo.')
on conflict (id) do nothing;
