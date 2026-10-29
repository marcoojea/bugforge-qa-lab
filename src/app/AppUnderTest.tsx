import { FormEvent, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom'
import { incidents, users, type Incident, type IncidentStatus, type Role } from '../data/fixtures'

const appNav = [['/app', 'resumen'], ['/app/incidents', 'incidencias'], ['/app/users', 'usuarios']] as const

export function AppUnderTest() {
  const [searchParams] = useSearchParams()
  const requestedRole = searchParams.get('role')
  const initialRole: Role = requestedRole === 'admin' || requestedRole === 'viewer' ? requestedRole : 'analyst'
  const [role, setRole] = useState<Role>(initialRole)
  const [currentIncidents, setCurrentIncidents] = useState(incidents)
  const createIncident = (title: string, severity: Incident['severity']) => {
    setCurrentIncidents((previous) => [...previous, { id: `BUG-${101 + previous.length}`, title, severity, status: 'open', owner: 'bruno qa', summary: 'incidencia creada durante la sesión de prueba.' }])
  }
  return <div className="product-shell">
    <header className="product-header">
      <Link to="/" className="brand">bugforge <span>qa lab</span></Link>
      <nav aria-label="navegación de la aplicación">{appNav.map(([to, label]) => <NavLink key={to} to={to} end={to === '/app'}>{label}</NavLink>)}<Link className="logout-link" to="/login?loggedOut=1">cerrar sesión</Link></nav>
      <label className="role-switcher">rol de prueba<select aria-label="rol de prueba" value={role} onChange={(event) => setRole(event.target.value as Role)}><option value="admin">admin</option><option value="analyst">analyst</option><option value="viewer">viewer</option></select></label>
    </header>
    <main className="product-content"><Routes><Route path="/" element={<Dashboard role={role} incidentCount={currentIncidents.length} />} /><Route path="/incidents" element={<IncidentList role={role} incidents={currentIncidents} />} /><Route path="/incidents/new" element={<NewIncident onCreate={createIncident} />} /><Route path="/users" element={<UserList />} /></Routes></main>
  </div>
}

function Dashboard({ role, incidentCount }: { role: Role; incidentCount: number }) {
  return <section className="page-section"><p className="eyebrow">aplicación bajo prueba</p><h1>resumen del laboratorio</h1><p className="lead">sesión simulada como <strong>{role}</strong>. explora los flujos y busca comportamientos inconsistentes.</p><div className="metrics"><div><strong>{incidentCount}</strong><span>incidencias visibles</span></div><div><strong>{users.filter((user) => user.active).length}</strong><span>usuarios activos</span></div><div><strong>3</strong><span>casos pendientes</span></div></div></section>
}

function IncidentList({ role, incidents: visibleIncidents }: { role: Role; incidents: Incident[] }) {
  const [status, setStatus] = useState<IncidentStatus | 'all'>('all')
  const filtered = status === 'all' ? visibleIncidents : visibleIncidents.filter((incident) => incident.status === status)
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">aplicación bajo prueba</p><h1>incidencias</h1></div><Link className="button primary" to="/app/incidents/new">nueva incidencia</Link></div><div className="toolbar"><label htmlFor="status-filter">filtrar por estado</label><select id="status-filter" value={status} onChange={(event) => setStatus(event.target.value as IncidentStatus | 'all')}><option value="all">todos</option><option value="open">abierta</option><option value="in-progress">en curso</option><option value="closed">cerrada</option></select></div><div className="incident-list">{filtered.map((incident) => <article className="incident-row" key={incident.id}><div><span className={`severity ${incident.severity}`}>{incident.severity}</span><h2>{incident.id}: {incident.title}</h2><p>{incident.summary}</p></div><span className="status">{incident.status}</span></article>)}{filtered.length === 0 && <div className="empty-state"><h2>sin incidencias</h2><p>prueba otro filtro.</p></div>}</div><p className="permission-note">rol actual: {role}. algunas acciones están simuladas para testing de permisos.</p></section>
}

function NewIncident({ onCreate }: { onCreate: (title: string, severity: Incident['severity']) => void }) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [severity, setSeverity] = useState<Incident['severity']>('medium')
  const [message, setMessage] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!title.trim()) { setMessage('completa los campos obligatorios.'); return } onCreate(title.trim(), severity); setMessage('incidencia creada correctamente.'); setTimeout(() => navigate('/app/incidents'), 500) }
  return <section className="page-section narrow"><p className="eyebrow">aplicación bajo prueba</p><h1>nueva incidencia</h1><form className="bug-form" onSubmit={submit}><label htmlFor="incident-title">título <span aria-hidden="true">*</span></label><input id="incident-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="describe el problema" /><label htmlFor="incident-severity">gravedad</label><select id="incident-severity" value={severity} onChange={(event) => setSeverity(event.target.value as Incident['severity'])}><option value="low">baja</option><option value="medium">media</option><option value="high">alta</option><option value="critical">crítica</option></select><button className="button primary" type="submit">crear incidencia</button>{message && <p role="status" className="form-message">{message}</p>}</form></section>
}

function UserList() {
  return <section className="page-section"><p className="eyebrow">aplicación bajo prueba</p><h1>usuarios</h1><div className="user-list">{users.map((user) => <article className="user-row" key={user.id}><div><h2>{user.name}</h2><p>{user.email}</p></div><span className={user.active ? 'active-label' : 'inactive-label'}>{user.active ? 'activo' : 'inactivo'} · {user.role}</span></article>)}</div></section>
}
