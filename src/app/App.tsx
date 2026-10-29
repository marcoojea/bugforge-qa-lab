import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { FormEvent, useMemo, useState, type ReactNode } from 'react'
import { AppUnderTest } from './AppUnderTest'
import { expectedTestCases, qualityIncidents } from '../data/qualityCatalog'

const navItems = [
  ['/', 'inicio'],
  ['/app', 'aplicación bajo prueba'],
  ['/incidents', 'incidencias'],
  ['/test-cases', 'casos de prueba'],
  ['/login', 'acceso demo'],
  ['/results', 'resultados'],
] as const

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/">bugforge <span>qa lab</span></a>
        <nav aria-label="navegación principal">
          {navItems.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
        </nav>
      </header>
      <main className="main-content">{children}</main>
      <footer className="site-footer">laboratorio educativo · datos locales deterministas</footer>
    </div>
  )
}

function Home() {
  return <>
    <section className="hero">
      <p className="eyebrow">laboratorio público de calidad</p>
      <h1>encuentra el fallo antes de que lo encuentre el usuario.</h1>
      <p>explora una aplicación pequeña, documenta incidencias y convierte comportamientos en pruebas reproducibles.</p>
      <div className="hero-actions"><NavLink className="button primary" to="/incidents">ver catálogo</NavLink><NavLink className="button secondary" to="/test-cases">ver casos de prueba</NavLink></div>
    </section>
    <section className="card-grid" aria-label="áreas del laboratorio">
      <article className="card"><span className="card-number">01</span><h2>aplicación bajo prueba</h2><p>usuarios, incidencias, casos de prueba y un panel de resultados.</p></article>
      <article className="card"><span className="card-number">02</span><h2>catálogo de calidad</h2><p>fallos conocidos con gravedad, pasos, esperado y resultado actual.</p></article>
      <article className="card"><span className="card-number">03</span><h2>automatización</h2><p>tests e2e con Playwright, fixtures y evidencias de ejecución.</p></article>
    </section>
  </>
}

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (email === 'analyst@example.test' && password === 'playwright123') {
      navigate('/app?session=demo')
      return
    }
    setMessage('el correo o la contraseña no son correctos.')
  }

  return <section className="page-section auth-page"><p className="eyebrow">aplicación bajo prueba · acceso</p><h1>iniciar sesión</h1><p className="lead">usa el acceso demo para practicar validación, errores de credenciales y navegación de sesión.</p><form className="bug-form auth-form" onSubmit={submit}><label htmlFor="login-email">correo electrónico</label><input id="login-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="analyst@example.test" autoComplete="username" /><label htmlFor="login-password">contraseña</label><input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /><button className="button primary" type="submit">iniciar sesión</button>{message && <p className="form-message error" role="alert">{message}</p>}</form><p className="auth-help"><Link to="/forgot-password">he olvidado la contraseña</Link></p><p className="demo-hint">credenciales demo: `analyst@example.test` / `playwright123`</p></section>
}

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setMessage('si la cuenta existe, recibirás instrucciones para recuperar el acceso.') }

  return <section className="page-section auth-page"><p className="eyebrow">aplicación bajo prueba · recuperación</p><h1>recuperar acceso</h1><p className="lead">este flujo permite practicar casos límite y mensajes que no deben revelar información de cuentas.</p><form className="bug-form auth-form" onSubmit={submit}><label htmlFor="reset-email">correo electrónico</label><input id="reset-email" type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu correo" autoComplete="email" /><button className="button primary" type="submit">enviar instrucciones</button>{message && <p className="form-message" role="status">{message}</p>}</form><p className="auth-help"><Link to="/login">volver al acceso</Link></p></section>
}

