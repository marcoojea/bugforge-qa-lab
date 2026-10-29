import { Link, NavLink, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { AppUnderTest } from './AppUnderTest'
import { expectedTestCases, qualityIncidents } from '../data/qualityCatalog'

const navItems = [
  ['/', 'inicio'],
  ['/app', 'aplicación bajo prueba'],
  ['/incidents', 'incidencias'],
  ['/test-cases', 'casos de prueba'],
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

function Incidents() {
  return <section className="page-section"><p className="eyebrow">catálogo de calidad</p><h1>incidencias conocidas</h1><p className="lead">fallos intencionados para practicar detección, documentación y regresión.</p><div className="catalog-list">{qualityIncidents.map((incident) => <article className="catalog-item" key={incident.id}><div className="catalog-title"><span className={`severity ${incident.severity === 'crítica' ? 'critical' : incident.severity}`}>{incident.severity}</span><span className="catalog-id">{incident.id} · {incident.area}</span><h2>{incident.title}</h2></div><p><strong>pasos:</strong> {incident.steps.join(' → ')}</p><p><strong>esperado:</strong> {incident.expected}</p><p><strong>actual:</strong> {incident.actual}</p><span className="status">{incident.status}</span></article>)}</div></section>
}

function TestCases() {
  const flowByCase: Record<string, string> = {
    'TC-001': '/app/incidents/new',
    'TC-002': '/app/incidents/new',
    'TC-003': '/app/incidents',
    'TC-004': '/app?role=viewer',
    'TC-005': '/app/incidents',
  }

  return <section className="page-section"><p className="eyebrow">automatización</p><h1>casos de prueba</h1><p className="lead">cada caso relaciona una intención de negocio con un flujo reproducible.</p><div className="catalog-list">{expectedTestCases.map((testCase) => <article className="catalog-item" key={testCase.id}><div className="catalog-title"><span className="catalog-id">{testCase.id} · {testCase.area}</span><h2>{testCase.title}</h2></div><p><strong>resultado esperado:</strong> {testCase.expected}</p><Link className="button secondary case-action" to={flowByCase[testCase.id]}>abrir flujo de {testCase.id}</Link></article>)}</div></section>
}

function Results() {
  return <section className="page-section"><p className="eyebrow">panel</p><h1>resultados</h1><p className="lead">resumen de la última ejecución local o de GitHub Actions.</p><div className="metrics"><div><strong>—</strong><span>tests ejecutados</span></div><div><strong>—</strong><span>tests correctos</span></div><div><strong>—</strong><span>fallos conocidos</span></div></div></section>
}

export default function App() {
  return <Routes><Route path="/app/*" element={<AppUnderTest />} /><Route path="*" element={<Layout><Routes><Route path="/" element={<Home />} /><Route path="/incidents" element={<Incidents />} /><Route path="/test-cases" element={<TestCases />} /><Route path="/results" element={<Results />} /></Routes></Layout>} /></Routes>
}
