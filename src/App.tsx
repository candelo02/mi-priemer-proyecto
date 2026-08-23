import React from 'react'
import TarjetaTramite from './components/TarjetaTramite'
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
    descripcion: 'Reporte de fugas en vía pública, cortes programados o imprevistos del servicio y mantenimiento preventivo o correctivo de la red de alcantarillado.',
    categoria: 'Fugas, cortes, alcantarillado',
    icono: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#003399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    )
  },
  {
    id: 'basura',
    titulo: 'Recolección de Basura',
    descripcion: 'Consulta de horarios y rutas de recolección por sector, reportes de acumulación de desechos en áreas públicas y atención a puntos críticos.',
    categoria: 'Horarios, acumulación, puntos críticos',
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
    titulo: 'Alumbrado Público',
    descripcion: 'Atención a reportes de lámparas y luminarias apagadas, fallas en circuitos de alumbrado de la zona y postes caídos o en riesgo.',
    categoria: 'Lámparas apagadas, postes caídos',
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
  return (
    <div className="portal-container">
      {/* Encabezado Institucional */}
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
          <div className="contacto-box">
            <span>Línea Ciudadana: <strong>0800-RESPUESTAS</strong></span>
          </div>
        </div>
        
        {/* Banner Institucional con Título Principal */}
        <div className="banner-institucional">
          <div className="banner-content">
            <span className="badge-oficial">Plataforma de Atención Ciudadana</span>
            <h1 className="titulo-institucional">Respuestas</h1>
            <p className="subtitulo-institucional">
              Consulta y gestión centralizada de reportes de servicios públicos para la comunidad
            </p>
          </div>
        </div>
      </header>

      {/* Sección Principal de Trámites y Servicios */}
      <main className="main-content">
        <section className="sec-respuestas">
          <div className="sec-header">
            <h2>Trámites y Servicios Frecuentes</h2>
            <p>Seleccione una categoría para consultar información o realizar un reporte ciudadano:</p>
          </div>

          {/* Grilla Institucional de 3 Columnas */}
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
        </section>
      </main>

      {/* Pie de Página Institucional */}
      <footer className="footer-institucional">
        <div className="footer-inner">
          <p>© 2026 Gobierno Municipal — Portal Institucional de Servicios Públicos y Respuestas Ciudadanas</p>
        </div>
      </footer>
    </div>
  )
}

export default App