function Incidents() {
  const [query, setQuery] = useState('')
  const [severity, setSeverity] = useState('all')
  const [area, setArea] = useState('all')
  const [status, setStatus] = useState('all')
  const [automation, setAutomation] = useState('all')
  const areas = [...new Set(qualityIncidents.map((incident) => incident.area))]
  const filtered = useMemo(() => qualityIncidents.filter((incident) => {
    const textMatch = `${incident.id} ${incident.title} ${incident.area}`.toLowerCase().includes(query.toLowerCase())
    return textMatch && (severity === 'all' || incident.severity === severity) && (area === 'all' || incident.area === area) && (status === 'all' || incident.status === status) && (automation === 'all' || incident.automationStatus === automation)
  }), [area, automation, query, severity, status])

  return <section className="page-section"><p className="eyebrow">catálogo de calidad</p><h1>incidencias conocidas</h1><p className="lead">fallos intencionados para practicar detección, documentación y regresión. filtra el catálogo o abre una misión.</p><div className="catalog-filters"><label>buscar<input aria-label="buscar incidencias" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="id, título o área" /></label><label>gravedad<select aria-label="filtrar por gravedad" value={severity} onChange={(event) => setSeverity(event.target.value)}><option value="all">todas</option><option value="crítica">crítica</option><option value="alta">alta</option><option value="media">media</option></select></label><label>área<select aria-label="filtrar por área" value={area} onChange={(event) => setArea(event.target.value)}><option value="all">todas</option>{areas.map((item) => <option key={item} value={item}>{item}</option>)}</select></label><label>estado<select aria-label="filtrar por estado" value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">todos</option><option value="abierta">abierta</option><option value="en análisis">en análisis</option></select></label><label>automatización<select aria-label="filtrar por automatización" value={automation} onChange={(event) => setAutomation(event.target.value)}><option value="all">todas</option><option value="automatizado">automatizado</option><option value="propuesto">propuesto</option></select></label></div><p className="filter-summary">{filtered.length} de {qualityIncidents.length} incidencias visibles</p><div className="catalog-list">{filtered.map((incident) => <article className="catalog-item" key={incident.id}><div className="catalog-title"><span className={`severity ${incident.severity === 'crítica' ? 'critical' : incident.severity}`}>{incident.severity}</span><span className="catalog-id">{incident.id} · {incident.area}</span><h2>{incident.title}</h2></div><p><strong>esperado:</strong> {incident.expected}</p><p><strong>actual:</strong> {incident.actual}</p><div className="catalog-meta"><span className="status">{incident.status} · {incident.automationStatus}</span><Link className="button secondary" to={`/incidents/${incident.id}`}>abrir misión</Link></div></article>)}</div>{filtered.length === 0 && <div className="empty-state"><h2>sin coincidencias</h2><p>prueba a limpiar algún filtro o buscar otro término.</p></div>}</section>
}

function IncidentDetail() {
  const { incidentId } = useParams()
  const incident = qualityIncidents.find((item) => item.id === incidentId)
  const [solutionVisible, setSolutionVisible] = useState(false)
  const [codeVisible, setCodeVisible] = useState(false)

  if (!incident) {
    return <section className="page-section"><p className="eyebrow">catálogo de calidad</p><h1>incidencia no encontrada</h1><Link className="button secondary" to="/incidents">volver al catálogo</Link></section>
  }

  return <article className="page-section incident-detail"><Link className="back-link" to="/incidents">← volver al catálogo</Link><div className="detail-header"><div><p className="eyebrow">ficha educativa · {incident.area}</p><p className="catalog-id">{incident.id} · {incident.severity} · {incident.status}</p><h1>{incident.title}</h1></div><Link className="button primary" to={incident.reproducePath}>reproducir en la aplicación</Link></div><p className="lead">esta ficha conecta exploración manual, documentación de la incidencia y regresión automatizada.</p><section className="mission-panel"><div><p className="eyebrow">modo misión</p><h2>intenta encontrarlo</h2><p>reproduce el flujo antes de consultar la solución. después compara tu observación con la evidencia esperada.</p></div><div className="mission-actions"><Link className="button primary" to={incident.reproducePath}>intenta encontrarlo</Link><button className="button secondary" type="button" onClick={() => setSolutionVisible((visible) => !visible)}>{solutionVisible ? 'ocultar solución' : 'mostrar solución'}</button><button className="button secondary" type="button" onClick={() => setCodeVisible((visible) => !visible)}>{codeVisible ? 'ocultar código' : 'mostrar código'}</button></div>{solutionVisible && <div className="solution-box" role="status"><strong>pista:</strong> {incident.detection}<p><strong>resultado esperado:</strong> {incident.expected}</p><p><strong>resultado actual:</strong> {incident.actual}</p></div>}{codeVisible && <pre className="mission-code"><code>{incident.testCode}</code></pre>}</section><div className="detail-grid"><section className="detail-panel"><p className="eyebrow">01 · detectar</p><h2>cómo encontrarlo</h2><p>{incident.detection}</p><ol>{incident.steps.map((step) => <li key={step}>{step}</li>)}</ol></section><section className="detail-panel"><p className="eyebrow">02 · documentar</p><h2>qué debe contener el reporte</h2><ul>{incident.documentation.map((item) => <li key={item}>{item}</li>)}</ul><dl className="expected-actual"><div><dt>resultado esperado</dt><dd>{incident.expected}</dd></div><div><dt>resultado actual</dt><dd>{incident.actual}</dd></div></dl></section></div><section className="detail-panel automation-panel"><div className="automation-heading"><div><p className="eyebrow">03 · automatizar</p><h2>regresión con Playwright</h2></div><span className={`automation-status ${incident.automationStatus}`}>{incident.automationStatus}</span></div><p>este ejemplo usa el mismo patrón que debe vivir en la suite e2e: localizadores accesibles, estados observables y una expectativa que demuestra el riesgo.</p><p className="catalog-id">archivo: {incident.testFile}</p><pre><code>{incident.testCode}</code></pre></section></article>
}

