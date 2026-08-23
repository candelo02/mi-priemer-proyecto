import React, { useState } from 'react'
import TarjetaTramite from './components/TarjetaTramite'
import ConsultasPage from './pages/ConsultasPage'
import './App.css'

interface TramiteData {
  id: string
  titulo: string
  descripcion: string
  categoria: string
  icono: React.ReactNode
}

const TRAMITES_DATA: TramiteData[] = [
  {
    id: 'agua',
    titulo: 'Agua y Alcantarillado',
    descripcion: 'Reporte de fugas en vÃ­a pÃºblica, cortes programados o imprevistos del servicio y mantenimiento preventivo o correctivo de la red de alcantarillado.',
    categoria: 'Fugas, cortes, alcantarillado',
    icono: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#003399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    )
  },
  {
    id: 'basura',
    titulo: 'RecolecciÃ³n de Basura',
    descripcion: 'Consulta de horarios y rutas de recolecciÃ³n por sector, reportes de acumulaciÃ³n de desechos en Ã¡reas pÃºblicas y atenciÃ³n a puntos crÃ­ticos.',
    categoria: 'Horarios, acumulaciÃ³n, puntos crÃ­ticos',
    icono: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#003399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    )
  },
  {
    id: 'alumbrado',
    titulo: 'Alumbrado PÃºblico',
    descripcion: 'AtenciÃ³n a reportes de lÃ¡mparas y luminarias apagadas, fallas en circuitos de alumbrado de la zona y postes caÃ­dos o en riesgo.',
    categoria: 'LÃ¡mparas apagadas, postes caÃ­dos',
    icono: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#003399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>
    )
  }
]

export const App: React.FC = () => {
  const [vistaActual, setVistaActual] = useState<'inicio' | 'consultas'>('inicio')

  return (
    <div className="portal-container">
      {/* Encabezado Institucional con NavegaciÃ³n */}
      <header className="header-institucional">
        <div className="header-top">
          <div className="escudo-box">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#003399">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8s0 0 0 0z"/>
            </svg>
            <div>
              <span className="gob-label">GOBIERNO MUNICIPAL</span>
              <span className="portal-sub">Portal Oficial de Servicios Ciudadanos</span>
            </div>
          </div>

          <div className="nav-menu">
            <button 
              className={`nav-link ${vistaActual === 'inicio' ? 'active' : ''}`}
              onClick={() => setVistaActual('inicio')}
            >
              ðŸ›ï¸ Inicio
            </button>
            <button 
              className={`nav-link ${vistaActual === 'consultas' ? 'active' : ''}`}
              onClick={() => setVistaActual('consultas')}
            >
              ðŸ“‹ Consultar Radicados PQRS
            </button>
          </div>

          <div className="contacto-box">
            <span>LÃ­nea Ciudadana: <strong>0800-RESPUESTAS</strong></span>
          </div>
        </div>
        
        {/* Banner Institucional */}
        <div className="banner-institucional">
          <div className="banner-content">
            <span className="badge-oficial">Plataforma de AtenciÃ³n Ciudadana</span>
            <h1 className="titulo-institucional">Respuestas</h1>
            <p className="subtitulo-institucional">
              Consulta y gestiÃ³n centralizada de reportes de servicios pÃºblicos para la comunidad
            </p>
          </div>
        </div>
      </header>

      {/* Vista DinÃ¡mica */}
      <main className="main-content">
        {vistaActual === 'inicio' ? (
          <section className="sec-respuestas">
            <div className="sec-header">
              <h2>TrÃ¡mites y Servicios Frecuentes</h2>
              <p>Seleccione una categorÃ­a para consultar informaciÃ³n o realizar un reporte ciudadano:</p>
            </div>

            <div className="grid-tarjetas">
              {TRAMITES_DATA.map((tramite) => (
                <TarjetaTramite
                  key={tramite.id}
                  titulo={tramite.titulo}
                  descripcion={tramite.descripcion}
                  categoria={tramite.categoria}
                  icono={tramite.icono}
                />
              ))}
            </div>

            <div className="callout-consultas">
              <div className="callout-text">
                <h3>Â¿Ya tienes un nÃºmero de radicado?</h3>
                <p>Consulta en tiempo real el estado y respuesta de tu trÃ¡mite en nuestro mÃ³dulo oficial.</p>
              </div>
              <button className="btn-callout" onClick={() => setVistaActual('consultas')}>
                Ir a Consultar Radicados â†’
              </button>
            </div>
          </section>
        ) : (
          <ConsultasPage />
        )}
      </main>

      {/* Pie de PÃ¡gina Institucional */}
      <footer className="footer-institucional">
        <div className="footer-inner">
          <p>Â© 2026 Gobierno Municipal â€” Portal Institucional de Servicios PÃºblicos y Respuestas Ciudadanas</p>
        </div>
      </footer>
    </div>
  )
}

export default App