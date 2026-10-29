import { NavLink, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { AppUnderTest } from './AppUnderTest'

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
  return <section className="page-section"><p className="eyebrow">catálogo de calidad</p><h1>incidencias conocidas</h1><p className="lead">fallos intencionados para practicar detección, documentación y regresión.</p><div className="empty-state"><h2>catálogo en construcción</h2><p>la primera incidencia aparecerá en la siguiente fase.</p></div></section>
}

function TestCases() {
  return <section className="page-section"><p className="eyebrow">automatización</p><h1>casos de prueba</h1><p className="lead">cada caso relacionará una intención de negocio con un flujo reproducible.</p><div className="empty-state"><h2>casos en construcción</h2><p>los primeros escenarios se añadirán junto a la aplicación bajo prueba.</p></div></section>
}

function Results() {
  return <section className="page-section"><p className="eyebrow">panel</p><h1>resultados</h1><p className="lead">resumen de la última ejecución local o de GitHub Actions.</p><div className="metrics"><div><strong>—</strong><span>tests ejecutados</span></div><div><strong>—</strong><span>tests correctos</span></div><div><strong>—</strong><span>fallos conocidos</span></div></div></section>
}

export default function App() {
  return <Routes><Route path="/app/*" element={<AppUnderTest />} /><Route path="*" element={<Layout><Routes><Route path="/" element={<Home />} /><Route path="/incidents" element={<Incidents />} /><Route path="/test-cases" element={<TestCases />} /><Route path="/results" element={<Results />} /></Routes></Layout>} /></Routes>
}