function TestCases() {
  const flowByCase: Record<string, string> = {
    'TC-001': '/app/incidents/new',
    'TC-002': '/app/incidents/new',
    'TC-003': '/app/incidents',
    'TC-004': '/app?role=viewer',
    'TC-005': '/app/incidents',
    'TC-006': '/login',
    'TC-007': '/login',
    'TC-008': '/forgot-password',
    'TC-009': '/app?session=demo',
    'TC-010': '/login',
  }

  return <section className="page-section"><p className="eyebrow">automatización</p><h1>casos de prueba</h1><p className="lead">cada caso relaciona una intención de negocio con un flujo reproducible.</p><div className="catalog-list">{expectedTestCases.map((testCase) => <article className="catalog-item" key={testCase.id}><div className="catalog-title"><span className="catalog-id">{testCase.id} · {testCase.area}</span><h2>{testCase.title}</h2></div><p><strong>resultado esperado:</strong> {testCase.expected}</p><Link className="button secondary case-action" to={flowByCase[testCase.id]}>abrir flujo de {testCase.id}</Link></article>)}</div></section>
}

function Results() {
  const automated = qualityIncidents.filter((incident) => incident.automationStatus === 'automatizado').length
  return <section className="page-section"><p className="eyebrow">panel de calidad</p><h1>resultados</h1><p className="lead">resumen legible de la suite local y del último workflow de GitHub Actions. los fallos conocidos se esperan y están marcados con `test.fail`.</p><div className="metrics"><div><strong>13</strong><span>tests e2e ejecutados</span></div><div><strong>10</strong><span>tests de comportamiento correctos</span></div><div><strong>{qualityIncidents.length}</strong><span>fallos conocidos catalogados</span></div></div><div className="results-grid"><section className="detail-panel"><p className="eyebrow">cobertura del laboratorio</p><h2>{automated} bugs automatizados</h2><p>cada incidencia automatizada tiene pasos reproducibles, localizadores accesibles y evidencia de Playwright configurada para conservar trace, screenshot y vídeo cuando falla.</p><ul><li>login válido e inválido</li><li>formularios y permisos</li><li>filtros y navegación</li><li>recuperación y sesión</li></ul></section><section className="detail-panel"><p className="eyebrow">ci</p><h2>último estado conocido</h2><p className="ci-status"><span aria-hidden="true">●</span> pipeline preparado</p><p>lint · typecheck · tests · build · e2e</p><a className="button secondary" href="https://github.com/marcoojea/bugforge-qa-lab/actions" target="_blank" rel="noreferrer">ver github actions</a></section></div></section>
}

export default function App() {
  return <Routes><Route path="/app/*" element={<AppUnderTest />} /><Route path="*" element={<Layout><Routes><Route path="/" element={<Home />} /><Route path="/incidents" element={<Incidents />} /><Route path="/incidents/:incidentId" element={<IncidentDetail />} /><Route path="/test-cases" element={<TestCases />} /><Route path="/login" element={<Login />} /><Route path="/forgot-password" element={<ForgotPassword />} /><Route path="/results" element={<Results />} /></Routes></Layout>} /></Routes>
}
